module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    container:{
      center: true,
      padding: "1rem", 
      screens:{
        lg:'1124px',
        xl:'1124px',
        '2xl':'1124px' 
      }

    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
