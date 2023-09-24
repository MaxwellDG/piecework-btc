import Logout from '../../(components)/logout';
import Card from '../../(components)/settings/card';

export default function Settings() {
    function handleLogout() {}

    return (
        <div className="hero min-h-screen bg-base-200 flex flex-col justify-center z-50">
            <div className="m-auto w-full max-w-3xl">
                <h2 className="text-3xl font-bold mb-2">Settings</h2>
                <div className="flex flex-col">
                    <Card
                        text="Account settings"
                        route="account"
                        icon={<></>}
                    />
                    <Card
                        text="Company settings"
                        route="company"
                        icon={<></>}
                    />
                    <Card text="How it works" route="howitworks" icon={<></>} />
                    <Logout />
                </div>
            </div>
        </div>
    );
}
