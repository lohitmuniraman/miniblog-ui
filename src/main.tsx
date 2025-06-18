import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import "./index.css";
import App from "./App.tsx";
import theme from "./styles/material-ui-theme.ts";
import "./styles/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "@contexts/AuthContext.tsx";
import { ToastProvider } from "@contexts/ToastContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* Material-UI's baseline CSS */}
        <AuthProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
