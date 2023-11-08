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
            return '#F2A900';
        } else {
            return estado ? '#F5D6A1' : 'rgb(209 213 219)';
        }
    }

    return (
        <div className="flex h-[50px] bottom-0 left-0 right-0 sm:absolute sm:left-4 sm:top-[50%]">
            <div
                className="w-full h-full bg-gradient-to-b from-[rgb(50,70,80)] to-[rgb(13, 16, 27)] sm:bg-none border-t border-teal border-t-4 rounded-t-lg sm:border-none sm:bg-transparent sm:w-fit"
                onMouseOver={() => setEstado(true)}
                onMouseLeave={() => setEstado(false)}
            >
                <div className="h-full flex flex-row justify-around items-center sm:h-fit sm:flex-col sm:gap-y-16 sm:-translate-y-2/4">
                    <Link href="/dashboard/" className="flex cursor-pointer">
                        {Home(
                            getColor(pathname === '/dashboard'),
                            25,
                            pathname !== '/dashboard'
                                ? 'nav-bar-button-stroke'
                                : ''
                        )}
                    </Link>
                    <Link
                        href="/dashboard/projects"
                        className="flex cursor-pointer"
                    >
                        {Projects(
                            getColor(pathname.split('/')[2] === 'projects'),
                            25,
                            pathname.split('/')[2] !== 'projects'
                                ? 'nav-bar-button-stroke'
                                : ''
                        )}
                    </Link>
                    <Link
                        href="/dashboard/messages"
                        className="flex cursor-pointer"
                    >
                        {Messages(
                            getColor(pathname.split('/')[2] === 'messages'),
                            25,
                            pathname.split('/')[2] !== 'messages'
                                ? 'nav-bar-button-stroke'
                                : ''
                        )}
                    </Link>
                    <Link
                        href="/dashboard/settings"
                        className="flex cursor-pointer"
                    >
                        {Settings(
                            getColor(pathname.split('/')[2] === 'settings'),
                            25,
                            pathname.split('/')[2] !== 'settings'
                                ? 'nav-bar-button-stroke'
                                : ''
                        )}
                    </Link>
                </div>
            </div>
        </div>
    );
}
