import { NextResponse } from 'next/server';
import dbConnect from '../../../../db';
import ProjectsHandler from '../.././../../db/modeling/project';

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    await dbConnect();
    const company = req.headers.get('jwt-company') as string;
    const project = params.id;

    // todo cascade delete all tasks and activities
    const res: boolean = await ProjectsHandler.deleteProject(company, project);

    if (res) {
        return NextResponse.json({ status: 200 });
    } else {
        return NextResponse.json(
            { message: 'Project not found' },
            { status: 404 }
        );
    }
}
