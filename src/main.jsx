import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "jotai";
import { store } from "./store.js";
import "./index.css";
import ReactUi from "./ReactUi.jsx";
import initGame from "./initGame.js";

const ui = document.getElementById("ui");

new ResizeObserver(() => {
  document.documentElement.style.setProperty(
    "--scale",
    Math.min(
      ui.parentElement.offsetWidth / ui.offsetWidth,
      ui.parentElement.offsetHeight / ui.offsetHeight
    )
  );
}).observe(ui.parentElement);

createRoot(ui).render(
  <StrictMode>
    <Provider store={store}>
      <ReactUi />
    </Provider>
  </StrictMode>
);

initGame();
