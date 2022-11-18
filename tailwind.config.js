module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      Sans: ['IBM Plex Sans'],
      Roboto: ['Roboto']
    },
    textColor: {
      common: '#312866',
      disabled: '#929292'
    },
    backgroundColor: (theme) => ({
      ...theme('colors'),
      common: '#552cba'
    }),
    boxShadow: {
      card: '0px 4px 12px rgba(163, 174, 191, 0.2)'
    },
    extend: {}
  },
  plugins: []
};
