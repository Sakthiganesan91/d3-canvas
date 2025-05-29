import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import GChart from "./components/GChart.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GChart />
  </StrictMode>
);
