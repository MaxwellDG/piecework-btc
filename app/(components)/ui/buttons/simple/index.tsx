import { MouseEventHandler } from 'react';

type Props = {
    text: string;
    type: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
};

export default function SimpleButton({
    text,
    onClick,
    className,
    type,
    disabled = false,
}: Props) {
    return (
        <button
            type={type}
            onClick={
                onClick &&
                ((e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClick();
                })
            }
            className={` border ${
                disabled
                    ? 'border-tealOpaque text-tealOpaque'
                    : 'border-teal text-teal hover:text-white hover:bg-teal cursor-pointer'
            } rounded-sm px-4 py-1 ${className ?? ''}`}
            disabled={disabled}
        >
            {text}
        </button>
    );
}
