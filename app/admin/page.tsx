'use client';

import React from 'react';

const AdminLogin: React.FC = () => {
    const [password, setPassword] = React.useState('');

    async function handleLogin() {
        const res = await fetch('/api/admin/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });
        const data = await res.json();
        if (data) {
            console.log('Admin login success', data);
        } else {
            alert('Wrong password');
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="flex flex-col hero-content">
                <h1>Admin Login</h1>
                <form
                    action={handleLogin}
                    className="flex flex-col justify-center"
                >
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input mb-[1rem]"
                    />
                    <button type="submit" className="button">
                        Login
                    </button>
                </form>
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
