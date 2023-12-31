import Link from 'next/link';
import localFont from 'next/font/local';

const tomorrowFont = localFont({
    src: [
        {
            path: '../../../../(styles)/fonts/tomorrow/Tomorrow-Regular.ttf',
        },
    ],
});

export default function SciFiLinkButton({
    text,
    path,
    icon,
    className,
}: {
    text: string;
    path: string;
    icon: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`mb-6 ${className ?? ''}`}>
            <Link href={`/dashboard/settings/${path}`}>
                <div className="sciFi-btn">
                    <div className="line" />
                    <div className="main-btn-container">
                        <div className={`main-btn ${tomorrowFont.className}`}>
                            {text}
                        </div>
                    </div>
                    <div className="bottom-right-corner" />
                </div>
            </Link>
        </div>
    );
}
