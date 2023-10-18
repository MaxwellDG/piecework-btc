'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import ModalWrapper from '../modals';
import Link from 'next/link';

const ErrorText = dynamic(() => import('../ui/text/error'), {
    ssr: false,
});

export default function SignupInput() {
    const [organization, setOrganization] = React.useState('');
    const [error, setError] = React.useState('');
    const [showModal, setShowModal] = React.useState(false);

    async function handleCreate() {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/company`,
            {
                cache: 'no-store',
                method: 'POST',
                body: JSON.stringify({ name: organization }),
            }
        );
        if (res.ok) {
            // const data = await res.json();
            // console.log(data);
            setShowModal(true);
            setError('');
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
                className="button w-full mb-2"
                onClick={handleCreate}
            >
                Create company account
            </button>
            <div className="h-[24.1px]">
                {error && <ErrorText text={error} />}
            </div>

            {/* Modals */}
            {showModal ? (
                <ModalWrapper>
                    <p>{`Created company: ${organization}`}</p>
                    <span className="flex">
                        <p>{`Created username:`}</p>
                        <p className="font-bold">&nbsp;admin</p>
                    </span>
                    <span className="flex">
                        <p>{`Password:`}</p>
                        <p className="font-bold">&nbsp;password</p>
                    </span>

                    <p className="mb-8">
                        You will now be logged in and directed to the settings
                        screen to set your admin account password
                    </p>

                    <Link href="/dashboard/settings/account">
                        <div className="button">
                            <p>Confirm</p>
                        </div>
                    </Link>
                </ModalWrapper>
            ) : null}
        </div>
    );
}
