// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}', // Include all files in /pages
        './components/**/*.{js,ts,jsx,tsx}', // Include all in /components
        './app/**/*.{js,ts,jsx,tsx}', // If using app directory (Next.js 13+)
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
