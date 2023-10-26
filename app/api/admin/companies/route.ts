import { HydratedDocument } from 'mongoose';
import dbConnect from '../../../../db';
import CompaniesHandler from '../../../../db/models/company';
import { NextResponse } from 'next/server';
import { ICompany } from '../../../../db/models/company/types';

export async function GET(req: Request) {
    await dbConnect();

    const url = new URL(req.url);
    const offset: string | null = url.searchParams.get('offset');
    const offsetDate: Date = !!offset
        ? new Date(parseInt(offset))
        : new Date(Date.now());
    const {
        companies,
        newOffset,
    }: { companies: HydratedDocument<ICompany>[]; newOffset: Date } =
        await CompaniesHandler.findAllPaginated(10, offsetDate);

    if (companies && newOffset) {
        return NextResponse.json(
            {
                companies,
                newOffset,
            },
            { status: 200 }
        );
    } else {
        return NextResponse.json(
            { message: 'Error retrieving companies' },
            { status: 500 }
        );
    }
}
