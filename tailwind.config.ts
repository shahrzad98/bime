import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      vazir: ["Vazir", "sans-serif"],
    },
    fontSize: {
      xxs: "8px",
      "xxs-plus": "10px",
      xs: "11px",
      sm: "12px",
      md: "13px",
      lg: "14px",
      "lg-plus": "15px",
      xl: "16px",
      xxl: "18px",
    },
    extend: {
      colors: {
        "main-yellow": "#FFC453",
        "main-blue": "#1D48E1",
        disabled: {
          bg: "#DAD8D8",
          text: "#858484",
        },
        loading: {
          bg: "#dc0000",
          text: "#525252",
        },
      },
    },
  },
} satisfies Config;
