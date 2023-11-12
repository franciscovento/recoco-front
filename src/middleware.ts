import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const secret = process.env.JWT_SECRET || 'secret';
  const jwt = request.cookies.get('auth_token');

  if (!jwt) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    const { payload } = await jwtVerify(
      jwt.value,
      new TextEncoder().encode(secret)
    );
    console.log(payload);
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
};
