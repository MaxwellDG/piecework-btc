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

    // old nav bar code
    // className={`flex nav-con sm:flex sm:w-[50px] h-[40px] sm:h-[435px] sm:absolute sm:top-0 bottom-0 left-0 right-0 sm:right-auto sm:left-4 sm:flex-col
    // p-2 m-2 gap-x-2 justify-around sm:m-auto sm:gap-y-20 rounded-xl`}

    return (
        <div className="nav-con-containerest">
            <div
                className="nav-con-container"
                onMouseOver={() => setEstado(true)}
                onMouseLeave={() => setEstado(false)}
            >
                <div className="nav-con">
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
