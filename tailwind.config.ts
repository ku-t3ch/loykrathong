import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation : {
        "wave" : "19.44s linear 0s infinite normal none running wave"
      },
      keyframes : {
       wave : {
        "0%" : {
          transform : "translateX(0px)"
        },
        "100%" : {
          transform : "translateX(432px)"
        },
       }
      }
    },
  },
  plugins: [],
} satisfies Config;
