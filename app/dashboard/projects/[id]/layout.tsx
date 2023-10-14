export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section>
            <div className="hero min-h-screen bg-base-200 flex flex-col justify-center">
                <h2 className="text-4xl font-bold mb-2">
                    CHANGE TO PROJECT NAME
                </h2>

                <div className="m-auto w-full max-w-4xl">{children}</div>
            </div>
        </section>
    );
}
