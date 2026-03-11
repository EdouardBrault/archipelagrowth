
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <HelmetProvider context={{}}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

// Use hydration only if the root has server-rendered content
if (root.innerHTML.trim().length > 0) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
