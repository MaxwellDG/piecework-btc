import './(styles)/globals.css';
import './(styles)/buttons.scss';
import './(styles)/scrollbar.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

const myFont = localFont({
    src: [
        {
            path: './(styles)/fonts/TrenchThin-16R0.otf',
        },
    ],
});

export const metadata: Metadata = {
    title: 'Piecework - BTC',
    description:
        'Submit small pieces of work and state the price. Our verified engineers will then see the job and claim it to be completed within a specified timeframe.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" data-theme="wireframe" style={{ fontSize: '20px' }}>
            <body className={myFont.className}>{children}</body>
        </html>
    );
}
