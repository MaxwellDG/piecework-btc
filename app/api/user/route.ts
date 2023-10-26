import { NextResponse } from 'next/server';
import AccountsHandler from '../../../db/models/account';
import dbConnect from '../../../db';
import { IAccount, Role } from '../../../db/models/account/types';
import { UpdateAccountReq } from '../../(types)/api/requests/accounts';

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

    const { username, role } = await request.json();
    const company = request.headers.get('jwt-company') as string;

    const account: IAccount | null = await AccountsHandler.create(
        username,
        'password',
        role,
        company
    );

    return NextResponse.json(account);
}

export async function PATCH(request: Request) {
    await dbConnect();

    const _id = request.headers.get('jwt-_id') as string;
    const obj: UpdateAccountReq = await request.json();

    const account: IAccount | null = await AccountsHandler.update(_id, obj);

    if (account) {
        return new Response(
            JSON.stringify({
                account,
            })
        );
    } else {
        return NextResponse.json(
            { message: 'Account not found' },
            { status: 404 }
        );
    }
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
