import { HydratedDocument } from 'mongoose';
import dbConnect from '../../../../db';
import TasksHandler, { ITask } from '../../../../db/modeling/task';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    await dbConnect();

    const { name, projectId } = await req.json();
    const { companyId } = { companyId: 'abc123' }; // todo get this info from JWT

    const task: HydratedDocument<ITask> = await TasksHandler.create(
        name,
        companyId,
        projectId
    );

    if (task) {
        return NextResponse.json(
            {
                task,
            },
            { status: 200 }
        );
    }
}
