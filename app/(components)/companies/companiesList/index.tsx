'use client';

import React, { Suspense } from 'react';
import { ICompany } from '../../../../db/modeling/company';
import Loading from '../../loading';
import Company from '../company';

export default function CompaniesList() {
    const [companies, setCompanies] = React.useState<ICompany[]>(
        [] as ICompany[]
    );

    React.useEffect(() => {
        async function getProjects() {
            await fetch('/api/admin/companies').then((res) => {
                console.log('get res? ', res);
                res.json().then((data) => setCompanies(data.companies));
            });
        }
        getProjects();
    }, []);

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
