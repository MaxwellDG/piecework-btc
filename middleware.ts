import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { Role } from './db/models/account/types';

const API_AUTH_ROUTES = ['/api/company', '/api/auth/login', '/api/admin/auth'];

// todo check for expiration and clear cookie if expired. then reroute
async function extractJWTForNext(
    cookie: RequestCookie,
    requestHeaders: Headers,
    isSuperAdmin: boolean
): Promise<NextResponse | null> {
    try {
        const token = await jwtVerify(
            cookie.value,
            new TextEncoder().encode(process.env.JWT_SECRET || '')
        );

        if (!isSuperAdmin) {
            requestHeaders.set(
                'jwt-company',
                token.payload.companyId as string
            );
            requestHeaders.set('jwt-_id', token.payload._id as string);
            requestHeaders.set(
                'jwt-username',
                token.payload.username as string
            );
        }
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

export default async function middleware(request: NextRequest) {
    // add pathname to headers for access in SSR components
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-pathname', request.nextUrl.pathname);

    // login paths
    if (API_AUTH_ROUTES.includes(request.nextUrl.pathname)) {
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
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
                const response = await extractJWTForNext(
                    cookie,
                    requestHeaders,
                    true
                );
                const token = await jwtVerify(
                    cookie.value,
                    new TextEncoder().encode(process.env.JWT_SECRET || '')
                );
                if (token.payload.role === Role.SUPER_ADMIN) {
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
                const response = await extractJWTForNext(
                    cookie,
                    requestHeaders,
                    false
                );
                if (response) {
                    return response;
                } else {
                    return NextResponse.redirect(new URL('/', request.url));
                }
            }
        } else {
            return NextResponse.next({
                request: {
                    headers: requestHeaders,
                },
            });
        }
    }
}
