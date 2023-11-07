import './(styles)/globals.scss';
import './(styles)/buttons.scss';
import './(styles)/scrollbar.css';
import './(styles)/main.scss';
import './(styles)/svgs.scss';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { GlobalContextProvider } from './(context)';
import Toasts from './(components)/toasts';
import { Analytics } from '@vercel/analytics/react';

const myFont = localFont({
    src: [
        {
            path: './(styles)/fonts/TrenchThin-16R0.otf',
        },
    ],
});

export const tomorrowFont = localFont({
    src: [
        {
            path: './(styles)/fonts/tomorrow/Tomorrow-Regular.ttf',
        },
    ],
});

export const metadata: Metadata = {
    title: 'Piecework - BTC',
    description:
        'Submit small pieces of work and state the price. Our verified engineers will then see the offer and will be given the opportunity to claim it.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            style={{ fontSize: '20px', height: '100vh', display: 'flex' }}
        >
            <body
                className={`${myFont.className} background-texture relative flex flex-1`}
                style={{ color: 'white' }}
            >
                <GlobalContextProvider>
                    <>
                        {children}

                        <Toasts />
                    </>
                </GlobalContextProvider>
                <Analytics />
            </body>
        </html>
    );
}
