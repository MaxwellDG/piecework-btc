import LoginInput from './(components)/loginInput';

export default function Page() {
    return (
        <div className="flex min-h-screen w-screen p-2">
            <div className="flex flex-1 m-auto justify-center">
                <LoginInput />
            </div>
        </div>
    );
}
