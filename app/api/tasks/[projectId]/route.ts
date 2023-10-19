import { HydratedDocument } from 'mongoose';
import dbConnect from '../../../../db';
import TasksHandler from '../../../../db/modeling/task';
import { ITask } from '../../../../db/modeling/task/types';
import { NextResponse } from 'next/server';
import { UpdateTaskReq } from '../../../(types)/api/requests/tasks';
import ActivityHandler from '../../../../db/modeling/activity';
import CompanyHandler from '../../../../db/modeling/company';
import {
    ActivityCRUD,
    ActivityType,
} from '../../../../db/modeling/activity/types';
import { IProject } from '../../../../db/modeling/project/types';

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

export async function POST(
    req: Request,
    { params }: { params: { projectId: string } }
) {
    await dbConnect();

    const { name, description, price } = await req.json();
    const projectId = params.projectId;
    const companyId = req.headers.get('jwt-company') as string;
    const username = req.headers.get('jwt-username') as string;

    const task: HydratedDocument<ITask> = await TasksHandler.create(
        name,
        description,
        price,
        projectId,
        companyId
    );

    if (task) {
        // create activity
        const project: IProject = task.project as IProject;
        await ActivityHandler.create(
            `${username} created task '${name}' for project: ${project.name}`,
            ActivityCRUD.CREATED,
            ActivityType.TASKS,
            companyId
        );

        // update company to be viewed by admin
        await CompanyHandler.update(companyId, { updateViewedByAdmin: false });

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
