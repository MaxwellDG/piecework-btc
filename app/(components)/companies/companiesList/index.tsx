'use client';

import React from 'react';
import Company from '../company';
import { ICompany } from '../../../../db/models/company/types';
import Loading from '../../loading';

export default function CompaniesList() {
    const [companies, setCompanies] = React.useState<ICompany[]>(
        [] as ICompany[]
    );
    const [offset, setOffset] = React.useState<number>(
        Math.floor(new Date(Date.now()).getTime() / 1000)
    );
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        let controller = new AbortController();
        getCompanies(controller);

        //aborts the request when the component umounts
        return () => controller?.abort();
    }, []);

    async function getCompanies(controller?: AbortController) {
        const signal = controller ? { signal: controller.signal } : {};

        await fetch(`/api/admin/companies?offset=${offset * 1000}`, signal)
            .then((res) => res.json())
            .then((data) => {
                if (controller) controller = undefined;
                setCompanies((prev) => [...prev, ...data.companies]);
                const unixTimestamp = Math.floor(
                    new Date(data.newOffset).getTime() / 1000
                );
                setOffset(unixTimestamp);
            })
            .finally(() => setLoading(false));
    }

    return (
        <div className="w-full h-96 flex flex-col">
            <div className="flex flex-1 flex-col overflow-y-auto pr-2 mb-2">
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
            <button
                type="button"
                style={{ all: 'unset', margin: 'auto', cursor: 'pointer' }}
                onClick={() => getCompanies()}
            >
                <p className="text-teal">See more</p>
            </button>
        </div>
    );
}
