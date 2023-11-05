'use client';

import React from 'react';
import BackButton from '../../../(components)/ui/buttons/back';
import { UpdateAccountReq } from '../../../(types)/api/requests/accounts';
import HeroScreenContainer from '../../../(components)/containers/hero-screen-container';
import useToasts from '../../../(hooks)/useToasts';
import { TOAST_TYPE } from '../../../(types)/api';
import MainContent from '../../../(components)/containers/main-content';
import ArrowCornersCard from '../../../(components)/containers/cards/arrow-corners';

export default function AccountSettings() {
    const { createToast } = useToasts();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [role, setRole] = React.useState('');
    const [repeatPassword, setRepeatPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');

    React.useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/user');
            const user = await res.json();
            setUsername(user?.account?.username);
            setRole(user?.account?.role);
        };
        fetchUser();
    }, []);

    const updateUser = async (payload: UpdateAccountReq) => {
        await fetch('/api/user', {
            method: 'PATCH',
            body: JSON.stringify(payload),
        })
            .then(() =>
                createToast('Account information updated', TOAST_TYPE.SUCCESS)
            )
            .catch((e) =>
                createToast(
                    'Error while updating account information',
                    TOAST_TYPE.ERROR
                )
            );
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
        <HeroScreenContainer>
            <BackButton route="/dashboard/settings" />
            <MainContent>
                <ArrowCornersCard className="flex w-fit mb-8 p-2">
                    <span className="flex flex-1">
                        <p>Role:&nbsp;</p>
                        <p className="font-bold">{role}</p>
                    </span>
                </ArrowCornersCard>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        updateUser({ username });
                    }}
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
                            className="w-full mb-2"
                        />
                    </label>
                    <label>
                        Repeat new password:
                        <input
                            type="password"
                            name="repeatPassword"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                            className="w-full mb-2"
                        />
                    </label>
                    {passwordError && (
                        <p className="text-red-500">{passwordError}</p>
                    )}
                    <button type="submit" className="button w-full">
                        Update password
                    </button>
                </form>
            </MainContent>
        </HeroScreenContainer>
    );
}
