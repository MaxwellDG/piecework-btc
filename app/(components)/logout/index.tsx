'use client';

import React from 'react';
import LogoutSVG from '../../../public/svgs/logout';

export default function Logout() {
    const [isHover, toggleHovering] = React.useState(false);

    function handleLogout() {
        console.log('Pressed');
    }

    return (
        <button
            type="button"
            onClick={handleLogout}
            className="btn bg-white rounded mb-8 w-1/2 items-center group m-auto"
            onMouseOver={() => toggleHovering(true)}
            onMouseLeave={() => toggleHovering(false)}
        >
            {LogoutSVG(25, isHover ? 'rgb(248 113 113)' : 'rgb(252 165 165)')}
            <p className={`ml-6 text-red-300 group-hover:text-red-400`}>
                Logout
            </p>
        </button>
    );
}
