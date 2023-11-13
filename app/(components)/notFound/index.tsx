import Link from 'next/link';
import { cookies } from 'next/headers';
import HeroScreenContainer from '../containers/hero-screen-container';

export default function NotFound({
    text,
    isAdmin,
}: {
    text: string;
    isAdmin: boolean;
}) {
    const nextCookies = cookies();
    const token = nextCookies.get('JWT');

    function getRoute() {
        if (isAdmin) {
            return token ? '/admin/dashboard' : '/admin';
        } else {
            return token ? '/dashboard' : '/';
        }
    }

    return (
        <HeroScreenContainer>
            <div className="max-w-md">
                <h2 className="text-5xl font-bold">Not Found</h2>
                <p className="mb-6">{text}</p>
                <Link className="btn btn-primary" href={`${getRoute()}`}>
                    Return Home
                </Link>
            </div>
        </HeroScreenContainer>
    );
}
