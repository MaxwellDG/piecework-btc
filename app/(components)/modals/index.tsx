import React, { ReactNode } from 'react';
import Link from 'next/link';
import Close from '../../../public/svgs/close';

// modal wrapper for when using modals in SSR components

type Props = {
    header: string;
    children: ReactNode;
    path: string; // used for toggling the ?modal= query param the SSR component is utilziing
};

export default function ModalWrapper({ children, path, header }: Props) {
    return (
        <div className="absolute z-50 top-0 right-0 left-0 bottom-0 h-screen w-screen p-0">
            {path ? (
                <Link
                    href={path}
                    className="absolute top-0 right-0 left-0 bottom-0 flex h-full w-full justify-center items-center bg-[#1c2835] cursor-default"
                ></Link>
            ) : null}
            <div className="absolute top-0 right-2 left-2 bottom-0 m-auto md:w-1/2 h-fit modal-box p-0 border border-lightGray">
                <div className="flex w-full justify-between items-center p-2 border-b border-lightGray bg-[#1f2935] ">
                    <h2 className="font-semibold text-2xl ">{header}</h2>
                    <Link href={path}>{Close(25)}</Link>
                </div>
                {children}
            </div>
        </div>
    );
}
