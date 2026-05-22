/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      colors: {
        ink: '#172026',
        mist: '#eef3f6',
        brand: '#2563eb',
        teal: '#0f766e',
        coral: '#dc2626',
        amber: '#d97706'
      },
      boxShadow: {
        soft: '0 12px 30px rgba(23, 32, 38, 0.08)'
      }
    }
  },
  plugins: []
};
