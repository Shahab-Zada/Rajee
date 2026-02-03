import { NextResponse } from 'next/server';
import { auth, db } from '../../../lib/firebaseAdmin';

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request) {
  try {
    const { email, name, phone, password } = await request.json();
    
    if (!email || !name || !password) {
      return NextResponse.json(
        { success: false, message: 'Name, email and password required' },
        { status: 400 }
      );
    }

    // Create user directly without OTP for now
    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 400 }
      );
    } catch (err) {
      // User doesn't exist, create them
      userRecord = await auth.createUser({
        email,
        password,
        displayName: name,
        phoneNumber: phone || undefined,
      });
      
      await db.collection('users').doc(userRecord.uid).set({
        name,
        email,
        phone: phone || '',
        verified: true,
        createdAt: new Date(),
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Account created successfully',
      uid: userRecord.uid 
    });
  } catch (err) {
    console.error('Registration error:', err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
