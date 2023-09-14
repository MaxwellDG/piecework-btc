import { NextRequest, NextResponse } from 'next/server'
import AccountsHandler, { IAccount } from '../../../db/modeling/account'

export async function HEAD(request: Request) {}

export async function POST(request: Request) {
    // await connectToDb();

    const { username, password, company } = await request.json()

    const account: IAccount | null = await AccountsHandler.create(
        company,
        username,
        password
    )

    return NextResponse.json(account)
}

export async function PUT(request: Request) {
    const { id, address } = await request.json()

    const account: IAccount | null = await AccountsHandler.update(id, address)

    return new Response(
        JSON.stringify({
            account,
        })
    )
}

export async function DELETE(request: Request) {
    const { id } = await request.json() // todo make a req type for this???

    const account: IAccount | null = await AccountsHandler.deleteAccount(id)

    return new Response(
        JSON.stringify({
            message: 'Account: ' + account?.username + ' deleted',
        })
    )
}

export async function PATCH(request: Request) {}

export async function OPTIONS(request: Request) {}
