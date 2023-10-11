import BackButton from '../../../(components)/buttons/back';
import { headers } from 'next/headers';
import AccountsHandler, { AccountModel } from '../../../../db/modeling/account';
import dbConnect from '../../../../db';

export default async function AccountSettings() {
    await dbConnect();
    const _headers = headers();
    const _id = _headers.get('jwt-_id') as string;

    console.log('Got an id? ', _id);

    const handleUpdateUsername = async (formData: FormData) => {
        'use server';

        const username = formData.get('username') as string;
        const account = await AccountsHandler.update({
            _id,
            username,
        });
    };

    const handleUpdatePassword = async (formData: FormData) => {
        'use server';

        const password = formData.get('password') as string;
        const account = await AccountsHandler.update({
            _id,
            password,
        });
    };

    return (
        <div className="hero min-h-screen bg-base-200 flex flex-col justify-center">
            <div className="m-auto w-full max-w-3xl flex justify-center flex-col items-center">
                <div>
                    <BackButton route="/dashboard/settings" />
                    <form action={handleUpdateUsername} className="mb-8">
                        <label>
                            Username:
                            <input
                                type="text"
                                name="username"
                                className="input w-full mb-2 input-bordered"
                            />
                        </label>
                        <button type="submit" className="button w-full">
                            Update username
                        </button>
                    </form>
                    <form action={handleUpdatePassword}>
                        <label>
                            Password:
                            <input
                                type="password"
                                name="password"
                                className="input w-full mb-2 input-bordered"
                            />
                        </label>
                        <button type="submit" className="button w-full">
                            Update password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
