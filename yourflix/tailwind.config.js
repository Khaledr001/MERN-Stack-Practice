/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}',

  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ]
      },
      colors: {
        'dark': '#000614',
        'text': 'white',
        'primary': '#E50914',
        'secondary': 'red',
      }
    },
  },
  plugins: [],
}

