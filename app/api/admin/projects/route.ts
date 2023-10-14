import { NextResponse } from 'next/server';
import dbConnect from '../../../../db';
import ProjectsHandler, { IProject } from '../../../../db/modeling/project';
import { HydratedDocument } from 'mongoose';

export async function GET(req: Request) {
    await dbConnect();

    const url = new URL(req.url);
    const companyId: string = url.searchParams.get('companyId') as string;
    const projects: HydratedDocument<IProject>[] =
        await ProjectsHandler.findByCompanyId(companyId);

    return NextResponse.json({ projects }, { status: 200 });
}
