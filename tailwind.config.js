/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {
		screens: {
			"msm": "240px",
			"sm": "640px",
			"md": "900px",
			"lg": "1024px",
			"xl": "1280px",
			"2xl": "1536px",
		},
	},
	plugins: [],
};
