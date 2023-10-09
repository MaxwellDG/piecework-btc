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
        <div className="hero min-h-screen bg-base-200 flex flex-col justify-center z-50">
            <div className="m-auto w-full max-w-3xl">
                <h2 className="text-3xl font-bold mb-2">Settings</h2>
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
        </div>
    );
}
