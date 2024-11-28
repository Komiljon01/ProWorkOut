import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./app.tsx";

// Theme Provider
import { ThemeProvider } from "./components/providers/theme-provider.tsx";

// rrd imports
import { BrowserRouter } from "react-router-dom";

// Auth Provider
import AuthProvider from "./components/providers/auth-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider defaultTheme="system" storageKey="gym-theme">
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
