import Link from 'next/link';

type CardProps = {
    text: string;
    route: string;
    icon: React.ReactNode;
};

export default function Card({ text, route, icon }: CardProps) {
    return (
        <Link
            href={route}
            className="btn mb-8 w-1/2 m-auto items-center cursor-pointer"
        >
            {icon}
            <p className={`ml-6`}>{text}</p>
        </Link>
    );
}
