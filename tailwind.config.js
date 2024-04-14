/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gym': "url('./src/assets/images/invictus_go_Almaty_gym_zone_2022.jpeg')"
      }
    },
  },
  plugins: [],
}

