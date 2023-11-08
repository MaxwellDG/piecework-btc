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
                chillGreen: '#224146',
                teal: 'rgba(61, 211, 165, 1)',
                tealOpaque: 'rgba(61, 211, 165, 0.3)',
                normalText: 'rgba(255, 255, 255, 0.8)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
};
export default config;
