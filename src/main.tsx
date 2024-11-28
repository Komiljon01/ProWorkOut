import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./app.tsx";
import { ThemeProvider } from "./components/providers/theme-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system" storageKey="gym-theme">
    <App />
  </ThemeProvider>
);
