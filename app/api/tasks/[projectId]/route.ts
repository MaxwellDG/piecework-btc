import { ObjectId } from 'mongodb';
import { NextApiRequest } from 'next';
import { HydratedDocument } from 'mongoose';
import dbConnect from '../../../../db';
import TasksHandler, { ITask } from '../../../../db/modeling/task';
import { NextResponse } from 'next/server';
import { UpdateTaskReq } from '../../../(types)/api/requests/tasks';

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

// todo update company to show changes for admin
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

export async function PUT(req: Request) {
    await dbConnect();

    const { _id, name, desc, price, status } = await req.json();
    const { companyId } = { companyId: '6515cfa37b8c4ebb9679801d' }; // todo get this info from JWT
    const params: UpdateTaskReq = {
        name,
        desc,
        price,
        status,
    };

    const task: HydratedDocument<ITask> | null = await TasksHandler.update(
        _id,
        companyId,
        params
    );

    if (task) {
        return NextResponse.json(
            {
                task,
            },
            { status: 200 }
        );
    } else {
        return NextResponse.error('Task not found', { status: 404 });
    }
}

export async function DELETE(
    req: NextApiRequest,
    { params }: { params: { taskId: string } }
) {
    await dbConnect();

    const { companyId } = { companyId: '6515cfa37b8c4ebb9679801d' }; // todo get this info from JWT
    const taskId = params.taskId;

    const task: HydratedDocument<ITask> | null = await TasksHandler.delete(
        taskId,
        companyId
    );

    if (task) {
        return NextResponse.json(
            {
                task,
            },
            { status: 200 }
        );
    } else {
        return NextResponse.error('Task not found', { status: 404 });
    }
}
