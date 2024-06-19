/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gym': "url('./src/assets/images/invictus_go_Almaty_gym_zone_2022.jpeg')",
        'gym-bg': "url('./public/academia_widelg.jpg')",
        'gym2': "url('/gym.jpg')",
        "gym3": "url('/acad1.jpg')"
      },
      animation: {
        tilt: 'tilt 3s linear infinite'
      },
      keyframes: {
        tilt: {
          '0%, 50%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1.5deg)' },
          '75%': { transform: 'rotate(-1.5deg)' }
        }
      },
    }
  },
  plugins: [],
}

