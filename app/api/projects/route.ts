import { HydratedDocument } from 'mongoose';
import dbConnect from '../../../db';
import ProjectsHandler from '../../../db/models/project';
import { IProject } from '../../../db/models/project/types';
import { NextResponse } from 'next/server';
import ActivityHandler from '../../../db/models/activity';
import { ActivityCRUD, ActivityType } from '../../../db/models/activity/types';

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

export async function POST(req: Request) {
    await dbConnect();

    const { name } = await req.json();
    const company = req.headers.get('jwt-company') as string;
    const username = req.headers.get('jwt-username') as string;

    const project: HydratedDocument<IProject> = await ProjectsHandler.create(
        name,
        company
    );

    if (project) {
        await ActivityHandler.create(
            `${username} created project ${name}`,
            ActivityCRUD.CREATED,
            ActivityType.PROJECTS,
            company,
            project._id
        );

        return NextResponse.json(
            {
                project,
            },
            { status: 200 }
        );
    } else {
        return NextResponse.json(
            {
                message: 'Error while creating project',
            },
            { status: 400 }
        );
    }
}

export async function PATCH(req: Request) {
    await dbConnect();

    const { _id, name } = await req.json();
    const company = req.headers.get('jwt-company') as string;
    const username = req.headers.get('jwt-username') as string;

    const project: HydratedDocument<IProject> | null =
        await ProjectsHandler.update(_id, company, { name });

    if (project) {
        await ActivityHandler.create(
            `${username} changed project ${name} to: ${project.name}`,
            ActivityCRUD.UPDATED,
            ActivityType.PROJECTS,
            company,
            project._id
        );

        return NextResponse.json(
            {
                project,
            },
            { status: 200 }
        );
    } else {
        return NextResponse.json(
            {
                message: 'Error while updating project',
            },
            { status: 400 }
        );
    }
}
