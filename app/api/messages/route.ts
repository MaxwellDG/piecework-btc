import { NextRequest, NextResponse } from 'next/server';
import MessagesHandler, { IMessage } from '../../../db/modeling/message';

export async function GET(request: Request) {
    // todo get companyid from session. And this needs a guard obv
    // const messages: IMessage[] = await MessagesHandler.getMessages();
    const dummyData = [
        {
            text: 'test data',
            isUser: true,
            createdAt: new Date(Date.now()),
            isRead: true,
        },
        {
            text: 'test data me',
            isUser: false,
            createdAt: new Date(Date.now()),
            isRead: true,
        },
        {
            text: 'test data 2',
            isUser: true,
            createdAt: new Date(Date.now()),
            isRead: false,
        },
    ];
    return NextResponse.json({
        messages: dummyData,
    });
}

export async function POST(req: NextRequest) {
    const { text } = await req.json();
    // todo get companyid from session. And this needs a guard obv

    const message: IMessage = await MessagesHandler.create(true, text);
    return message;
}
