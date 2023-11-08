'use client';

import React from 'react';
import LogoutSVG from '../../../public/svgs/logout';
import { useRouter } from 'next/navigation';
import { tomorrowFont } from '../../layout';

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
            className="sciFi-btn"
            onMouseOver={() => toggleHovering(true)}
            onMouseLeave={() => toggleHovering(false)}
        >
            <div className="line" />
            {/* {LogoutSVG(25, isHover ? 'rgb(248 113 113)' : 'rgb(252 165 165)')} */}
            <div className="main-btn-container">
                <div className={`main-btn ${tomorrowFont.className}`}>
                    Logout
                </div>
            </div>
            <div className="bottom-right-corner" />
        </button>
    );
}
