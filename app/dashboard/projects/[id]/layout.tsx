import HeroScreenContainer from '../../../(components)/containers/hero-screen-container';
import { usePathnameServer } from '../../../(hooks)/useServerHeaders';
import { headers } from 'next/headers';

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <HeroScreenContainer>
            <div className="m-auto w-full max-w-4xl">{children}</div>
        </HeroScreenContainer>
    );
}
