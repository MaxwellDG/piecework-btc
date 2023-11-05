'use client';

import { useMemo } from 'react';
import { tomorrowFont } from '../../../../layout';

type Props = {
    text: string;
    onClick?: () => void;
    className?: string;
    isRightLeaning: boolean;
};

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
