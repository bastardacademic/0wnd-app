import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { startMockApiServer } from "@/api/mock/mockApiServer"; // Add mock server import

startMockApiServer(); // Start the mock server

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
