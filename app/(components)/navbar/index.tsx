'use client';

import Link from 'next/link';
import { useState } from 'react';

type Route = {
    route: string;
    icon: React.ReactElement;
};

enum ROUTE_NAME {
    HOME = 'HOME',
    PROJECTS = 'PROJECTS',
    MESSAGES = 'MESSAGES',
    SETTINGS = 'SETTINGS',
}

const ROUTES: Route[] = [
    { route: ROUTE_NAME.HOME, icon: <></> },
    { route: ROUTE_NAME.PROJECTS, icon: <></> },
    { route: ROUTE_NAME.MESSAGES, icon: <></> },
    { route: ROUTE_NAME.SETTINGS, icon: <></> },
];

export default function NavBar() {
    const [estado, setEstado] = useState(false);

    return (
        <div
            className="flex flex-col p-4 rounded-xl gap-x-2 absolute top-0 bottom-0 left-4"
            onMouseOver={() => setEstado(true)}
            onMouseLeave={() => setEstado(false)}
        >
            {ROUTES.map((route: Route, i: number) => (
                <Link href={route.route} className="flex items-center">
                    {route.icon}
                    {estado && <p className="ml-4">{route.route}</p>}
                </Link>
            ))}
        </div>
    );
}
