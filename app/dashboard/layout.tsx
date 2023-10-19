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
                className={`absolute top-0 bottom-0 right-[70px] w-1 h-[435px] bg-gray-200 m-auto`}
            />
            {children}
        </section>
    );
}
