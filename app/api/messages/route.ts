import { NextResponse } from 'next/server';
import dbConnect from '../../../db';
import MessagesHandler from '../../../db/models/message';

export async function POST(req: Request) {
    await dbConnect();

    const companyId = req.headers.get('jwt-company') as string;
    const body = await req.json();

    const message = await MessagesHandler.create(
        body?.isUser,
        body.text,
        companyId,
        body?.taskId
    );

    if (message) {
        return NextResponse.json({ message }, { status: 200 });
    } else {
        return NextResponse.json({}, { status: 400 });
    }
}
