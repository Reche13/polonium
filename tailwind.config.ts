import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#A855F7",
        bg: {
          light: {
            pri: "#FEFEFE",
            sec: "#F1F1F1",
            ter: "#E8E8E8",
          },
          dark: {
            pri: "#202020",
            sec: "#252525",
            ter: "#2E2E2E",
          },
        },
        text: {
          b: {
            pri: "#202020",
            sec: "#5F5F5F",
            ter: "#A0A0A0",
          },
          w: {
            pri: "#FCFCFC",
            sec: "#A0A0A0",
            ter: "#505050",
          },
        },
        stroke: {
          light: {
            pri: "#909090",
            sec: "#BBBBBB",
            ter: "#ECECEC",
          },
          dark: {
            pri: "#777777",
            sec: "#505050",
            ter: "#333333",
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
