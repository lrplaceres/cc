import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
// This function can be marked `async` if using `await` inside
/*export async function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/api/auth/signin', request.url));
}*/

export { default } from "next-auth/middleware"
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/autorizo/:path*', '/combustible/:path*', '/despacho/:path*', '/entidad/:path*', '/usuario/:path*', '/distribucion/:path*'],
};