import HeroScreenContainer from '../../(components)/containers/hero-screen-container';
import Logout from '../../(components)/logout';
import Card from '../../(components)/settings/card';
import SciFiLinkButton from '../../(components)/ui/buttons/sciFiLink';
import Company from '../../../public/svgs/company';
import Question from '../../../public/svgs/question';
import User from '../../../public/svgs/user';

export default function Settings() {
    function handleLogout() {
        // todo clear jwt
    }

    return (
        <HeroScreenContainer>
            <div className="w-full md:w-1/2 m-auto">
                <h2 className="text-4xl font-bold mb-8 ml-[1/2]">Settings</h2>
                <div className="flex flex-col">
                    <SciFiLinkButton
                        text="Account settings"
                        path="account"
                        icon={User('black', 25)}
                    />
                    <SciFiLinkButton
                        text="Company settings"
                        path="company"
                        icon={Company('black', 25)}
                    />
                    <SciFiLinkButton
                        text="How it works"
                        path="howitworks"
                        icon={Question('black', 25)}
                    />
                    <Logout />
                </div>
            </div>
        </HeroScreenContainer>
    );
}
