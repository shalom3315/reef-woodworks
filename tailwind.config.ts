import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F8F6F2',
        'wood-dark': '#6B4F3A',
        walnut: '#8B5E3C',
        charcoal: '#2A2A2A',
        gold: '#C58B45',
        'gold-light': '#D4A05A',
      },
      fontFamily: {
        heading: ['var(--font-frank)', 'serif'],
        body: ['var(--font-heebo)', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        wood: '0 4px 24px -4px rgba(107, 79, 58, 0.15)',
        'wood-lg': '0 8px 40px -8px rgba(107, 79, 58, 0.25)',
      },
    },
  },
  plugins: [],
}

export default config
