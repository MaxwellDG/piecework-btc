'use client';

import Link from 'next/link';
import { useState } from 'react';
import Home from '../../../public/svgs/home';
import Projects from '../../../public/svgs/projects';
import Messages from '../../../public/svgs/messages';
import Settings from '../../../public/svgs/settings';
import { usePathname } from 'next/navigation';

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
            className={`flex flex-col p-4 rounded-xl gap-x-2 justify-center ${
                estado ? 'custom-bg-color' : ''
            }`}
            onMouseOver={() => setEstado(true)}
            onMouseLeave={() => setEstado(false)}
        >
            <Link href="home" className="mb-24 flex cursor-pointer">
                {Home(getColor(pathname.split('/')[2] === 'home'), 25)}
                {estado && (
                    <p
                        className={`ml-12 cursor-pointer ${
                            pathname.split('/')[2] === 'home'
                                ? 'text-btcOrange'
                                : ''
                        }`}
                    >
                        Home
                    </p>
                )}
            </Link>
            <Link href="projects" className="mb-24 flex cursor-pointer">
                {Projects(getColor(pathname.split('/')[2] === 'projects'), 25)}

                {estado && (
                    <p
                        className={`ml-12 cursor-pointer ${
                            pathname.split('/')[2] === 'projects'
                                ? 'text-btcOrange'
                                : ''
                        }`}
                    >
                        Projects
                    </p>
                )}
            </Link>
            <Link href="messages" className="mb-24 flex cursor-pointer">
                {Messages(getColor(pathname.split('/')[2] === 'messages'), 25)}

                {estado && (
                    <p
                        className={`ml-12 cursor-pointer ${
                            pathname.split('/')[2] === 'messages'
                                ? 'text-btcOrange'
                                : ''
                        }`}
                    >
                        Messages
                    </p>
                )}
            </Link>
            <Link href="settings" className="flex cursor-pointer">
                {Settings(getColor(pathname.split('/')[2] === 'settings'), 25)}

                {estado && (
                    <p
                        className={`ml-12 cursor-pointer ${
                            pathname.split('/')[2] === 'settings'
                                ? 'text-btcOrange'
                                : ''
                        }`}
                    >
                        Settings
                    </p>
                )}
            </Link>
        </div>
    );
}
