// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";

// // Detect if running in iframe and add class to body
// if (window.self !== window.top) {
//   document.body.classList.add('iframe-embedded');
// }

// createRoot(document.getElementById("root")!).render(<App />);
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
