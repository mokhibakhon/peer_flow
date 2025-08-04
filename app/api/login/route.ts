import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json({ ok: false, message: 'Invalid email' }, { status: 400 });
    }

    const dir = path.resolve(process.cwd(), 'data');
    const filePath = path.join(dir, 'users.csv');
    
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, 'email,createdAt\n');
    }

    const content = await fs.promises.readFile(filePath, 'utf8');
    const emails = content.split('\n').slice(1).map((l) => l.split(',')[0]);
    
    if (!emails.includes(email)) {
      return NextResponse.json({ ok: false, message: 'Email not found' }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ ok: false, message: 'Internal server error' }, { status: 500 });
  }
} 