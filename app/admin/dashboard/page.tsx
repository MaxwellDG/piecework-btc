import CompaniesList from '../../(components)/companies/companiesList';
import HeroScreenContainer from '../../(components)/containers/hero-screen-container';

export default function Dashboard() {
    return (
        <HeroScreenContainer>
            <div className="flex justify-between h-20 items-start">
                <h2 className="text-4xl font-bold mb-2">Companies</h2>
            </div>
            <CompaniesList />
        </HeroScreenContainer>
    );
}
