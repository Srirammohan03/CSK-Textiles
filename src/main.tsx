import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import SmoothScroll from "./SmoothScroll.tsx";

createRoot(document.getElementById("root")!).render(
  <SmoothScroll>
    <App />
  </SmoothScroll>,
);
