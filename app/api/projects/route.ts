import { HydratedDocument } from 'mongoose';
import dbConnect from '../../../db';
import ProjectsHandler, { IProject } from '../../../db/modeling/project';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(req: Request) {
    await dbConnect();

    const company = req.headers.get('jwt-company') as string;
    const projects: HydratedDocument<IProject>[] =
        await ProjectsHandler.findByCompanyId(company);

    return NextResponse.json(
        {
            projects,
        },
        { status: 200 }
    );
}

// todo update company to show changes for admin
export async function POST(req: Request) {
    console.log('hit endpoint');
    await dbConnect();

    const { name } = await req.json();
    const company = req.headers.get('jwt-company') as string;

    const project: HydratedDocument<IProject> = await ProjectsHandler.create(
        name,
        company
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
