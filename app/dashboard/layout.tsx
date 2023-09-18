import NavBar from '../(components)/navbar';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <div className="absolute top-0 bottom-0 left-12 right-12 z-0 flex justify-between items-center h-fit m-auto overflow-hidden">
                <NavBar />
                <div className="w-1 bg-gray-200 absolute top-0 bottom-0 right-0" />
            </div>
            {children}
        </section>
    );
}
