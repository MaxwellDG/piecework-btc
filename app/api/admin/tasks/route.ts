import { NextResponse } from 'next/server';
import dbConnect from '../../../../db';
import { HydratedDocument } from 'mongoose';
import TasksHandler from '../../../../db/modeling/task';
import { ITask } from '../../../../db/modeling/task/types';

export async function GET(req: Request) {
    await dbConnect();

    const url = new URL(req.url);
    const projectId: string = url.searchParams.get('projectId') as string;
    const companyId: string = url.searchParams.get('companyId') as string;
    const tasks: HydratedDocument<ITask>[] = await TasksHandler.findByProjectId(
        companyId,
        projectId
    );

    if (tasks) {
        return NextResponse.json({ tasks }, { status: 200 });
    } else {
        return NextResponse.json(
            { message: 'Unauthorized. Incorrect password' },
            { status: 401 }
        );
    }
}
