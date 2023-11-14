import React, { Suspense } from 'react';
import AddTask from '../../../(components)/projects/addTask';
import TasksList from '../../../(components)/projects/tasksList';
import { usePathnameServer } from '../../../(hooks)/useServerHeaders';
import { headers } from 'next/headers';
import ProjectsHandler from '../../../../db/models/project';
import BackButton from '../../../(components)/ui/buttons/back';
import HeroScreenContainer from '../../../(components)/containers/hero-screen-container';
import dbConnect from '../../../../db';

type Props = {
    searchParams: Record<string, string> | null;
};

export default async function Tasks({ searchParams }: Props) {
    await dbConnect();
    const { id: projectId, path } = usePathnameServer();
    const _headers = headers();
    const company = _headers.get('jwt-company') as string;
    const { id } = usePathnameServer();
    const project = await ProjectsHandler.findById(id, company);

    return (
        <HeroScreenContainer>
            <BackButton route="/dashboard/projects" />
            <h2 className="text-4xl font-bold mb-8">{project?.name}</h2>
            <div className="flex justify-between">
                <h2 className="text-4xl font-bold mb-2">Tasks</h2>
                <AddTask
                    projectId={projectId}
                    modalOpen={!!searchParams?.modal}
                    path={path}
                />
            </div>
            <TasksList projectId={projectId} />
        </HeroScreenContainer>
    );
}
