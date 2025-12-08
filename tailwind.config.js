/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['"Syne"', 'sans-serif'],
                sans: ['"Inter"', 'sans-serif'],
            },
            colors: {
                'gallery-black': '#121212',
                'gallery-white': '#FAFAFA',
                'int-orange': '#FF4F00',
                'int-orange-hover': '#CC3F00',
                'stone-gray': '#F2F2F2',
            },
            boxShadow: {
                'ambient': '0 20px 40px -10px rgba(0, 0, 0, 0.05), 0 0 20px -5px rgba(0, 0, 0, 0.02)',
                'sharp': '8px 8px 0px 0px rgba(0,0,0,1)',
            },
            backgroundImage: {
                'grain': "url('https://grainy-gradients.vercel.app/noise.svg')",
            }
        }
    },
    plugins: [],
}
