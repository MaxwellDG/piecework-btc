import Card from "../../(components)/settings/card";
import Logout from "../../../public/svgs/logout";

export default function Settings() {

    function handleLogout() {
        
    }

    return (
        <div className="hero min-h-screen w-full bg-base-200">
            <p>Settings</p>
            <div className="flex flex-col">
                <Card text="Account settings" route="account" icon={<></>} />
                <Card text="Company settings" route="company" icon={<></>} />
                <Card text="How it works" route="howitworks" icon={<></>} />
                <button type="button" onClick={handleLogout} className="btn bg-white rounded mb-8 w-full items-center">
                    {Logout(25, 'red')}
                    <p className={`ml-6 text-red-300`}>Logout</p>
                </button>
            </div>
        </div>
    );
}
