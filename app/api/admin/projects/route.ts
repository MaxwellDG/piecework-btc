import { NextResponse } from 'next/server';
import dbConnect from '../../../../db';
import { Role } from '../../../../db/modeling/account';
import ProjectsHandler, { IProject } from '../../../../db/modeling/project';
import { HydratedDocument } from 'mongoose';

export async function GET(req: Request) {
    await dbConnect();

    const { role } = { role: Role.SUPER_ADMIN }; // todo get this info from JWT

    if (role === Role.SUPER_ADMIN) {
        const url = new URL(req.url);
        const companyId: string = url.searchParams.get('companyId') as string;
        const projects: HydratedDocument<IProject>[] =
            await ProjectsHandler.findByCompanyId(companyId);

        return NextResponse.json({ projects }, { status: 200 });
    } else {
        return NextResponse.json(
            { message: 'Unauthorized. Incorrect password' },
            { status: 401 }
        );
    }
}
