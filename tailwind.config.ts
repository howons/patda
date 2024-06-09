import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        cs: "0px",
      },
      width: {
        "full-plus-6rem": "calc(100% + 6rem)",
      },
      animation: {
        swing: "swing 1s infinite",
      },
      keyframes: {
        swing: {
          "0%, 100%": {
            transform: "rotate(0deg)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "25%": {
            transform: "rotate(70deg)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
