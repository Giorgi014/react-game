import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ReactUi from "./ReactUi.jsx";
import initGame from "./initGame.js";

createRoot(document.getElementById("ui")).render(
  <StrictMode>
    <ReactUi />
  </StrictMode>
);

initGame();