import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();
  let message: string | undefined;

  try {
    const accessToken = cookieStore.get('accessToken')?.value;

    if (accessToken) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        message = response.data.message;
      } catch {
        // 백엔드 API 실패 시 쿠키 삭제
      }
    }
  } catch {
    // 기타 예외 시 쿠키 삭제
  }

  // 쿠키 삭제
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');

  return NextResponse.json(
    message ? { success: true, message } : { success: true }
  );
}
