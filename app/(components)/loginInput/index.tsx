'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import Hello from '../hello';
import dynamic from 'next/dynamic';
import HoverInfo from '../hoverInfo';
import Question from '../../../public/svgs/question';
import GlitchButton from '../ui/buttons/glitch';

const ErrorText = dynamic(() => import('../ui/text/error'), {
    ssr: false,
});

// used for easy login during development
// ensure that 'testing' company exists in db. If not, refer to README.md section on seeding db
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
    const [isHover, toggleHover] = React.useState(false);
    const [isLoading, toggleLoading] = React.useState(false);

    function navLogin() {
        router.push('/dashboard');
    }

    async function handleLogin() {
        toggleLoading(true);
        setError('');

        const payload =
            process.env.NODE_ENV === 'development'
                ? developmentPayload
                : {
                      username,
                      password,
                      company,
                  };

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
        toggleLoading(false);
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between sm:mb-8">
                <Hello />
                <div className="flex flex-col justify-end relative">
                    {isHover && (
                        <div className="absolute -top-8 right-0 w-full">
                            <div className="flex border border-toastBlue bg-white px-2 rounded">
                                <p>
                                    {`If you have recently made an account, it
                                    might be useful to know that all default
                                    passwords are 'password'. Newly created
                                    companies all have an account with username
                                    'admin'. These can be changed on the
                                    'Account Settings' page.`}
                                </p>
                            </div>
                        </div>
                    )}
                    <div className="flex relative">
                        <input
                            type="text"
                            placeholder="Company"
                            className="w-full max-w-full mb-6 pr-1"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            autoFocus
                        />
                        {error && (
                            <div
                                className="ml-2 cursor-pointer"
                                onMouseOver={() => toggleHover(true)}
                                onMouseOut={() => toggleHover(false)}
                            >
                                {Question('grey', 20)}
                            </div>
                        )}
                    </div>
                    <div className="flex gap-x-1 mb-6">
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-1/2 max-w-xs"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Password"
                            className="w-1/2 max-w-xs"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="flex w-full gap-x-1 mb-2">
                <div className="flex flex-1">
                    <GlitchButton
                        text={isLoading ? 'Logging in...' : 'Login'}
                        onClick={handleLogin}
                        isRightLeaning={false}
                    />
                </div>
                <div className="flex flex-1">
                    <Link
                        href="/auth/signup"
                        className="w-full outline-none"
                        tabIndex={-1}
                    >
                        <GlitchButton
                            text="Sign up"
                            onClick={() => {}}
                            isRightLeaning
                        />
                    </Link>
                </div>
            </div>
            <div className="h-[24.1px]">
                {error && <ErrorText text={error} />}
            </div>
        </div>
    );
}
