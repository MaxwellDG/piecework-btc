import dbConnect from '../../../db';
import ActivityHandler from '../../../db/modeling/activity';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    await dbConnect();

    try {
        const company = req.headers.get('jwt-company') as string;
        const activities = await ActivityHandler.getActivity(company);

        return NextResponse.json({ activities }, { status: 200 });
    } catch (e) {
        return NextResponse.json(
            { error: 'Error finding activities' },
            { status: 500 }
        );
    }
}
