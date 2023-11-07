import { NextResponse } from 'next/server';
import dbConnect from '../../../../../db';
import TasksHandler from '../../../../../db/models/task';

export async function DELETE(
    req: Request,
    { params }: { params: { projectId: string; taskId: string } }
) {
    await dbConnect();

    const companyId = req.headers.get('jwt-company') as string;
    const taskId = params.taskId;
    const projectId = params.projectId;

    const bool: boolean = await TasksHandler.deleteTask(
        taskId,
        companyId,
        projectId
    );

    if (bool) {
        return NextResponse.json({ status: 200 });
    } else {
        return NextResponse.json(
            { message: 'Task not found' },
            { status: 404 }
        );
    }
}
