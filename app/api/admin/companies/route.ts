import { HydratedDocument } from 'mongoose';
import dbConnect from '../../../../db';
import CompaniesHandler, { ICompany } from '../../../../db/modeling/company';
import { NextResponse } from 'next/server';
import { Role } from '../../../../db/modeling/account';

export default async function GET(req: Request) {
    await dbConnect();

    const { role } = { role: Role.SUPER_ADMIN }; // todo get this info from JWT
    if (role === Role.SUPER_ADMIN) {
        const url = new URL(req.url);
        const offset: string | null = url.searchParams.get('offset');
        const offsetDate: Date = !!offset
            ? new Date(parseInt(offset))
            : new Date(Date.now());
        console.log('offset date: ', offsetDate);
        const {
            companies,
            newOffset,
        }: { companies: HydratedDocument<ICompany>[]; newOffset: Date } =
            await CompaniesHandler.findAllPaginated(10, offsetDate);

        return NextResponse.json(
            {
                companies,
                newOffset,
            },
            { status: 200 }
        );
    } else {
        NextResponse.json({message: 'Unauthorized. Incorrect password'}, {status: 401})
    }
}
