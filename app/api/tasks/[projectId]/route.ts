import { HydratedDocument } from 'mongoose';
import dbConnect from '../../../../db';
import TasksHandler from '../../../../db/models/task';
import { ITask } from '../../../../db/models/task/types';
import { NextResponse } from 'next/server';
import { UpdateTaskReq } from '../../../(types)/api/requests/tasks';
import ActivityHandler from '../../../../db/models/activity';
import CompanyHandler from '../../../../db/models/company';
import {
    ActivityCRUD,
    ActivityType,
} from '../../../../db/models/activity/types';
import { IProject } from '../../../../db/models/project/types';
import { EMAIL_SUBJECT_TYPE } from '../../../(services)/mailer/types';
import MailHandler from '../../../../db/models/mail';

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

    const { name, description, price, imageUrls } = await req.json();
    const projectId = params.projectId;
    const companyId = req.headers.get('jwt-company') as string;
    const username = req.headers.get('jwt-username') as string;

    const task: HydratedDocument<ITask> = await TasksHandler.create(
        name,
        description,
        price,
        imageUrls,
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
            companyId,
            task._id
        );

        // update company to be viewed by admin
        await CompanyHandler.update(companyId, { viewedBySuperAdmin: false });

        // add mail for super admin
        await MailHandler.create(
            EMAIL_SUBJECT_TYPE.CREATED_TASK,
            companyId,
            task._id
        );

        return NextResponse.json(
            {
                task,
            },
            { status: 200 }
        );
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { projectId: string } }
) {
    await dbConnect();

    const { projectId } = params;
    const { _id, name, desc, price, status, imageUrls } = await req.json();
    const companyId = req.headers.get('jwt-company') as string;

    const obj: UpdateTaskReq = {
        name,
        desc,
        price,
        status,
        imageUrls,
    };

    const task: HydratedDocument<ITask> | null = await TasksHandler.update(
        _id,
        companyId,
        projectId,
        obj
    );

    if (task) {
        // add mail for super admin
        await MailHandler.create(
            EMAIL_SUBJECT_TYPE.UPDATED_TASK,
            companyId,
            task._id
        );

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
