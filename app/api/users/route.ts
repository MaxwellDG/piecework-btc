import AccountHandler from '../../../db/modeling/account';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const company = req.headers.get('jwt-company') as string;

    try {
        const accounts = await AccountHandler.findAllByCompany(company);
        return NextResponse.json({ accounts }, { status: 200 });
    } catch (e) {
        return NextResponse.json(
            { error: 'Error fetching accounts' },
            { status: 500 }
        );
    }
}
