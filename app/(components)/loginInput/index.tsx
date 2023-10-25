'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import Hello from '../hello';
import dynamic from 'next/dynamic';

const ErrorText = dynamic(() => import('../ui/text/error'), {
    ssr: false,
});

// used for easy login during development
// ensure that 'testing' company exists in db
const developmentPayload = {
    company: 'testing',
    username: 'admin',
    password: 'password',
};

export default function LoginInput() {
    const router = useRouter();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState('');

    function navLogin() {
        router.push('/dashboard');
    }

    async function handleLogin() {
        setError('');

        const payload =
            process.env.NODE_ENV === 'development'
                ? developmentPayload
                : {
                      username,
                      password,
                      company,
                  };

        console.log("payload we're using: ", payload);

        const res = await fetch(`/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            await res.json();
            navLogin();
        } else {
            setError('Invalid login');
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between sm:mb-8">
                <Hello />
                <div className="flex flex-col justify-end">
                    <input
                        type="text"
                        placeholder="Company"
                        className="input input-bordered w-full max-w-full max-w-xs mb-6 pr-1"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
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
                    className="flex flex-1 button"
                    onClick={handleLogin}
                >
                    Login
                </button>
                <Link href="/auth/signup" className="flex flex-1 button">
                    <p>Sign up</p>
                </Link>
            </div>
            <div className="h-[24.1px]">
                {error && <ErrorText text={error} />}
            </div>
        </div>
    );
}
