export default function MainContent({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="h-4/5 overflow-y-auto pr-2">{children}</div>;
}
