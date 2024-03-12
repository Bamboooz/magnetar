import React, { useEffect, useState } from "react";
import { register, unregister } from "@tauri-apps/api/globalShortcut";
import { appWindow } from "@tauri-apps/api/window";

import AppsView from "./components/Apps/Apps";
import CommandsView from "./components/Commands/Commands";
import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";

const App: React.FC = () => {
    /*
    TODO:
    1. a modal asking for a file name for an app instead of using the executable name,
    2. hide toolbox on click outside,
    3. support for steam games as apps as its most important for me
    4. minimize to tray on app start/command execute
    5. make the app not be displayed in task bar
    6. app freezing when i spawn a new app from it
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
                    : <CommandsView search={search} />
                }
            </div>
        </>
    );
};

export default App;
