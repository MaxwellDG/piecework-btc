'use client';

import React from 'react';
import LogoutSVG from '../../../public/svgs/logout';
import { useRouter } from 'next/navigation';

export default function Logout() {
    const router = useRouter();
    const [isHover, toggleHovering] = React.useState(false);

    async function handleLogout() {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/');
    }

    return (
        <button
            type="button"
            onClick={handleLogout}
            className="btn bg-white rounded mb-8 w-full items-center group m-auto"
            onMouseOver={() => toggleHovering(true)}
            onMouseLeave={() => toggleHovering(false)}
        >
            {LogoutSVG(25, isHover ? 'rgb(248 113 113)' : 'rgb(252 165 165)')}
            <p className={`ml-6 text-red-300 group-hover:text-red-400 w-32`}>
                Logout
            </p>
        </button>
    );
}
