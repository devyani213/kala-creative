export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#17273a',
          deep: '#101c2b',
          light: '#21354e',
          muted: '#3d5675',
        },
        gold: {
          DEFAULT: '#b58e4b',
          soft: '#c9a86f',
          deep: '#8f6f36',
        },
        bone: {
          DEFAULT: '#f6f3ee',
          dim: '#ece7df',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        deva: ['"Tiro Devanagari Hindi"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        mega: '0.4em',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.23, 1, 0.32, 1)',
        entry: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      maxWidth: {
        shell: '84rem',
      },
    },
  },
  plugins: [],
}
