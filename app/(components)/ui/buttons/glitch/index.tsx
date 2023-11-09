'use client';

import { useMemo } from 'react';
import localFont from 'next/font/local';

type Props = {
    text: string;
    isRightLeaning: boolean;
    onClick?: () => void;
    className?: string;
};

const tomorrowFont = localFont({
    src: [
        {
            path: '../../../../(styles)/fonts/tomorrow/Tomorrow-Regular.ttf',
        },
    ],
});

export default function GlitchButton({
    text,
    onClick,
    className,
    isRightLeaning,
}: Props) {
    const factoryNumber = useMemo(() => Math.floor(Math.random() * 100), []);

    return (
        <button
            className={`btn-cyberpunk ${tomorrowFont.className} ${
                isRightLeaning ? 'btn-cyberpunk-right' : 'btn-cyberpunk-left'
            }${className ?? ''}`}
            onClick={onClick}
        >
            <span
                className={`btn-cyberpunk__content ${
                    isRightLeaning
                        ? 'btn-cyberpunk-right'
                        : 'btn-cyberpunk-left'
                }`}
            >
                {text}
            </span>
            <span className="btn-cyberpunk__glitch"></span>
            <span
                className="btn-cyberpunk__label"
                suppressHydrationWarning={true}
            >{`r${factoryNumber}`}</span>
        </button>
    );
}
