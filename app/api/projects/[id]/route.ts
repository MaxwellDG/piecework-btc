import { NextResponse } from 'next/server';
import dbConnect from '../../../../db';
import ProjectsHandler from '../.././../../db/modeling/project';
import ActivityHandler from '../../../../db/modeling/activity';
import {
    ActivityCRUD,
    ActivityType,
} from '../../../../db/modeling/activity/types';

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    await dbConnect();
    const company = req.headers.get('jwt-company') as string;
    const project = params.id;
    const { name } = await req.json();

    const res: boolean = await ProjectsHandler.deleteProject(company, project);
    await ActivityHandler.create(
        `${req.headers.get('jwt-username')} deleted project: ${name}`,
        ActivityCRUD.DELETED,
        ActivityType.PROJECTS,
        company,
        undefined
    );

    if (res) {
        return NextResponse.json({ status: 200 });
    } else {
        return NextResponse.json(
            { message: 'Project not found' },
            { status: 404 }
        );
    }
}
