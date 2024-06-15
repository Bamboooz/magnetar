import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import AppsModule from "./modules/Apps";
import GamesModule from "./modules/Games";
import CommandsModule from "./modules/Commands";
import FoldersModule from "./modules/Folders";
import { Module } from "./modules/Module";
import store from "./store";
import "./styles.css";

window.onload = async () => {
    const builtInModules = [
        { name: "Apps", useSearch: true, ModuleComponent: AppsModule },
        { name: "Games", useSearch: true, ModuleComponent: GamesModule },
        { name: "Commands", useSearch: true, ModuleComponent: CommandsModule },
        { name: "Folders", useSearch: true, ModuleComponent: FoldersModule }
    ];
      
    builtInModules.forEach(({ name, useSearch, ModuleComponent }) => {
        const module = new Module(name, useSearch);

        module.assign(<ModuleComponent />);
        module.register();
    });
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
