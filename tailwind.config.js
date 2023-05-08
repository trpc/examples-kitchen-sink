module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#e8f0f9',
          200: '#bbd3ee',
          300: '#8db6e3',
          400: '#337ccc',
          500: '#3178c6',
          600: '#27609f',
          700: '#1c4572',
          800: '#112944',
          900: '#060e17',
        },
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: 'translateX(2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: 'translateY(2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: 'translateX(-2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
      },
      animation: {
        slideDownAndFade:
          'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade:
          'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade:
          'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
