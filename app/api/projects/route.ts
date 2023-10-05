import { HydratedDocument } from 'mongoose';
import dbConnect from '../../../db';
import ProjectsHandler, { IProject } from '../../../db/modeling/project';
import { NextResponse } from 'next/server';

export async function GET() {
    await dbConnect();

    const { companyId } = { companyId: '6515cfa37b8c4ebb9679801d' }; // todo get this info from JWT

    const projects: HydratedDocument<IProject>[] =
        await ProjectsHandler.findByCompanyId(companyId);

    return NextResponse.json(
        {
            projects,
        },
        { status: 200 }
    );
}

// todo update company to show changes for admin
export async function POST(req: Request) {
    await dbConnect();

    const { name } = await req.json();
    const { companyId } = { companyId: '6515cfa37b8c4ebb9679801d' }; // todo get this info from JWT

    const project: HydratedDocument<IProject> = await ProjectsHandler.create(
        name,
        companyId
    );

    if (project) {
        return NextResponse.json(
            {
                project,
            },
            { status: 200 }
        );
    }
}
