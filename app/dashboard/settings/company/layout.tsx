import HeroScreenContainer from '../../../(components)/containers/hero-screen-container';
import CompanyHandler from '../../../../db/modeling/company';
import { headers } from 'next/headers';

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const _headers = headers();
    const companyId = _headers.get('jwt-company') as string;
    const company = await CompanyHandler.findById(companyId);

    return (
        <HeroScreenContainer>
            <h2 className="text-4xl font-bold mb-8">{company?.name}</h2>
            <div className="m-auto w-full max-w-4xl">{children}</div>
        </HeroScreenContainer>
    );
}
