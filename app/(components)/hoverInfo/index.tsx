'use client';

import { useState } from 'react';
import Question from '../../../public/svgs/question';

type Props = {
    text: string;
};

export default function HoverInfo({ text }: Props) {
    const [isHover, toggleHover] = useState(false);

    return (
        <div
            className="relative"
            onMouseOver={() => toggleHover(true)}
            onMouseOut={() => toggleHover(false)}
        >
            <div className="cursor-pointer">
                {Question('grey', 20)}
                {isHover && (
                    <div className="absolute -top-8 right-0 whitespace-nowrap border border-toastBlue bg-white px-2 rounded">
                        <p>{text}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
