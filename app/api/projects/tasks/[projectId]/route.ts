import { HydratedDocument } from 'mongoose';
import dbConnect from '../../../../../db';
import TasksHandler, { ITask } from '../../../../../db/modeling/task';
import { NextResponse } from 'next/server';
import { useSearchParams } from 'next/navigation';

export async function GET() {
    await dbConnect();

    const { companyId } = { companyId: 'abc123' }; // todo get this info from JWT
    const searchParams = useSearchParams();
    const projectId: string = searchParams.get('projectId') as string;

    const tasks: HydratedDocument<ITask>[] | null =
        await TasksHandler.findByProjectId(companyId, projectId);

    return NextResponse.json(
        {
            tasks,
        },
        { status: 200 }
    );
}
