import { NextResponse } from 'next/server';

// OTP verification is now handled in send-otp (direct registration)
export async function POST(request) {
  return NextResponse.json({ 
    success: true, 
    message: 'Registration completed in send-otp endpoint' 
  });
}
