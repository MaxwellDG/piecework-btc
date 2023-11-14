import { NextResponse } from 'next/server';
import dbConnect from '../../../../db';
import { HydratedDocument } from 'mongoose';
import TasksHandler from '../../../../db/models/task';
import { ITask } from '../../../../db/models/task/types';

export async function POST(req: Request) {
    await dbConnect();

    const { companyId, projectId } = await req.json();
    const tasks: HydratedDocument<ITask>[] = await TasksHandler.findByProjectId(
        companyId,
        projectId
    );

    if (tasks) {
        return NextResponse.json({ tasks }, { status: 200 });
    } else {
        return NextResponse.json(
            { message: 'Project and company ids do not match' },
            { status: 404 }
        );
    }
}
