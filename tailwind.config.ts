import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                backgroundLight: '#2d3c4a',
                backgroundDark: '#0e111c',
                btcOrange: '#F2A900',
                btcOrangePale: '#F5D6A1',
                toastBlue: '#3bbef8',
                baseGray: '#ececed',
                lightGray: '#69737f',
                whiteGray: '#cbced3',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['wireframe'],
    },
};
export default config;
