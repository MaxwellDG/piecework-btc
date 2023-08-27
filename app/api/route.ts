import { NextRequest, NextResponse } from "next/server";
import AccountsHandler, {
  AccountModel,
  IAccount,
} from "../../db/modeling/account";
import connectToDb from "../../db";
import { Db } from "mongodb";

// /api/[address]
export async function GET(
  request: NextRequest,
  context: { params: { address: string } }
): Promise<NextResponse> {
  await connectToDb(); // todo make this middleware

  const address = context.params.address;
  console.log("Address paam??", address);
  const account: IAccount | null = await AccountsHandler.findByAddress(address);

  const response = NextResponse.json({ account });

  const numAccessedCookie = request.cookies.get("numAccessed");
  if (numAccessedCookie) {
    response.cookies.set(
      "numAccessed",
      (parseInt(numAccessedCookie.value) + 1).toString()
    );
  } else {
    response.cookies.set("numAccessed", "1");
  }
  return response;
}

export async function HEAD(request: Request) {}

export async function POST(request: Request) {
  await connectToDb();
  const { address } = await request.json(); // todo make a req type for this???

  const account: IAccount | null = await AccountsHandler.create(address);

  return new Response(
    JSON.stringify({
      account
    })
  );
}

export async function PUT(request: Request) {
    await connectToDb();
    
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
    await connectToDb();
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
