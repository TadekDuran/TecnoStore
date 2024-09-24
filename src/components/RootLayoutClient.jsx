'use client';

import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import InitColorSchemeScript from "@mui/joy/InitColorSchemeScript";
import CssBaseline from "@mui/joy/CssBaseline";
import Navbar from "@/components/Navbar";

// Definir el tema y mantener el modo oscuro
const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        background: {
          body: "#000",
        },
        text: {
          primary: "#fff",
        },
      },
    },
  },
  defaultMode: "dark", // Forzar modo oscuro
});

export default function RootLayoutClient({ children }) {
  return (
    <>
      <InitColorSchemeScript defaultMode="dark"/>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        {children}
      </CssVarsProvider>
    </>
  );
}
