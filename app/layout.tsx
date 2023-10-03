import './(styles)/globals.css';
import './(styles)/buttons.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

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
        <html lang="en" data-theme="wireframe">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
