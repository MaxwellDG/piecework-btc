import SignupInput from '../../(components)/signupInput';

export default function Page() {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content">
                <div className="max-w-md">
                    <p className="mb-2">
                        Create an account for your organization
                    </p>
                    <SignupInput />
                </div>
            </div>
        </div>
    );
}
