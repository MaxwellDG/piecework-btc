import Link from 'next/link';
import Chevron from '../../../../../public/svgs/chevron';

type Props = {
    route: string;
};

export default function BackButton({ route }: Props) {
    return (
        <div className="w-full flex flex-start mb-12">
            <Link href={route}>{Chevron(30, undefined, 180)}</Link>
        </div>
    );
}
