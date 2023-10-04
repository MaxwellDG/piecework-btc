import { ObjectId } from 'mongodb';
import { NextApiRequest } from 'next';
import { HydratedDocument } from 'mongoose';
import dbConnect from '../../../../db';
import TasksHandler, { ITask } from '../../../../db/modeling/task';
import { NextResponse } from 'next/server';

export async function GET(
    req: NextApiRequest,
    { params }: { params: { projectId: string } }
) {
    await dbConnect();

    const { companyId } = { companyId: '6515cfa37b8c4ebb9679801d' }; // todo get this info from JWT
    const projectId = params.projectId;

    const tasks: HydratedDocument<ITask>[] | null =
        await TasksHandler.findByProjectId(companyId, projectId);

    if (tasks) {
        return NextResponse.json(
            {
                tasks,
            },
            { status: 200 }
        );
    } else {
        return NextResponse.error('No tasks found', { status: 404 });
    }
}

export async function POST(req: Request) {
    await dbConnect();

    const { name, desc, price, projectId } = await req.json();
    const { companyId } = { companyId: '6515cfa37b8c4ebb9679801d' }; // todo get this info from JWT

    const project: HydratedDocument<ITask> = await TasksHandler.create(
        name,
        desc,
        price,
        projectId,
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
