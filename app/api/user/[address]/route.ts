import { NextRequest, NextResponse } from "next/server";
import connectToDb from "../../../../db";
import AccountsHandler, { IAccount } from "../../../../db/modeling/account";

export async function GET(
  request: NextRequest,
  { params }: { params: { address: string } }
): Promise<NextResponse> {
  await connectToDb();
  const address = params?.address;
  const account: IAccount | null = await AccountsHandler.findByAddress(address);

  if (account) {
    const response = NextResponse.json(account);
    // this section only for learning
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
  } else {
    return NextResponse.json({ message: "Unable to find address: " + address }, { status: 404 });
  }
}
