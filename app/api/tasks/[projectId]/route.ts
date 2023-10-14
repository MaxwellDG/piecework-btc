import { HydratedDocument } from 'mongoose';
import dbConnect from '../../../../db';
import TasksHandler, { ITask } from '../../../../db/modeling/task';
import { NextResponse } from 'next/server';
import { UpdateTaskReq } from '../../../(types)/api/requests/tasks';
import {
    ActivityCRUD,
    ActivityType,
} from '../../../../db/modeling/activity/types';
import ActivityHandler from '../../../../db/modeling/activity';

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
    const username = req.headers.get('jwt-username') as string;

    const task: HydratedDocument<ITask> = await TasksHandler.create(
        name,
        desc,
        price,
        projectId,
        companyId
    );

    if (task) {
        // todo update company to show changes for admin
        ActivityHandler.create(
            `${username} created task '${name}' for project: ${projectId}`,
            ActivityCRUD.CREATED,
            ActivityType.TASKS,
            companyId
        );

        return NextResponse.json(
            {
                task,
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
