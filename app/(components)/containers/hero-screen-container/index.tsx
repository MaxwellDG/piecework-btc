export default function HeroScreenContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="hero h-screen bg-base-200 flex flex-col justify-center py-2 min-h-[470px] overflow-y-auto">
            <div className="m-auto w-full max-w-4xl px-[100px] h-full flex justify-center flex-col">
                {children}
            </div>
        </div>
    );
}
