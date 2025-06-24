module.exports = ({ env }) => ({
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Add cssnano only in production
    ...(env === 'production' ? { cssnano: {} } : {})
  }
})