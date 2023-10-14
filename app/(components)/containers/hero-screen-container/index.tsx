export default function HeroScreenContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="hero min-h-screen bg-base-200 flex flex-col justify-center">
            <div className="m-auto w-full max-w-4xl px-[100px]">{children}</div>
        </div>
    );
}
