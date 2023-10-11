import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { Role } from './db/modeling/account';

async function extractJWTForNext(
    cookie: RequestCookie,
    request: NextRequest
): Promise<NextResponse> {
    const token = await jwtVerify(
        cookie.value,
        new TextEncoder().encode(process.env.JWT_SECRET || '')
    );
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(
        'jwt-companyId',
        JSON.stringify(token.payload.companyId)
    );
    requestHeaders.set('jwt-_id', JSON.stringify(token.payload._id));
    requestHeaders.set('jwt-username', JSON.stringify(token.payload.username));
    requestHeaders.set('jwt-role', JSON.stringify(token.payload.role));

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
    return response;
}

export async function middleware(request: NextRequest) {
    // jwt verification and role based authorization
    const cookie = request.cookies.get('JWT');
    // super admin path
    if (request.nextUrl.pathname.includes('/admin/dashboard')) {
        if (!cookie) {
            return NextResponse.redirect(new URL('/admin', request.url));
        } else {
            const response = await extractJWTForNext(cookie, request);
            if (response.headers.get('jwt-role') === Role.SUPER_ADMIN) {
                return response;
            } else {
                return NextResponse.redirect(new URL('/admin', request.url));
            }
        }
        // normal user path
    } else if (request.nextUrl.pathname.includes('/dashboard')) {
        if (!cookie) {
            return NextResponse.redirect(new URL('/', request.url));
        } else {
            const response = await extractJWTForNext(cookie, request);
            return response;
        }
    } else {
        return NextResponse.next();
    }
}
