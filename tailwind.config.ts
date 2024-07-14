import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/page_components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        cas: {
          primary: {
            DEFAULT: "#4A4A4A",
            100: "",
            200: "",
            text: "white",
            red: "#D11512",
            teal: "#81D8D0",
            yellow: "#fed403",
          },
          seondary: {
            DEFAULT: "",
            100: "",
            200: "",
            text: "#B3B3B3",
          },
          grey: {
            background: "#181818",
            foreground: "#1E1E1E",
            border: "#505050",
            text: "",
            100: "#D9D9D9",
            200: "#4A4A4A",
            300: "#DFDFDF",
            400: "#1E1E1E",
            500: "#CACACA",
            600: "#151515",
            700: "#292929",
            800: "#B9B9B9",
            900: "#2C2C2C",
          },
        },
      },
      fontFamily: {
        fira_code: ["var(--font-fira-code)"],
      },
    },
  },
  plugins: [],
};
export default config;
