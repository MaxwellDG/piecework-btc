import { NextResponse } from 'next/server';
import dbConnect from '../../../../db';
import ProjectsHandler from '../../../../db/models/project';
import { IProject } from '../../../../db/models/project/types';
import { HydratedDocument } from 'mongoose';

export async function POST(req: Request) {
    await dbConnect();

    const { companyId } = await req.json();
    const projects: HydratedDocument<IProject>[] =
        await ProjectsHandler.findByCompanyId(companyId);

    return NextResponse.json({ projects }, { status: 200 });
}
