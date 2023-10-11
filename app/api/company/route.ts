import { NextRequest, NextResponse } from 'next/server';
import CompanyHandler, { ICompany } from '../../../db/modeling/company';
import {
    CompanyNameReq,
    UpdateCompanyReq,
} from '../../(types)/api/requests/company';
import dbConnect from '../../../db';
import AccountHandler from '../../../db/modeling/account';
import { HydratedDocument } from 'mongoose';
import { serialize } from 'cookie';
import { SignJWT } from 'jose';
import { JWT_DATA } from '../../(types)/api';
import { IAccount, Role } from '../../../db/modeling/account/types';

export async function POST(request: Request) {
    await dbConnect();

    const { name }: CompanyNameReq = await request.json();

    const company: HydratedDocument<ICompany> | null =
        await CompanyHandler.create(name);

    if (company) {
        // Creating a company must always be followed by creating an associated admin account
        const admin: HydratedDocument<IAccount> | null =
            await AccountHandler.create(
                'admin',
                'password',
                Role.ADMIN,
                company.id
            );

        if (admin) {
            const response = NextResponse.json(admin, { status: 200 });

            const iat = Math.floor(Date.now() / 1000);
            const exp = iat + 60 * 60; // one hour

            const jwtPayload: JWT_DATA = {
                _id: admin._id,
                username: admin.username,
                companyId: admin.company._id.toString(),
                role: admin.role,
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
                { message: 'Error while creating admin account for company' },
                { status: 400 }
            );
        }
    } else {
        return NextResponse.json(
            { message: 'Company name already exists' },
            { status: 409 }
        );
    }
}

export async function GET(req: NextRequest) {
    await dbConnect();

    const { name }: CompanyNameReq = await req.json();

    const company: ICompany | null = await CompanyHandler.findByName(name);
    if (company) {
        return NextResponse.json(company, { status: 200 });
    } else {
        return NextResponse.json(
            { message: 'Could not find company' },
            { status: 404 }
        );
    }
}

export async function PATCH(request: Request) {
    await dbConnect();

    const obj: UpdateCompanyReq = await request.json();

    const company: ICompany | null = await CompanyHandler.update(obj);

    if (company) {
        return new Response(
            JSON.stringify({
                company,
            })
        );
    } else {
        return new Response(
            JSON.stringify({
                message: 'Could not find company',
            }),
            { status: 409 }
        );
    }
}

export async function DELETE(request: Request) {
    await dbConnect();

    const { id } = await request.json();

    const company: ICompany | null = await CompanyHandler.deleteCompany(id);

    return new Response(
        JSON.stringify({
            message: 'Company with name: ' + company?.name + ' deleted',
        })
    );
}
