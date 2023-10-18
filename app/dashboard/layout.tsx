import NavBar from '../(components)/navbar';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <NavBar />
            <div
                className={`absolute top-0 bottom-0 right-[64px] w-0.5 h-[435px] bg-btcOrangePale m-auto`}
            />
            {children}
        </section>
    );
}
