# Peer Flow - Python Flask Version

A Python Flask web application that replicates the original Next.js Peer Flow project. This application helps developers find coding buddies and learn together through AI-generated 21-day challenges.

## Features

- **User Authentication**: Simple email-based signup and login
- **Peer Matching**: Browse and connect with other learners
- **21-Day Challenges**: AI-generated learning paths (with OpenAI integration)
- **Progress Tracking**: Track your daily progress and streaks
- **Study Rooms**: Virtual rooms for collaborative learning
- **Real-time Chat**: Built-in chat functionality in study rooms
- **Responsive Design**: Modern UI with Tailwind CSS
- **Database Support**: SQLite database with SQLAlchemy ORM
- **Error Handling**: Comprehensive error handling and logging
- **Flash Messages**: User-friendly success/error notifications

## Tech Stack

- **Backend**: Python Flask 3.0.0
- **Database**: SQLite with SQLAlchemy ORM
- **Frontend**: HTML, CSS (Tailwind), JavaScript
- **AI Integration**: OpenAI GPT-4 for challenge generation
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Heroicons
- **Logging**: Python logging module

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd peer-flow
   ```

2. **Install Python dependencies**
   ```bash
   python3 -m pip install -r requirements.txt
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   SECRET_KEY=your-super-secret-key-change-this-in-production
   OPENAI_API_KEY=your-openai-api-key-here
   FLASK_ENV=development
   ```

4. **Run the application**
   ```bash
   python3 app.py
   ```

5. **Access the application**
   Open your browser and go to `http://localhost:3001`

## Project Structure

```
peer-flow/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── peerflow.db           # SQLite database (auto-created)
├── templates/            # HTML templates
│   ├── base.html         # Base template with navigation
│   ├── home.html         # Landing page
│   ├── signup.html       # User registration
│   ├── login.html        # User login
│   ├── dashboard.html    # 21-day challenge dashboard
│   ├── find_a_peer.html  # Peer matching page
│   ├── room.html         # Study room with chat
│   ├── 404.html          # 404 error page
│   └── 500.html          # 500 error page
├── data/                 # Legacy CSV files (for backup)
├── static/               # Static assets
└── README_PYTHON.md      # This file
```

## API Endpoints

### Authentication
- `GET/POST /signup` - User registration
- `GET/POST /login` - User login
- `GET /logout` - User logout

### Dashboard
- `GET /dashboard` - Main dashboard with 21-day challenge
- `GET /find-a-peer` - Browse and match with peers
- `GET /rooms/<room_slug>` - Join study room

### API Routes
- `GET/POST /api/challenge` - Get or generate 21-day challenge
- `POST /api/save-progress` - Save user progress
- `POST /api/match-request` - Send match request to peer

## Features Explained

### 1. User Authentication
- Simple email-based authentication
- Session management with Flask-Session
- Automatic user creation on first login
- Flash messages for user feedback

### 2. Database Integration
- SQLite database with SQLAlchemy ORM
- User, Match, and MatchRequest models
- Automatic database creation and migrations
- Error handling and rollback support

### 3. Peer Matching
- Browse available peers with filters
- Send match requests
- View peer profiles and skill levels
- Database-backed match tracking

### 4. 21-Day Challenges
- AI-generated learning paths using OpenAI
- Fallback to mock data if AI is unavailable
- Interactive progress tracking
- Local storage for offline progress

### 5. Study Rooms
- Virtual rooms for collaborative learning
- Real-time chat functionality
- Video call placeholder (demo mode)
- Challenge progress display

### 6. Error Handling
- Comprehensive logging system
- User-friendly error pages (404, 500)
- Flash messages for user feedback
- Database transaction rollback on errors

## Configuration

### Environment Variables
- `SECRET_KEY`: Flask secret key for sessions
- `OPENAI_API_KEY`: OpenAI API key for AI challenge generation
- `FLASK_ENV`: Development/production environment

### Database
- SQLite database automatically created at `peerflow.db`
- Tables: `user`, `match`, `match_request`
- Automatic migrations on startup

### Customization
- Modify `MOCK_PLAN` in `app.py` for custom challenges
- Update peer data in the `find_a_peer` route
- Customize styling in `templates/base.html`
- Add new database models in `app.py`

## Development

### Running in Development Mode
```bash
python3 app.py
```

### Database Management
```python
# Access database in Python shell
from app import app, db
with app.app_context():
    # Query users
    users = User.query.all()
    
    # Add new user
    new_user = User(email='test@example.com')
    db.session.add(new_user)
    db.session.commit()
```

### Adding New Features
1. Add routes in `app.py`
2. Create corresponding templates in `templates/`
3. Update navigation in `templates/base.html`
4. Add database models if needed

### Logging
- Logs are written to console in development
- Configure file logging for production
- Log levels: INFO, ERROR, DEBUG

## Deployment

### Local Development
```bash
python3 app.py
```

### Production Deployment
1. Set `FLASK_ENV=production`
2. Use a production WSGI server (Gunicorn, uWSGI)
3. Set up proper environment variables
4. Configure reverse proxy (Nginx)
5. Set up database backups

Example with Gunicorn:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:3001 app:app
```

## Comparison with Original Next.js Version

| Feature | Next.js Version | Python Flask Version |
|---------|----------------|---------------------|
| Framework | Next.js 14.2.0 | Flask 3.0.0 |
| Language | TypeScript/JavaScript | Python |
| Database | CSV files | SQLite + SQLAlchemy |
| Styling | Tailwind CSS | Tailwind CSS |
| AI Integration | OpenAI | OpenAI |
| Authentication | Email-based | Email-based |
| Real-time | SWR for data fetching | JavaScript fetch |
| Error Handling | Basic | Comprehensive |
| Logging | Console | Structured logging |
| Port | 3000 | 3001 |
| Deployment | Vercel | Any Python host |

## Troubleshooting

### Common Issues

1. **Port already in use**: Change port in `app.py` or stop other services
2. **Database errors**: Delete `peerflow.db` and restart (recreates database)
3. **Import errors**: Ensure all dependencies are installed
4. **OpenAI errors**: Check your API key in `.env` file

### Debug Mode
The application runs in debug mode by default. For production:
```python
app.run(debug=False, port=3001)
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue on the repository. 