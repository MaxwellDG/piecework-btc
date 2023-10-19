import HeroScreenContainer from '../../(components)/containers/hero-screen-container';
import Logout from '../../(components)/logout';
import Card from '../../(components)/settings/card';
import Company from '../../../public/svgs/company';
import Question from '../../../public/svgs/question';
import User from '../../../public/svgs/user';

export default function Settings() {
    function handleLogout() {
        // todo clear jwt
    }

    return (
        <HeroScreenContainer>
            <div className="md:w-1/2 m-auto">
                <h2 className="text-4xl font-bold mb-2 ml-[1/2]">Settings</h2>
                <div className="flex flex-col">
                    <Card
                        text="Account settings"
                        route="account"
                        icon={User('black', 25)}
                    />
                    <Card
                        text="Company settings"
                        route="company"
                        icon={Company('black', 25)}
                    />
                    <Card
                        text="How it works"
                        route="howitworks"
                        icon={Question('black', 25)}
                    />
                    <Logout />
                </div>
            </div>
        </HeroScreenContainer>
    );
}
