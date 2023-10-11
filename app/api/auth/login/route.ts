import { NextRequest, NextResponse } from 'next/server';
import AccountsHandler, { IAccount } from '../../../../db/modeling/account';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import dbConnect from '../../../../db';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';

export async function POST(request: NextRequest) {
    await dbConnect();
    const body = await request.json();
    const { username, company, password } = body;

    const account: IAccount | null = await AccountsHandler.findByLogin(
        company,
        username,
        password
    );

    if (account) {
        const response = NextResponse.json(account, { status: 200 });
        const iat = Math.floor(Date.now() / 1000);
        const exp = iat + 60 * 60; // one hour

        const jwtPayload = {
            _id: account._id,
            username: account.username,
            companyId: account.company,
            role: account.role,
        };

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
            { message: 'Incorrect credentials for user: ' + username },
            { status: 401 }
        );
    }
}
