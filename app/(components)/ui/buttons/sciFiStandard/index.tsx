import localFont from 'next/font/local';

export enum SciFiStandardButtonSize {
    SMALL = 100,
    MEDIUM = 150,
    LARGE = 225,
}

export const tomorrowFont = localFont({
    src: [
        {
            path: '../../../../(styles)/fonts/tomorrow/Tomorrow-Regular.ttf',
        },
    ],
});

export default function SciFiStandardButton({
    text,
    icon,
    onClick,
    className,
    type,
    size,
}: {
    text: string;
    type: 'submit' | 'button';
    onClick?: () => void;
    icon?: React.ReactNode;
    className?: string;
    size: SciFiStandardButtonSize;
}) {
    return (
        <button
            type={type}
            className={`sciFiStandard-btn ${className ?? ''}`}
            onClick={() => (onClick ? onClick() : {})}
        >
            <div
                className={`main-btn-container`}
                style={{ width: `${size}px` }}
            >
                <div className={`main-btn ${tomorrowFont.className}`}>
                    {text}
                </div>
            </div>
            <div
                className={`line`}
                style={{ width: `${Math.floor(size / 3.5)}px` }}
            />
            <div className="left-line" />
            <div className="right-line" />
        </button>
    );
}
