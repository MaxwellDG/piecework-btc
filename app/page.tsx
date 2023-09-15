import Hello from './(components)/hello';
import LoginInput from './(components)/loginInput';

export default function Page() {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content">
                <LoginInput />
            </div>
        </div>
    );
}
