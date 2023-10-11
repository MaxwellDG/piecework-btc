import { NextRequest, NextResponse } from 'next/server';
import AccountsHandler from '../../../../db/modeling/account';
import { serialize } from 'cookie';
import dbConnect from '../../../../db';
import { SignJWT } from 'jose';
import { IAccount } from '../../../../db/modeling/account/types';
import CompanyHandler from '../../../../db/modeling/company';
import { ICompany } from '../../../../db/modeling/company/types';

export async function POST(request: NextRequest) {
    await dbConnect();
    const body = await request.json();
    const { username, company: company_name, password } = body;

    const company: ICompany | null =
        await CompanyHandler.findByName(company_name);

    if (company) {
        const account: IAccount | null = await AccountsHandler.findByLogin(
            company._id.toString(),
            username,
            password
        );
        if (account) {
            const response = NextResponse.json(account, { status: 200 });
            const iat = Math.floor(Date.now() / 1000);
            const exp = iat + 60 * 60; // one hour

            const jwtPayload = {
                _id: account._id.toString(),
                username: account.username,
                companyId: account.company._id.toString(),
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
    } else {
        return NextResponse.json(
            { message: 'Could not find company:', company_name },
            { status: 401 }
        );
    }
}
