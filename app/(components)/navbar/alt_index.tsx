'use client';

import Link from 'next/link';
import { useState } from 'react';
import Home from '../../../public/svgs/home';
import Projects from '../../../public/svgs/projects';
import Messages from '../../../public/svgs/messages';
import Settings from '../../../public/svgs/settings';
import { usePathname } from 'next/navigation';
import './styles.scss';

export default function NavBar() {
    const [estado, setEstado] = useState(false);
    const pathname = usePathname();

    function getColor(isActive: boolean) {
        if (isActive) {
            return estado ? '#F2A900' : '#F5D6A1';
        } else {
            return estado ? 'black' : 'rgba(0,0,0,0.1)';
        }
    }

    return (
        <div
            className={`nav-con absolute top-0 bottom-0 left-12 flex flex-col p-4 rounded-xl gap-x-2 justify-center h-fit m-auto`}
            onMouseOver={() => setEstado(true)}
            onMouseLeave={() => setEstado(false)}
        >
            <Link href="/dashboard/" className="mb-24 flex cursor-pointer">
                {Home(getColor(pathname === '/dashboard'), 25)}
            </Link>
            <Link
                href="/dashboard/projects"
                className="mb-24 flex cursor-pointer"
            >
                {Projects(getColor(pathname.split('/')[2] === 'projects'), 25)}
            </Link>
            <Link
                href="/dashboard/messages"
                className="mb-24 flex cursor-pointer"
            >
                {Messages(getColor(pathname.split('/')[2] === 'messages'), 25)}
            </Link>
            <Link href="/dashboard/settings" className="flex cursor-pointer">
                {Settings(getColor(pathname.split('/')[2] === 'settings'), 25)}
            </Link>
        </div>
    );
}
