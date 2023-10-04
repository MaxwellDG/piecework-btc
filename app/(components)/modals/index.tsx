import React, { ReactNode } from 'react';
import Link from 'next/link';

type Props = {
    path: string;
    children: ReactNode;
};

export default function ModalWrapper({ children, path }: Props) {
    return (
        <div className="absolute z-50 top-0 right-0 left-0 bottom-0 h-screen w-screen">
            <Link href={path} className="h-full w-full">
                <div className="modal-box">{children}</div>
            </Link>
        </div>
    );
}
