/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
      },
      colors: {
        dark: '#111',
        gray: '#5f5f5f',
        accent: '#db0018',
      },
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '880px',
        xl: '1200px',
        '2xl': '1920px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.77, 0, 0.175, 1)',
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      letterSpacing: {
        wide: '0.05em',
        wider: '0.15em',
        widest: '0.25em',
        ultra: '0.65em',
      },
    },
  },
  plugins: [],
};
