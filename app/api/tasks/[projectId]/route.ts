import { ObjectId } from 'mongodb';
import { HydratedDocument } from 'mongoose';
import dbConnect from '../../../../db';
import TasksHandler, { ITask } from '../../../../db/modeling/task';
import { NextResponse } from 'next/server';
import { UpdateTaskReq } from '../../../(types)/api/requests/tasks';

export async function GET(
    req: Request,
    { params }: { params: { projectId: string } }
) {
    await dbConnect();

    const companyId = req.headers.get('jwt-company') as string;
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
        return NextResponse.json(
            { message: 'No tasks found' },
            { status: 404 }
        );
    }
}

export async function POST(req: Request) {
    await dbConnect();

    const { name, desc, price, projectId } = await req.json();
    const companyId = req.headers.get('jwt-company') as string;

    const project: HydratedDocument<ITask> = await TasksHandler.create(
        name,
        desc,
        price,
        projectId,
        companyId
    );

    if (project) {
        // todo update company to show changes for admin

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
    const companyId = req.headers.get('jwt-company') as string;

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
        return NextResponse.json(
            { message: 'Task not found' },
            { status: 404 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { taskId: string } }
) {
    await dbConnect();

    const companyId = req.headers.get('jwt-company') as string;

    const taskId = params.taskId;

    const bool: boolean = await TasksHandler.deleteTask(taskId, companyId);

    if (bool) {
        return NextResponse.json({ status: 200 });
    } else {
        return NextResponse.json(
            { message: 'Task not found' },
            { status: 404 }
        );
    }
}
