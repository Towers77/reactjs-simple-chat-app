/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				almond: '#f1dac4',
				navy: {
					DEFAULT: '#474973',
					light: '#a69cac',
				},
				oxford: {
					DEFAULT: '#161b33',
					dark: '#0d0c1d',
				},
			},
			fontFamily: {
				'fira-code': ['"Fira Code"', 'monospace'],
			},
			maxWidth: {
				'1/2': '50%',
			},
		},
	},
	plugins: [require('daisyui')],
};
