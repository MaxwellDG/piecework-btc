import { NextRequest, NextResponse } from 'next/server';
import { Role } from '../../../../db/modeling/account/types';
import { serialize } from 'cookie';
import { SignJWT } from 'jose';

// todo some sort of security for brute force attacks
// todo general security for sql injection? maybe not necessary if we're not using sql lol check for nosql equivalent
export async function POST(request: NextRequest) {
    const body = await request.json();
    const { password } = body;

    if (password === process.env.ADMIN_PASS) {
        const response = NextResponse.json({ status: 200 });

        const iat = Math.floor(Date.now() / 1000);
        const exp = iat + 60 * 60; // one hour
        const jwtPayload = {
            role: Role.SUPER_ADMIN,
        };

        // JWT
        const jwt = await new SignJWT({ ...jwtPayload })
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setExpirationTime(exp)
            .setIssuedAt(iat)
            .setNotBefore(iat)
            .sign(new TextEncoder().encode(process.env.JWT_SECRET || ''));

        const serializedCookie = serialize('JWT', jwt, {
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
            secure: true,
        });
        response.headers.set('SET-COOKIE', serializedCookie);

        return response;
    } else {
        return NextResponse.json(
            { message: 'Incorrect admin password' },
            { status: 401 }
        );
    }
}
