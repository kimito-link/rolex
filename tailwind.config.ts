import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ロレックスのブランドカラー（緑・金）をモチーフにした配色
        rolex: {
          green: "#127749",
          greenDark: "#0d5c39",
          gold: "#a37e2c",
          goldLight: "#c9a227",
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "Hiragino Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
