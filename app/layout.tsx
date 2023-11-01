import './(styles)/globals.css';
import './(styles)/buttons.scss';
import './(styles)/scrollbar.css';
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
        <html
            lang="en"
            data-theme="wireframe"
            style={{ fontSize: '20px', height: '100vh', display: 'flex' }}
        >
            <body
                className={`${myFont.className} relative flex flex-1`}
                style={{ color: 'black' }}
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
