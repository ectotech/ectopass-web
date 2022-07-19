/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				mono: ["Fira Mono", ...fontFamily.mono],
				display: ["Poppins", ...fontFamily.sans],
				body: ["Open Sans", ...fontFamily.sans]
			}
		}
	},
	plugins: []
};
