import NavBar from '../(components)/navbar';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <NavBar />
            <div className="absolute top-0 bottom-0 right-12 w-1 bg-gray-200 absolute top-0 bottom-0 right-0" />
            {children}
        </section>
    );
}
