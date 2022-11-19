/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true, Turn off for dev
  reactStrictMode: false,
  compiler: {
    styledComponents: true
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  pageExtensions: ['page.tsx'],
}
module.exports = nextConfig
