/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'theme-black': '#0B0C10',
				'theme-light-black': '#1F2833',
				'theme-beige': '#C5C6C7',
				'theme-light-blue': '#66FCF1',
				'theme-bleak-blue': '#45A29E'
			}
		}
	},
	plugins: []
};
