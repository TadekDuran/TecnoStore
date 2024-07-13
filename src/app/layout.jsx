import { Inter } from "next/font/google";
import "./globals.css";
import InitColorSchemeScript from "@mui/joy/InitColorSchemeScript";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";

import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TecnoStore Argentina",
  description: "Tienda TecnoStore Argentina",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning={true}>
      <body className={`${inter.className} h-screen bg-black text-white`}>
        <InitColorSchemeScript />
        <CssVarsProvider>
          <CssBaseline />
          <Navbar />
          {children}
        </CssVarsProvider>
      </body>
    </html>
  );
}
