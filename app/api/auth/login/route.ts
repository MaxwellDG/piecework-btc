import { NextRequest, NextResponse } from 'next/server';
import AccountsHandler, { IAccount } from '../../../../db/modeling/account';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';
import dbConnect from '../../../../db';

export async function POST(request: NextRequest) {
    await dbConnect();
    const body = await request.json();
    const { username, company, password } = body;

    const account: IAccount | null = await AccountsHandler.findByLogin(
        company,
        username,
        password
    );

    console.log('Account: ', account);

    if (account) {
        const response = NextResponse.json(account, { status: 200 });

        // JWT
        const jwt = sign(
            {
                _id: account._id,
                username: account.username,
                companyId: account.company,
                role: account.role,
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
            { message: 'Incorrect credentials for user: ' + username },
            { status: 401 }
        );
    }
}
