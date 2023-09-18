import Link from "next/link"

type CardProps = {
    text: string;
    route: string;
    icon: React.ReactNode;
}

export default function Card({ text, route, icon}: CardProps) {

    return(
        <Link href={route} className="btn mb-8 w-full items-center">
            {icon}
            <p className={`ml-6`}>{text}</p>
        </Link>
    )
}