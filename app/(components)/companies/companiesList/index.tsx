'use client';

import React, { Suspense } from 'react';
import Loading from '../../loading';
import Company from '../company';
import { ICompany } from '../../../../db/models/company/types';

export default function CompaniesList() {
    const [companies, setCompanies] = React.useState<ICompany[]>(
        [] as ICompany[]
    );
    const [offset, setOffset] = React.useState<number>(Date.now());

    React.useEffect(() => {
        getProjects();
    }, []);

    async function getProjects() {
        await fetch(`/api/admin/companies?offset=${offset}`)
            .then((res) => res.json())
            .then((data) => {
                setCompanies(data.companies);
                const unixTimestamp = Math.floor(
                    new Date(data.newOffset).getTime() / 1000
                );
                setOffset(unixTimestamp);
            });
    }

    return (
        <div className="w-full h-96 flex">
            <Suspense fallback={Loading()}>
                <div className="flex flex-1 flex-col overflow-y-auto">
                    {companies.length ? (
                        companies.map((company) => (
                            <Company key={company._id} company={company} />
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
