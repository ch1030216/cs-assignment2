import "./globals.css"; // Next.js 기본 생성 스타일 파일

export const metadata = {
  title: "나만의 데스크톱 대시보드 플래너",
  description: "플래너와 다이어리를 한 눈에",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="antialiased bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}