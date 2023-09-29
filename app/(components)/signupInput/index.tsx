'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import dynamic from 'next/dynamic';

const ErrorText = dynamic(() => import('../ui/text/error'), {
    ssr: false,
});

export default function SignupInput() {
    const router = useRouter();

    const [organization, setOrganization] = React.useState('');
    const [error, setError] = React.useState('');

    function navLogin() {
        router.push('/dashboard');
    }

    async function handleCreate() {
        const res = await fetch('/api/company', {
            method: 'POST',
            body: JSON.stringify({ name: organization }),
        });
        if (res) {
            setError('');
            navLogin();
        } else {
            setError('Company name taken');
        }
    }

    return (
        <div className="flex flex-col">
            <input
                type="text"
                className="input input-bordered w-full max-w-xs mb-8"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
            />
            <button
                type="button"
                className="btn btn-primary w-full mb-2"
                onClick={handleCreate}
            >
                Create company account
            </button>
            <div className="h-[24.1px]">
                {error && <ErrorText text={error} />}
            </div>
        </div>
    );
}
