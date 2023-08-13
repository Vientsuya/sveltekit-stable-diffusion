/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'theme-light-black': '#1F2833',
				'theme-dark-black': '#151C24',
				'theme-lighter-black': '#353D47',
				'theme-light-pink': '#ECB8D1'
			}
		},
		safelist: [
			{
				pattern: /grid-cols-[1-9]/
			}
		]
	},
	plugins: [require('tailwind-scrollbar')({ nocompatible: true })]
};
