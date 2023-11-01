import NavBar from '../(components)/navbar';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex flex-1 flex-col bg-baseGray overflow-hidden">
            <div
                className={`relative mx-2 h-0.5 top-1 sm:absolute sm:top-0 sm:bottom-0 sm:right-[64px] sm:w-0.5 sm:h-[435px] bg-btcOrangePale sm:m-auto`}
            />
            <div className="flex flex-1 overflow-y-auto sm:overflow-visible">
                {children}
            </div>
            <NavBar />
        </section>
    );
}
