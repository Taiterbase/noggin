module.exports = {
	content: ["./src/**/*.{ts,tsx}", "./src/pages/*.{ts, tsx}"],
	darkMode: "media",
	theme: {
		extend: {
			colors: {
				blue: {
					150: "#E8EEFF",
					640: "#85a8e3",
				},
				green: {
					150: "#5fae93"
				},
				yellow: {
					150: "#FEF7C5",
				}
			},
		},

	},
	variants: {
		extend: {
			fill: ['hover', 'focus'],
		},
	},
	plugins: [require("tailwind-fluid-typography")],//[require('@tailwindcss/typography')],
};
