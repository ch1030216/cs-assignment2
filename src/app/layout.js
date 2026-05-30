import { Gowun_Dodum } from "next/font/google";
import "./globals.css";

const gowunDodum = Gowun_Dodum({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-gowun",
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={gowunDodum.variable}>
      <body className="font-sans antialiased bg-sky-100/40 text-slate-700">
        {children}
      </body>
    </html>
  );
}