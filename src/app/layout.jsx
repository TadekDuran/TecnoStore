import { Inter } from "next/font/google";
import "./globals.css";
import RootLayoutClient from "@/components/RootLayoutClient"; // Importar la parte cliente

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TecnoStore Argentina",
  description: "Tienda TecnoStore Argentina",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning={true}>
      <body className={`${inter.className} h-screen bg-black text-white`}>
        <RootLayoutClient>{children}</RootLayoutClient> {/* Renderiza la parte cliente */}
      </body>
    </html>
  );
}
