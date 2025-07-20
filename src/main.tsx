import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://caf7864346d222dcf552861fb0ad4103@o4509693778329600.ingest.us.sentry.io/4509693779574784",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
