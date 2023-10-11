import { NextResponse } from 'next/server';
import AccountsHandler from '../../../db/modeling/account';
import dbConnect from '../../../db';
import { IAccount } from '../../../db/modeling/account/types';

export async function GET(request: Request) {
    const _id = request.headers.get('jwt-_id');

    try {
        await dbConnect();

        const account: IAccount | null = await AccountsHandler.findById(
            _id as string
        );

        return NextResponse.json({ account }, { status: 200 });
    } catch (e) {
        return NextResponse.json(
            { message: 'User does not appear to be logged in' },
            { status: 401, statusText: 'Unauthorized' }
        );
    }
}

export async function POST(request: Request) {
    await dbConnect();

    const { username, password, company, role } = await request.json();

    const account: IAccount | null = await AccountsHandler.create(
        username,
        password,
        role,
        company
    );

    return NextResponse.json(account);
}

export async function PUT(request: Request) {
    await dbConnect();

    const { id, username, password } = await request.json();

    const account: IAccount | null = await AccountsHandler.update(id, username);

    return new Response(
        JSON.stringify({
            account,
        })
    );
}

export async function DELETE(request: Request) {
    await dbConnect();

    const { id } = await request.json(); // todo make a req type for this???

    const account: IAccount | null = await AccountsHandler.deleteAccount(id);

    return new Response(
        JSON.stringify({
            message: 'Account: ' + account?.username + ' deleted',
        })
    );
}
