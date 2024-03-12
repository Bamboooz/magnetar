import React from "react";
import ReactDOM from "react-dom/client";
import { appWindow } from "@tauri-apps/api/window";

import App from "./App";
import "./styles.css";

window.onload = async () => {
    // hide when lost focus
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
