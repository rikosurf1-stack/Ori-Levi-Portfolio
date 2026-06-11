import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // A warm gallery palette — paper white and soft ink, never pure black/white.
        ink: "#161410",
        paper: "#F6F4EF",
        muted: "#8C887C",
        line: "#E3DFD5",
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
