'use client';

import useSWR from 'swr';
import React from 'react';
import Loading from '../../../(components)/loading';
import ModalWrapper from '../../../(components)/modals';
import { IAccount, Role } from '../../../../db/models/account/types';
import ConfirmModal from '../../../(components)/modals/confirm';
import ArrowCornersCard from '../../../(components)/containers/cards/arrow-corners';

export default function Page() {
    const { data, error, isLoading, mutate } = useSWR(
        '/api/users',
        async (url) => {
            const res = await fetch(url);
            const data = await res.json();
            const admins: IAccount[] = [];
            const users: IAccount[] = [];
            data?.accounts.forEach((account: IAccount) => {
                if (account.role === Role.ADMIN) {
                    admins.push(account);
                } else {
                    users.push(account);
                }
            });
            return { admins, users };
        }
    );

    const [newUser, setNewUser] = React.useState('');
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [showModal, toggleModal] = React.useState(false);

    // Reset when modal closes
    React.useEffect(() => {
        if (!showModal) {
            setNewUser('');
            setIsAdmin(false);
        }
    }, [showModal]);

    async function createNewUser(e: React.FormEvent) {
        e.preventDefault();
        const res = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({
                username: newUser,
                role: isAdmin ? Role.ADMIN : Role.USER,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.ok) {
            mutate();
            toggleModal(true);
        } else {
            console.log('Error creating user');
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                <h2 className="font-semibold text-xl">Create new user</h2>
                <form onSubmit={createNewUser} className="flex flex-col mb-8">
                    <div className="flex mb-2">
                        <input
                            value={newUser}
                            onChange={(e) => setNewUser(e.target.value)}
                            className="mr-8"
                            required
                            placeholder="username"
                        />
                        <div className="flex flex-col justify-between">
                            <p>Admin</p>
                            <input
                                type="checkbox"
                                onChange={() => setIsAdmin(!isAdmin)}
                                checked={isAdmin}
                                className="checkbox checkbox-primary"
                            />
                        </div>
                    </div>
                    <button type="submit" className="button self-start">
                        Create
                    </button>
                </form>
            </div>

            <div className="flex flex-col">
                <h2 className="font-semibold text-xl">Accounts</h2>
                {error ? (
                    <div>Error: {error.message}</div>
                ) : (
                    <div className="flex gap-x-2">
                        <div className="flex flex-col flex-1">
                            <h3>Admins</h3>
                            <div className="h-32">
                                <ArrowCornersCard canOverflow className="h-32">
                                    {isLoading ? (
                                        <div className="flex flex-1 justify-center items-center">
                                            {Loading()}
                                        </div>
                                    ) : (
                                        data?.admins.map((user: IAccount) => (
                                            <div key={user._id}>
                                                <p>{user.username}</p>
                                            </div>
                                        ))
                                    )}
                                </ArrowCornersCard>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1">
                            <div className="flex flex-col">
                                <h3>Users</h3>
                                <div className="h-32">
                                    <ArrowCornersCard
                                        canOverflow
                                        className="h-32"
                                    >
                                        {isLoading ? (
                                            <div className="flex flex-1 justify-center items-center">
                                                {Loading()}
                                            </div>
                                        ) : (
                                            data?.users.map(
                                                (user: IAccount) => (
                                                    <div key={user._id}>
                                                        <p>{user.username}</p>
                                                    </div>
                                                )
                                            )
                                        )}
                                    </ArrowCornersCard>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {showModal && (
                <ConfirmModal
                    closeModal={() => toggleModal(false)}
                    header="Created new user"
                    content={
                        <ul className="mb-8">
                            <li className="flex">
                                <p>Username:&nbsp;</p>
                                <p className="font-bold">{newUser}</p>
                            </li>
                            <li className="flex">
                                <p>Password:&nbsp;</p>
                                <p className="font-bold">password</p>
                            </li>
                            <li className="flex">
                                <p>Role:&nbsp;</p>
                                <p className="font-bold">
                                    {isAdmin ? Role.ADMIN : Role.USER}
                                </p>
                            </li>
                        </ul>
                    }
                    buttonFuncs={[() => toggleModal(false)]}
                    buttonTexts={['Okay']}
                />
            )}
        </div>
    );
}
