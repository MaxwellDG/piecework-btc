'use client';

import React, { Suspense } from 'react';
import { ICompany } from '../../../../db/modeling/company';
import Loading from '../../loading';

export default function ProjectsList() {
    const [companies, setCompanies] = React.useState<ICompany[]>(
        [] as ICompany[]
    );

    React.useEffect(() => {
        async function getProjects() {
            const data: { companies: ICompany[] } = await fetch(
                '/api/admin/companies'
            ).then((res) => res.json());
            setCompanies(data.companies);
        }
        getProjects();
    }, []);

    return (
        <div className="w-full h-96 flex">
            <Suspense fallback={Loading()}>
                <div className="flex flex-1 flex-col overflow-y-auto">
                    {companies.length ? (
                        companies.map((project) => (
                            <Project key={project._id} project={project} />
                        ))
                    ) : (
                        <div className="flex flex-1 justify-center items-center">
                            <h3>No companies yet</h3>
                        </div>
                    )}
                </div>
            </Suspense>
        </div>
    );
}
