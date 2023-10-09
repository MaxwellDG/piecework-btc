import { NextRequest, NextResponse } from 'next/server';
import CompanyHandler, { ICompany } from '../../../db/modeling/company';
import {
    CompanyNameReq,
    UpdateCompanyReq,
} from '../../(types)/api/requests/company';
import dbConnect from '../../../db';
import AccountHandler, { IAccount, Role } from '../../../db/modeling/account';
import { HydratedDocument } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

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

            const jwt = sign(
                {
                    _id: admin._id,
                    username: admin.username,
                    companyId: admin.company,
                    role: admin.role,
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
            return NextResponse.json({ company, user: admin }, { status: 200 });
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
