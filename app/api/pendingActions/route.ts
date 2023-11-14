import dbConnect from '../../../db';
import PendingActionsHandler from '../../../db/models/pendingAction';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    await dbConnect();

    try {
        const company = req.headers.get('jwt-company') as string;
        const pendingActions =
            await PendingActionsHandler.getPendingActions(company);

        return NextResponse.json({ pendingActions }, { status: 200 });
    } catch (e) {
        return NextResponse.json(
            { error: 'Error finding pending actions' },
            { status: 500 }
        );
    }
}
