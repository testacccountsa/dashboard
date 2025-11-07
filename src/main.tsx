import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Detect if running in iframe and add class to body
if (window.self !== window.top) {
  document.body.classList.add('iframe-embedded');
}

createRoot(document.getElementById("root")!).render(<App />);
