/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ⭐️ src 폴더 내부의 모든 js, jsx 파일을 빠짐없이 감시하도록 경로를 명확히 세팅합니다.
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};