import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [
    "pages/**/*.{vue,js,jsx,mjs,ts,tsx}",
    "widgets/**/*.{vue,js,jsx,mjs,ts,tsx}",
    "app/routes/**/*.{vue,js,jsx,mjs,ts,tsx}",
    "shared/ui/**/*.{vue,js,jsx,mjs,ts,tsx}",
  ],

  theme: {
    extend: {
      fontSize: {
        "2xs": "0.625rem",
      },
      width: {
        drawer: "600px",
        19: "76px",
        30: "120px",
        desktop: "1320px",
      },
      maxWidth: {
        desktop: "1320px",
      },
      height: {
        19: "76px",
        120: "480px",
      },
      content: {
        required: "'*'",
      },
      borderRadius: {
        "2.5xl": "20px",
      },
      margin: {
        13: "52px",
      },
      aspectRatio: {
        "3/2": "3 / 2",
        "2/3": "2 / 3",
        "4/3": "4 / 3",
        "3/4": "3 / 4",
      },
    },
  },
};
