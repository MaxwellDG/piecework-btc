export default function MainContent({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="sm:max-h-[80vh] overflow-y-auto pr-2">{children}</div>
    );
}
