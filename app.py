from flask import Flask, render_template, request, jsonify, session, redirect, url_for, flash
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
import os
import json
import csv
import uuid
import logging
from datetime import datetime
from dotenv import load_dotenv
import openai

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-secret-key')
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///peerflow.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

Session(app)
db = SQLAlchemy(app)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
class Match(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_a_id = db.Column(db.String(120), nullable=False)
    user_b_id = db.Column(db.String(120), nullable=False)
    status = db.Column(db.String(20), default='active')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class MatchRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    from_user_id = db.Column(db.String(120), nullable=False)
    to_user_id = db.Column(db.String(120), nullable=False)
    status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Ensure data directory exists
os.makedirs('data', exist_ok=True)

# Create database tables
def init_db():
    with app.app_context():
        db.create_all()
        logger.info("Database initialized successfully")

# Initialize database
init_db()

# Mock 21-day plan for development
MOCK_PLAN = [
    {"day": i + 1, "title": f"Day {i + 1}", "description": f"Mock description for day {i + 1}."}
    for i in range(21)
]

def get_users():
    """Read users from database"""
    try:
        with app.app_context():
            return User.query.all()
    except Exception as e:
        logger.error(f"Error getting users: {e}")
        return []

def save_user(email):
    """Save user to database"""
    try:
        with app.app_context():
            user = User(email=email)
            db.session.add(user)
            db.session.commit()
            logger.info(f"User saved: {email}")
            return True
    except Exception as e:
        logger.error(f"Error saving user: {e}")
        with app.app_context():
            db.session.rollback()
        return False

def get_matches():
    """Read matches from database"""
    try:
        with app.app_context():
            return Match.query.all()
    except Exception as e:
        logger.error(f"Error getting matches: {e}")
        return []

def save_match(user_a_id, user_b_id):
    """Save match to database"""
    try:
        with app.app_context():
            match = Match(user_a_id=user_a_id, user_b_id=user_b_id)
            db.session.add(match)
            db.session.commit()
            logger.info(f"Match saved: {user_a_id} - {user_b_id}")
            return True
    except Exception as e:
        logger.error(f"Error saving match: {e}")
        with app.app_context():
            db.session.rollback()
        return False

def get_match_requests():
    """Read match requests from database"""
    try:
        with app.app_context():
            return MatchRequest.query.all()
    except Exception as e:
        logger.error(f"Error getting match requests: {e}")
        return []

def save_match_request(from_user_id, to_user_id):
    """Save match request to database"""
    try:
        with app.app_context():
            request = MatchRequest(from_user_id=from_user_id, to_user_id=to_user_id)
            db.session.add(request)
            db.session.commit()
            logger.info(f"Match request saved: {from_user_id} -> {to_user_id}")
            return True
    except Exception as e:
        logger.error(f"Error saving match request: {e}")
        with app.app_context():
            db.session.rollback()
        return False

def generate_ai_challenge(learners):
    """Generate AI challenge using OpenAI"""
    try:
        client = openai.OpenAI(api_key=os.environ.get('OPENAI_API_KEY'))
        
        prompt = f"""
You are a world-class coding tutor.
Generate a 21-day paired study plan for:
 • {learners[0]['name']} — {learners[0]['level']} in {learners[0]['skill']}
 • {learners[1]['name']} — {learners[1]['level']} in {learners[1]['skill']}

Return pure JSON:
[
  {{ "day": 1, "title": "...", "description": "..." }},
  …
]
        """.strip()

        completion = client.chat.completions.create(
            model='gpt-4o-mini',
            messages=[
                {"role": "system", "content": "You are a helpful tutor."},
                {"role": "user", "content": prompt}
            ]
        )

        text = completion.choices[0].message.content or ''
        plan = json.loads(text)
        logger.info("AI challenge generated successfully")
        return plan
    except Exception as e:
        logger.error(f"AI error: {e}")
        return MOCK_PLAN

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form.get('email')
        if email and '@' in email:
            try:
                with app.app_context():
                    # Check if user already exists
                    existing_user = User.query.filter_by(email=email).first()
                    
                    if existing_user:
                        flash('Email already registered', 'error')
                        return render_template('signup.html', error='Email already registered')
                    
                    if save_user(email):
                        session['email'] = email
                        flash('Account created successfully!', 'success')
                        return redirect(url_for('dashboard'))
                    else:
                        flash('Error creating account', 'error')
                        return render_template('signup.html', error='Error creating account')
            except Exception as e:
                logger.error(f"Signup error: {e}")
                flash('An error occurred during signup', 'error')
                return render_template('signup.html', error='An error occurred during signup')
        else:
            flash('Invalid email', 'error')
            return render_template('signup.html', error='Invalid email')
    
    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        if email:
            try:
                with app.app_context():
                    # Check if user exists
                    user = User.query.filter_by(email=email).first()
                    if not user:
                        # Create user if they don't exist (simple auth for demo)
                        if save_user(email):
                            flash('Account created and logged in successfully!', 'success')
                        else:
                            flash('Error creating account', 'error')
                            return render_template('login.html', error='Error creating account')
                    else:
                        flash('Logged in successfully!', 'success')
                    
                    session['email'] = email
                    return redirect(url_for('dashboard'))
            except Exception as e:
                logger.error(f"Login error: {e}")
                flash('An error occurred during login', 'error')
                return render_template('login.html', error='An error occurred during login')
    
    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    if 'email' not in session:
        flash('Please log in first', 'error')
        return redirect(url_for('login'))
    
    # Get or create room slug
    if 'room_slug' not in session:
        session['room_slug'] = f"peerflow-{int(datetime.now().timestamp())}"
    
    # Get partner (mock for now)
    partner = session.get('partner', 'Not matched yet')
    
    # Get completed challenges
    completed = session.get('completed', {})
    
    return render_template('dashboard.html', 
                         email=session['email'],
                         room_slug=session['room_slug'],
                         partner=partner,
                         completed=completed)

@app.route('/find-a-peer')
def find_a_peer():
    if 'email' not in session:
        flash('Please log in first', 'error')
        return redirect(url_for('login'))
    
    # Mock peer data
    peers = [
        {"id": "1", "name": "Alex Chen", "skill": "Python", "level": "Intermediate", "timezone": "PST"},
        {"id": "2", "name": "Sarah Kim", "skill": "JavaScript", "level": "Beginner", "timezone": "EST"},
        {"id": "3", "name": "Mike Johnson", "skill": "React", "level": "Advanced", "timezone": "CST"},
        {"id": "4", "name": "Emma Wilson", "skill": "Python", "level": "Beginner", "timezone": "PST"},
        {"id": "5", "name": "David Lee", "skill": "JavaScript", "level": "Intermediate", "timezone": "EST"},
        {"id": "6", "name": "Lisa Brown", "skill": "React", "level": "Beginner", "timezone": "CST"},
    ]
    
    return render_template('find_a_peer.html', peers=peers)

@app.route('/rooms/<room_slug>')
def room(room_slug):
    if 'email' not in session:
        flash('Please log in first', 'error')
        return redirect(url_for('login'))
    
    return render_template('room.html', room_slug=room_slug)

@app.route('/api/challenge', methods=['GET', 'POST'])
def api_challenge():
    if request.method == 'GET':
        return jsonify({"plan": MOCK_PLAN})
    
    # POST request
    try:
        data = request.get_json()
        learners = data.get('learners', []) if data else []
        
        if len(learners) != 2:
            return jsonify({"plan": MOCK_PLAN})
        
        plan = generate_ai_challenge(learners)
        return jsonify({"plan": plan})
    
    except Exception as e:
        logger.error(f"Error in challenge API: {e}")
        return jsonify({"plan": MOCK_PLAN})

@app.route('/api/save-progress', methods=['POST'])
def save_progress():
    if 'email' not in session:
        return jsonify({"error": "Not authenticated"}), 401
    
    try:
        data = request.get_json()
        completed = data.get('completed', {})
        session['completed'] = completed
        logger.info(f"Progress saved for user: {session['email']}")
        return jsonify({"success": True})
    except Exception as e:
        logger.error(f"Error saving progress: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/match-request', methods=['POST'])
def match_request():
    if 'email' not in session:
        return jsonify({"error": "Not authenticated"}), 401
    
    try:
        data = request.get_json()
        to_user_id = data.get('toUserId')
        
        if to_user_id:
            if save_match_request(session['email'], to_user_id):
                return jsonify({"success": True})
            else:
                return jsonify({"error": "Failed to save match request"}), 500
        else:
            return jsonify({"error": "Missing toUserId"}), 400
    
    except Exception as e:
        logger.error(f"Error in match request: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/logout')
def logout():
    session.clear()
    flash('Logged out successfully', 'success')
    return redirect(url_for('home'))

# Error handlers
@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    with app.app_context():
        db.session.rollback()
    return render_template('500.html'), 500

if __name__ == '__main__':
    app.run(debug=True, port=8000) 