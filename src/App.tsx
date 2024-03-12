import React, { useEffect, useState } from "react";
import { register, unregister } from "@tauri-apps/api/globalShortcut";
import { appWindow } from "@tauri-apps/api/window";

import AppsView from "./components/Apps/Apps";
import CommandsView from "./components/Commands/Commands";
import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";
import GamesView from "./components/Games/Games";

const App: React.FC = () => {
    /*
    TODO:
    1. FIXME: when adding new app the app treats it as unfocus
    2. FIXME: sometimes appicons are not loaded in release mode
    */
    const pageStorage = localStorage.getItem("page");
    const pageDefault = pageStorage ? Number(pageStorage) : 0;
    const [selectedPage, setSelectedPage] = useState<number>(pageDefault);

    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        const registerOpen = async () => {
            await unregister("CommandOrControl+Shift+P");

            await register("CommandOrControl+Shift+P", () => {
                appWindow.show();
                appWindow.setFocus();
            });
        };

        registerOpen();
    }, []);

    useEffect(() => {
        const setupFocusListener = async () => {
            await appWindow.onFocusChanged(async ({ payload: focused }) => {
                if (!focused) {
                    await appWindow.hide();
                }
            });
        };

        setupFocusListener();
    }, []);

    useEffect(() => {
        setSearch("");
        localStorage.setItem("page", selectedPage.toString());
    }, [selectedPage]);

    return (
        <>
            <div className="w-screen h-screen flex flex-col bg-primary shadow-2xl pb-12">
                <Header />
                <NavigationBar search={search} setSearch={setSearch} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                
                {selectedPage === 0
                    ? <AppsView search={search} />
                    : selectedPage === 1
                    ? <GamesView search={search} />
                    : <CommandsView search={search} />
                }
            </div>
        </>
    );
};

export default App;
