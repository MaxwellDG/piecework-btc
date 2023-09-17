import { NextRequest, NextResponse } from 'next/server';
// import connectToDb from "../../../../db";
import AccountsHandler, {
    IAccount,
    Role,
} from '../../../../db/modeling/account';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

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
            { message: 'Unable to find user: ' + username },
            { status: 404 }
        );
    }
}
