import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    // Here you could send an email, save to a database, etc.
    // For now, just simulate success
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to send message.' }, { status: 400 });
  }
}
