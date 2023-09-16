import { NextRequest, NextResponse } from 'next/server';
// import connectToDb from "../../../../db";
import AccountsHandler, {
    IAccount,
    Role,
} from '../../../../db/modeling/account';
import { cookies } from 'next/headers';
import { sign } from 'jsonwebtoken';

const MAX_EXPIRY = 60 * 60 * 24;

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { username, company, password } = body;

    // await connectToDb();
    // const account: IAccount | null = await AccountsHandler.findByLogin(
    //     company,
    //     username,
    //     password
    // );
    const account = {
        username: 'Test user',
        password: 'test pass',
        role: Role.ADMIN,
    };

    if (account) {
        const response = NextResponse.json(account, { status: 200 });

        // JWT
        const jwt = sign(
            {
                username: account.username,
            },
            process.env.JWT_SECRET || '',
            { expiresIn: MAX_EXPIRY }
        );

        cookies().set('JWT', jwt, {
            httpOnly: true,
            expires: MAX_EXPIRY,
            path: '/',
            sameSite: 'strict',
            secure: true,
        });

        return response;
    } else {
        return NextResponse.json(
            { message: 'Unable to find user: ' + username },
            { status: 404 }
        );
    }
}
