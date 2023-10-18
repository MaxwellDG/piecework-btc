import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { Role } from './db/modeling/account/types';

const API_AUTH_ROUTES = ['/api/company', '/api/auth/login'];

// todo check for expiration
async function extractJWTForNext(
    cookie: RequestCookie,
    request: NextRequest
): Promise<NextResponse | null> {
    try {
        const token = await jwtVerify(
            cookie.value,
            new TextEncoder().encode(process.env.JWT_SECRET || '')
        );
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set('jwt-company', token.payload.companyId as string);
        requestHeaders.set('jwt-_id', token.payload._id as string);
        requestHeaders.set('jwt-username', token.payload.username as string);
        requestHeaders.set('jwt-role', token.payload.role as string);

        const response = NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
        return response;
    } catch (e) {
        // todo delete jwt cookie
        return null;
    }
}

export async function middleware(request: NextRequest) {
    // login paths
    if (API_AUTH_ROUTES.includes(request.nextUrl.pathname)) {
        return NextResponse.next();
    } else {
        // jwt verification and role based authorization
        const cookie = request.cookies.get('JWT');
        // super admin path
        if (
            request.nextUrl.pathname.includes('/admin/dashboard') ||
            request.nextUrl.pathname.includes('/api/admin')
        ) {
            if (!cookie) {
                return NextResponse.redirect(new URL('/admin', request.url));
            } else {
                const response = await extractJWTForNext(cookie, request);
                if (response?.headers?.get('jwt-role') === Role.SUPER_ADMIN) {
                    return response;
                } else {
                    return NextResponse.redirect(
                        new URL('/admin', request.url)
                    );
                }
            }
            // normal user path
        } else if (
            request.nextUrl.pathname.includes('/dashboard') ||
            request.nextUrl.pathname.includes('/api')
        ) {
            if (!cookie) {
                return NextResponse.redirect(new URL('/', request.url));
            } else {
                const response = await extractJWTForNext(cookie, request);
                if (response) {
                    return response;
                } else {
                    return NextResponse.redirect(new URL('/', request.url));
                }
            }
        } else {
            return NextResponse.next();
        }
    }
}
