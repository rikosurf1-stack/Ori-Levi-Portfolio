import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Organic, warm gallery palette — never pure black or white.
        // "paper" is a soft bone shade; "char" is a warm near-black for dark frames.
        ink: "#282623",
        paper: "#FCFBF9",
        sand: "#E1DACB",
        muted: "#8A8174",
        line: "#D3CABA",
        char: "#16130E",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      letterSpacing: {
        label: "0.22em",
        wordmark: "0.3em",
      },
      maxWidth: {
        page: "1600px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 1.2s var(--tw-ease, ease) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
