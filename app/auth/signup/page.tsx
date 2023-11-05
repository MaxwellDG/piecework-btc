import BackButton from '../../(components)/ui/buttons/back';
import SignupInput from '../../(components)/signupInput';

export default function Page() {
    return (
        <div className="flex min-h-screen w-screen">
            <div className="flex flex-1 m-auto justify-center">
                <div className="max-w-md">
                    <BackButton route="/" />
                    <p className="mb-2">
                        Create an account for your organization
                    </p>
                    <SignupInput />
                </div>
            </div>
        </div>
    );
}
