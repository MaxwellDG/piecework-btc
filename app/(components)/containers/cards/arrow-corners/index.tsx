import './styles.scss';

export default function ArrowCornersCard({
    children,
    className,
    canOverflow = false,
}: {
    children: React.ReactNode;
    className?: string;
    canOverflow?: boolean;
}) {
    return (
        <div
            className={`relative flex flex-1 ${
                canOverflow ? 'overflow-y-hidden p-2' : ''
            } ${className ?? ''}`}
        >
            <div className="absolute z-0 top-0 bottom-0 left-0 right-0 after:content-[''] after:absolute after:top-3 after:bottom-3 after:left-0 after:right-0 after:border-l after:border-r after:border-lightGray before:absolute before:left-3 before:right-3 before:top-0 before:bottom-0 before:border-t before:border-b before:border-lightGray">
                <div className="absolute top-0 left-0 h-2.5 w-2.5 arrow-top-left before:content-[''] after:content-[''] before:bg-whiteGray after:bg-whiteGray before:w-2 before:h-0.5 before:block after:block after:h-2 after:w-0.5 before:absolute after:absolute before:top-0 before:left-0 after:absolute after:top-0 after:left-0" />
                <div className="absolute top-0 right-0 h-2.5 w-2.5 arrow-top-left before:content-[''] after:content-[''] before:bg-whiteGray after:bg-whiteGray before:w-2 before:h-0.5 before:block after:block after:h-2 after:w-0.5 before:absolute after:absolute before:top-0 before:right-0 after:absolute after:top-0 after:right-0" />
                <div className="absolute bottom-0 left-0 h-2.5 w-2.5 arrow-top-left before:content-[''] after:content-[''] before:bg-whiteGray after:bg-whiteGray before:w-2 before:h-0.5 before:block after:block after:h-2 after:w-0.5 before:absolute after:absolute before:bottom-0 before:left-0 after:absolute after:top-0 after:left-0" />
                <div className="absolute bottom-0 right-0 h-2.5 w-2.5 arrow-top-left before:content-[''] after:content-[''] before:bg-whiteGray after:bg-whiteGray before:w-2 before:h-0.5 before:block after:block after:h-2 after:w-0.5 before:absolute after:absolute before:bottom-0 before:right-0 after:absolute after:top-0 after:right-0" />
            </div>
            <div
                className={`flex flex-1 flex-col ${
                    canOverflow ? 'overflow-y-auto' : ''
                } z-10`}
            >
                {children}
            </div>
        </div>
    );
}
