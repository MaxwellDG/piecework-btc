'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import HeroScreenContainer from '../(components)/containers/hero-screen-container';
import GlitchButton from '../(components)/ui/buttons/glitch';

const AdminLogin: React.FC = () => {
    const router = useRouter();

    const [password, setPassword] = React.useState('');

    async function handleLogin() {
        const res = await fetch('/api/admin/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });
        if (res.ok) {
            // const data = await res.json();
            router.push('/admin/dashboard');
        } else {
            alert('Wrong password');
        }
    }

    return (
        <div className="flex min-h-screen w-screen p-2">
            <div className="flex flex-1 flex-col m-auto justify-center max-w-lg">
                <h1>Admin Login</h1>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input mb-[1rem]"
                />
                <GlitchButton
                    isRightLeaning
                    onClick={handleLogin}
                    text="Login"
                />
            </div>
        </div>
    );
};

export default AdminLogin;

/////////////////// If I ever want to try doing authentication entirely on the server side ///////////////////////

// import React from 'react';

// const AdminLogin: React.FC = () => {
//     async function handleLogin(formData: FormData) {
//         'use server';
//         const password = formData.get('password');

//         console.log("Trying to send::: ", password);

//         const res = await fetch('/api/admin/auth', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ password }),
//         });
//         const data = await res.json();
//         if (data.success) {
//             console.log("Admin login success")
//         } else {
//             alert('Wrong password');
//         }
//     }

//     return (
//         <div className="hero min-h-screen bg-base-200">
//             <div className="flex flex-col hero-content">
//                 <h1>Admin Login</h1>
//                 <form action={handleLogin} className="flex flex-col justify-center">
//                     <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         required
//                         className="input mb-[1rem]"
//                     />
//                     <button type="submit" className="button">Login</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AdminLogin;
