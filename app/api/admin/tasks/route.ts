import { NextResponse } from 'next/server';
import dbConnect from '../../../../db';
import { Role } from '../../../../db/modeling/account';
import { HydratedDocument } from 'mongoose';
import TasksHandler, { ITask } from '../../../../db/modeling/task';

export async function GET(req: Request) {
    await dbConnect();

    const { role } = { role: Role.SUPER_ADMIN }; // todo get this info from JWT

    if (role === Role.SUPER_ADMIN) {
        const url = new URL(req.url);
        const projectId: string = url.searchParams.get('projectId') as string;
        const companyId: string = url.searchParams.get('companyId') as string;
        const tasks: HydratedDocument<ITask>[] =
            await TasksHandler.findByProjectId(companyId, projectId);

        return NextResponse.json({ tasks }, { status: 200 });
    } else {
        return NextResponse.json(
            { message: 'Unauthorized. Incorrect password' },
            { status: 401 }
        );
    }
}
