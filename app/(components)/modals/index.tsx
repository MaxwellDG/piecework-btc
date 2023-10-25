import React, { ReactNode } from 'react';
import Link from 'next/link';

type Props = {
    children: ReactNode;
    path?: string; // used for toggling the ?modal= query param in SSR components
};

export default function ModalWrapper({ children, path }: Props) {
    return (
        <div className="absolute z-50 top-0 right-0 left-0 bottom-0 h-screen w-screen p-0">
            {path ? (
                <Link
                    href={path}
                    className="absolute top-0 right-0 left-0 bottom-0 flex h-full w-full justify-center items-center"
                ></Link>
            ) : null}
            <div className="absolute top-0 right-0 left-0 bottom-0 m-auto h-fit modal-box p-0">
                {children}
            </div>
        </div>
    );
}
