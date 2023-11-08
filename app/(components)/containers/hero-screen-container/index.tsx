export default function HeroScreenContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-1 flex-col py-2">
            <div className="m-auto w-full max-w-4xl p-2 sm:px-[100px] flex flex-1 flex-col sm:justify-center">
                {children}
            </div>
        </div>
    );
}
