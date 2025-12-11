import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        email,
        password,
      }
    );

    const {
      accessToken,
      refreshToken,
      message,
      isFirstLogin,
      isDuplicateLogin,
    } = response.data;

    // console.log('accessToken', accessToken);

    const cookieStore = await cookies();
    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60,
    });

    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 10,
    });

    return NextResponse.json({
      success: true,
      message,
      isFirstLogin,
      isDuplicateLogin,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
      },
      { status: 400 }
    );
  }
}
