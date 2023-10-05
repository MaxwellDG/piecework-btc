import { sign } from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { Role } from '../../../../db/modeling/account';
import { serialize } from 'cookie';

// todo some sort of security for brute force attacks
// todo general security for sql injection? maybe not necessary if we're not using sql lol check for nosql equivalent
export async function POST(request: NextRequest) {
    const body = await request.json();
    const { password } = body;

    if (password === process.env.ADMIN_PASS) {
        const response = NextResponse.json({ status: 200 });

        // JWT
        const jwt = sign(
            {
                role: Role.SUPER_ADMIN,
            },
            process.env.JWT_SECRET || '',
            { expiresIn: '12h' }
        );

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
