/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {},
			fontFamily: {
				'fira-code': ['"Fira Code"', 'monospace'],
			},
			maxWidth: {
				'1/2': '50%',
				'2/3': '66%',
			},
		},
	},
	plugins: [require('daisyui')],
};
