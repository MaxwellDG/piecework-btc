import { tomorrowFont } from '../../../../layout';

export default function SciFiStandardButton({
    text,
    icon,
    onClick,
    className,
    type,
}: {
    text: string;
    type: 'submit' | 'button';
    onClick?: () => void;
    icon?: React.ReactNode;
    className?: string;
}) {
    return (
        <button
            type={type}
            className={`sciFiStandard-btn ${className ?? ''}`}
            onClick={() => (onClick ? onClick() : {})}
        >
            <div className="main-btn-container">
                <div className={`main-btn ${tomorrowFont.className}`}>
                    {text}
                </div>
            </div>
            <div className="line" />
            <div className="left-line" />
            <div className="right-line" />
        </button>
    );
}
