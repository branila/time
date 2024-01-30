/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontSize: {
        '10xl': '9rem',
      },
      fontFamily: {
        "museosans300": ["MuseoSans300"],
        "museosans500": ["MuseoSans500"],
        "museosans700": ["MuseoSans700"],
        "museosans100": ["MuseoSans100"],
        "museosans300": ["MuseoSans300"],
        "ambroise": ["AmbroiseRegular"],


      },
  
    },
  },
  plugins: [],
}

