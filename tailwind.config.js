/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,}"
  ],
  safelist: [
  
    // Background colors
    'bg-blue-600', 'bg-gray-200', 'bg-red-600', 'bg-green-600', 'bg-yellow-500',
    // Hover states
    'hover:bg-blue-700', 'hover:bg-gray-300', 'hover:bg-red-700', 'hover:bg-green-700', 'hover:bg-yellow-600',
    // Text colors
    'text-white', 'text-gray-800',
    // Focus rings
    'focus:ring-blue-500', 'focus:ring-gray-500', 'focus:ring-red-500', 'focus:ring-green-500', 'focus:ring-yellow-500',
    // Sizes
    'px-2', 'py-1', 'px-4', 'py-2', 'px-6', 'py-3',
    // Rounding
    'rounded', 'rounded-md',
    // Disabled states
    'opacity-50', 'cursor-not-allowed',
    
    // ▼▼▼ DARK MODE CLASSES 
    'dark:bg-gray-800', 'dark:text-white', 'dark:hover:bg-gray-700'
  ],
  
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
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
}