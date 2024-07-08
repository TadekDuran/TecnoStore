import { Inter } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TecnoStore Argentina",
  description: "Tienda TecnoStore Argentina",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning={true}>
      <body
        className={`${inter.className} min-h-screen bg-[#080404] text-[#080404]`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
