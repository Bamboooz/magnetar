import React from "react";
import ReactDOM from "react-dom/client";
import {
  register,
  unregister,
  isRegistered,
} from "@tauri-apps/plugin-global-shortcut";
import { getCurrentWindow } from "@tauri-apps/api/window";
import App from "./App";

import "./styles.css";

window.onload = async () => {
  const appWindow = getCurrentWindow();
  const shortcut = "CommandOrControl+Shift+P";

  const registered = await isRegistered(shortcut);

  if (registered) {
    await unregister(shortcut);
  }

  await register(shortcut, () => {
    appWindow.show();
    appWindow.setFocus();
  });

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
