import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#818CF8', // Lighter indigo (was #6366F1)
          dark: '#6366F1',    // Old default moved to dark
          light: '#A5ADFF',
        },
        secondary: {
          DEFAULT: '#A78BFA', // Lighter purple (was #8B5CF6)
          dark: '#8B5CF6',
          light: '#C4B5FD',
        },
        accent: {
          DEFAULT: '#FCD34D', // Softer yellow (was #F59E0B)
          dark: '#F59E0B',
          light: '#FDE68A',
        },
        success: {
          DEFAULT: '#34D399', // Softer green (was #10B981)
          dark: '#10B981',
          light: '#6EE7B7',
        },
        danger: {
          DEFAULT: '#F87171', // Softer red (was #EF4444)
          dark: '#EF4444',
          light: '#FCA5A5',
        },
        slate: {
          DEFAULT: '#1E293B', // Lighter slate (was #0F172A)
          light: '#334155',
        },
      },
      boxShadow: {
        'brutal': '6px 6px 0px 0px rgba(0, 0, 0, 0.7)', // Softer brutal
        'brutal-sm': '3px 3px 0px 0px rgba(0, 0, 0, 0.6)',
        'brutal-primary': '6px 6px 0px 0px rgba(129, 140, 248, 0.5)', // Lighter and transparent
        'brutal-accent': '6px 6px 0px 0px rgba(252, 211, 77, 0.5)',
        'elevated': '0 6px 20px rgba(0, 0, 0, 0.08)', // Lighter shadows
        'floating': '0 12px 40px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;