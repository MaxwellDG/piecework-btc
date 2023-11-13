'use client';

import React, { Suspense } from 'react';
import Company from '../company';
import { ICompany } from '../../../../db/models/company/types';
import Loading from '../../loading';

export default function CompaniesList() {
    const [companies, setCompanies] = React.useState<ICompany[]>(
        [] as ICompany[]
    );
    const [offset, setOffset] = React.useState<number>(Date.now());
    const [loading, setLoading] = React.useState<boolean>(true);

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
            })
            .finally(() => setLoading(false));
    }

    return (
        <div className="w-full h-96 flex">
            <div className="flex flex-1 flex-col overflow-y-auto pr-2">
                {loading ? (
                    Loading()
                ) : companies?.length ? (
                    companies.map((company) => (
                        <Company key={company._id} company={company} />
                    ))
                ) : (
                    <div className="flex flex-1 justify-center items-center">
                        <h3>No companies yet</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
