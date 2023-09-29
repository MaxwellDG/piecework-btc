import { NextRequest, NextResponse } from 'next/server';
import AccountsHandler, { IAccount } from '../../../db/modeling/account';
import dbConnect from '../../../db';

export async function POST(request: Request) {
    await dbConnect();

    const { username, password, company } = await request.json();

    const account: IAccount | null = await AccountsHandler.create(
        company,
        username,
        password
    );

    return NextResponse.json(account);
}

export async function PUT(request: Request) {
    await dbConnect();

    const { id, address } = await request.json();

    const account: IAccount | null = await AccountsHandler.update(id, address);

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
