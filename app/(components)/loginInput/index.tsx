'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { IAccount } from '../../../db/modeling/account';
import Link from 'next/link';
import Hello from '../hello';
import dynamic from 'next/dynamic';

const ErrorText = dynamic(() => import('../ui/text/error'), {
    ssr: false,
});

export default function LoginInput() {
    const router = useRouter();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState('');

    function navLogin() {
        router.push('/dashboard/home');
    }

    async function handleLogin() {
        setError('');
        // Check if account already exists
        const res = await fetch(`/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
                company,
                username,
                password,
            }),
        });
        if (res.ok) {
            const data: IAccount = await res.json();
            console.log('Show me res: ', res);
            console.log('Show me data: ', data);
            navLogin();
        } else {
            setError('Invalid login');
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-between mb-8">
                <Hello />
                <div className="flex flex-col justify-end">
                    <div className="flex gap-x-1">
                        <input
                            type="text"
                            placeholder="Company"
                            className="input input-bordered w-1/2 max-w-xs mb-6 pr-1"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                        <div className="w-1/2" />
                    </div>
                    <div className="flex gap-x-1">
                        <input
                            type="text"
                            placeholder="Username"
                            className="input input-bordered w-1/2 max-w-xs mb-6"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Password"
                            className="input input-bordered w-1/2 max-w-xs mb-8"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="flex w-full gap-x-1 mb-2">
                <button
                    type="button"
                    className="flex flex-1 btn btn-primary"
                    onClick={handleLogin}
                >
                    Login
                </button>
                <Link
                    href="/auth/signup"
                    className="flex flex-1 btn btn-primary"
                >
                    <p>Sign up</p>
                </Link>
            </div>
            <div className="h-[24.1px]">
                {error && <ErrorText text={error} />}
            </div>
        </div>
    );
}
