import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { register, unregister } from "@tauri-apps/api/globalShortcut";
import { appWindow } from "@tauri-apps/api/window";

import App from "./App";
import AppsModule from "./modules/Apps";
import GamesModule from "./modules/Games";
import CommandsModule from "./modules/Commands";
import FoldersModule from "./modules/Folders";
import { Module } from "./modules/Module";
import store from "./store";
import "./styles.css";

async function registerKeybind() {
    const keybind = store.getState().settings.keybind;

    await unregister(keybind);

    await register(keybind, () => {
        appWindow.show();
        appWindow.setFocus();
    });

    await appWindow.onFocusChanged(async ({ payload: focused }) => {
        if (!focused) {
            await appWindow.hide();
        }
    });
}

function loadBuiltInModules() {
    const builtInModules = [
        { name: "Apps", useSearch: true, ModuleComponent: AppsModule },
        { name: "Games", useSearch: true, ModuleComponent: GamesModule },
        { name: "Commands", useSearch: true, ModuleComponent: CommandsModule },
        { name: "Folders", useSearch: true, ModuleComponent: FoldersModule }
    ];
      
    builtInModules.forEach(({ name, useSearch, ModuleComponent }) => {
        const moduleInstance = new Module(name, useSearch);
        const componentWithProps = <ModuleComponent module={moduleInstance} />;
        
        moduleInstance.assign(componentWithProps);
        moduleInstance.register();
    });
}

window.onload = async () => {
    await registerKeybind();
    loadBuiltInModules();
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
