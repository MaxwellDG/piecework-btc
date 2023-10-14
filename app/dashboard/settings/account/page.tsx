'use client';

import React, { FormEventHandler } from 'react';
import BackButton from '../../../(components)/buttons/back';
import { UpdateAccountReq } from '../../../(types)/api/requests/accounts';
import { update } from '../../../../db/modeling/company';

export default function AccountSettings() {
    const [user, setUser] = React.useState({});

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');

    React.useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/user');
            const user = await res.json();
            setUsername(user);
        };
        fetchUser();
    }, []);

    const updateUser = async (payload: UpdateAccountReq) => {
        await fetch('/api/user', {
            method: 'PUT',
            body: JSON.stringify(payload),
        });
    };

    const updatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (password.length && password === repeatPassword) {
            updateUser({ password });
        } else {
            setPasswordError('Passwords must match');
        }
    };

    return (
        <div className="hero min-h-screen bg-base-200 flex flex-col justify-center">
            <div className="m-auto w-full max-w-4xl flex justify-center flex-col items-center">
                <div>
                    <BackButton route="/dashboard/settings" />
                    <div className="flex w-full">
                        <span className="flex">
                            <p>Company:</p>
                            <p className="font-bold">{}</p>
                        </span>
                        <span className="flex">
                            <p>Role:</p>
                            <p className="font-bold">{}</p>
                        </span>
                    </div>
                    <form
                        onSubmit={() => updateUser({ username })}
                        className="mb-8"
                    >
                        <label>
                            Username:
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="input w-full mb-2 input-bordered"
                            />
                        </label>
                        <button type="submit" className="button w-full">
                            Update username
                        </button>
                    </form>
                    <form onSubmit={updatePassword}>
                        <label>
                            New password:
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input w-full mb-2 input-bordered"
                            />
                        </label>
                        <label>
                            Repeat new password:
                            <input
                                type="password"
                                name="repeatPassword"
                                value={repeatPassword}
                                onChange={(e) =>
                                    setRepeatPassword(e.target.value)
                                }
                                className="input w-full mb-2 input-bordered"
                            />
                        </label>
                        {passwordError && (
                            <p className="text-red-500">{passwordError}</p>
                        )}
                        <button type="submit" className="button w-full">
                            Update password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
