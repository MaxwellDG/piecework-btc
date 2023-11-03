'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import ConfirmModal from '../modals/confirm';
import { useRouter } from 'next/navigation';
import { EMAIL_SUBJECT_TYPE } from '../../(services)/mailer/types';

const ErrorText = dynamic(() => import('../ui/text/error'), {
    ssr: false,
});

export default function SignupInput() {
    const router = useRouter();

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
            setOrganization('');
            setShowModal(true);
            setError('');
        } else {
            setError('Company name taken');
        }
    }

    const navToDashboard = () => {
        router.push('/dashboard/settings/account');
    };

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
                <ConfirmModal
                    header="Company created"
                    closeModal={() => setShowModal(false)}
                    content="You will now be logged in and directed to the settings screen to set your admin account's password"
                    buttonTexts={['Go to dashboard']}
                    buttonFuncs={[navToDashboard]}
                />
            ) : null}
        </div>
    );
}
