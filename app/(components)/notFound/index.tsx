import Link from 'next/link';
import { cookies } from 'next/headers';

export default function NotFound({ text }: { text: string }) {
    const nextCookies = cookies();
    const token = nextCookies.get('JWT');

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h2 className="text-5xl font-bold">Not Found</h2>
                    <p className="mb-6">{text}</p>
                    <Link
                        className="btn btn-primary"
                        href={`${token ? '/dashboard' : '/'}`}
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
