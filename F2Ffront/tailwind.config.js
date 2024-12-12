/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        greenCustom: '#2CB21A',
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out", // Adjusted duration for smoother fade-in
        slideInUp: "slideInUp 1.8s ease-in-out", // Slightly slower slide-in for smoother effect
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInUp: {
          "0%": { opacity: "0", transform: "translateY(50px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      fontFamily: {
        custom: ['"Open Sans"', 'sans-serif'], // Example: Custom font family
      },
    },
  },
  plugins: [
    // Add useful Tailwind plugins here (uncomment if needed)
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/aspect-ratio'),
  ],
}
