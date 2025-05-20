import type { Config } from "tailwindcss";

// @ts-expect-error No known types
import primePlugin from "tailwindcss-primeui";

export default <Partial<Config>>{
  content: [
    "pages/**/*.{vue,js,jsx,mjs,ts,tsx}",
    "shared/helpers/**/*.{vue,js,jsx,mjs,ts,tsx}",
    "app/routes/**/*.{vue,js,jsx,mjs,ts,tsx}",
    "shared/components/**/*.{vue,js,jsx,mjs,ts,tsx}",
    "widgets/**/*.{vue,js,jsx,mjs,ts,tsx}",
  ],

  darkMode: ["selector", '[class*="app-dark"]'],

  plugins: [primePlugin],

  theme: {
    extend: {
      fontSize: {
        "2xs": "0.625rem",
      },
      width: {
        drawer: "600px",
        19: "76px",
        30: "120px",
      },
      height: {
        19: "76px",
      },
      content: {
        required: "'*'",
      },
    },
  },
};
