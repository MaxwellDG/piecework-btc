import { NextRequest, NextResponse } from "next/server";
import AccountsHandler, {
  IAccount,
} from "../../../db/modeling/account";
import connectToDb from "../../../db";


export async function HEAD(request: Request) {}

export async function POST(request: Request) {
  await connectToDb();

  const { address } = await request.json(); // todo make a req type for this???

  const account: IAccount | null = await AccountsHandler.create(address);

  console.log("post created: ", account);

  return NextResponse.json(account);
}

export async function PUT(request: Request) {    
    // todo add some real properties to change instead of address
    const { id, address } = await request.json(); // todo make a req type for this???
  
    const account: IAccount | null = await AccountsHandler.update(id, address)
  
    return new Response(
      JSON.stringify({
        account
      })
    );
}

export async function DELETE(request: Request) {
    const { id } = await request.json(); // todo make a req type for this???
  
    const account: IAccount | null = await AccountsHandler.deleteAccount(id)
  
    return new Response(
      JSON.stringify({
        message: 'Account with address: ' + account?.address + " deleted"
      })
    );
}

export async function PATCH(request: Request) {}

export async function OPTIONS(request: Request) {}
