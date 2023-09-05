import { NextRequest, NextResponse } from "next/server";
import CompanyHandler, { ICompany } from "../../../db/modeling/company";
import connectToDb from "../../../db";
import {
  CompanyNameReq,
  UpdateCompanyReq,
} from "../../(types)/api/requests/company";

export async function POST(request: Request) {
  await connectToDb();

  const { name }: CompanyNameReq = await request.json();

  const company: ICompany | null = await CompanyHandler.create(name);

  if (company) {
    return NextResponse.json(company, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "Company name already exists" },
      { status: 409 }
    );
  }
}

export async function GET(req: NextRequest) {
  await connectToDb();

  const { name }: CompanyNameReq = await req.json();

  const company: ICompany | null = await CompanyHandler.findByName(name);
  if (company) {
    return NextResponse.json(company, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "Could not find company" },
      { status: 404 }
    );
  }
}

export async function PATCH(request: Request) {
  const obj: UpdateCompanyReq = await request.json();

  const company: ICompany | null = await CompanyHandler.update(obj);

  if (company) {
    return new Response(
      JSON.stringify({
        company,
      })
    );
  } else {
    return new Response(
      JSON.stringify({
        message: "Could not find company",
      }),
      { status: 409 }
    );
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  const company: ICompany | null = await CompanyHandler.deleteCompany(id);

  return new Response(
    JSON.stringify({
      message: "Company with name: " + company?.name + " deleted",
    })
  );
}
