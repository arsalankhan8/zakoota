export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
// tailwind.config.js
theme: {
  extend: {
// tailwind.config.js
keyframes: {
  marquee: {
    '0%': { transform: 'translate3d(0, 0, 0)' },
    '100%': { transform: 'translate3d(-50%, 0, 0)' },
  },
},
    animation: {
      marquee: 'marquee 60s linear infinite',
    },
  },
},
  plugins: [],
};
