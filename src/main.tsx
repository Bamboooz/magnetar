import React from "react";
import ReactDOM from "react-dom/client";
import { appWindow } from "@tauri-apps/api/window";
import { register, unregister } from "@tauri-apps/api/globalShortcut";

import App from "./App";
import "./styles.css";

window.onload = async () => {
  // rewrite in rust later
  await unregister("CommandOrControl+Shift+P");

  await register("CommandOrControl+Shift+P", async () => {
    if (await appWindow.isVisible()) {
      appWindow.hide();
    } else {
      appWindow.show();
      appWindow.setFocus();
    }
  });

  // rewrite in rust later
  await appWindow.onFocusChanged(async ({ payload: focused }) => {
    if (!focused) {
      await appWindow.hide();
    }
  });
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
