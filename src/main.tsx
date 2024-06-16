import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import AppsModule from "./modules/Apps";
import GamesModule from "./modules/Games";
import CommandsModule from "./modules/Commands";
import { Module } from "./modules/Module";
import store from "./store";
import "./styles.css";

window.onload = async () => {
    const builtInModules = [
        { name: "Apps", useSearch: true, component: <AppsModule /> },
        { name: "Games", useSearch: true, component: <GamesModule /> },
        { name: "Commands", useSearch: true, component: <CommandsModule /> },
    ];
      
    builtInModules.forEach(({ name, useSearch, component }) => {
        const module = new Module(name, useSearch);

        module.assign(component);
        module.register();
    });

    document.documentElement.setAttribute("data-theme", store.getState().settings.theme.toLowerCase());
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
