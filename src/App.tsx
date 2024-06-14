import React, { useEffect, useState } from "react";
import { register, unregister } from "@tauri-apps/api/globalShortcut";
import { appWindow } from "@tauri-apps/api/window";

import AppsView from "./modules/Apps";
import CommandsView from "./modules/Commands";
import Header from "./interface/Header";
import NavigationBar from "./interface/Navigation";
import GamesView from "./modules/Games";
import SettingsView from "./interface/Settings";
import HomeView from "./interface/Home";
import FoldersView from "./modules/Folders";

const App: React.FC = () => {
    const pageStorage = localStorage.getItem("page");
    const pageDefault = pageStorage ? Number(pageStorage) : 0;
    const [selectedPage, setSelectedPage] = useState<number>(pageDefault);

    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        const setEventListeners = async () => {
            await unregister("CommandOrControl+Shift+P");

            await register("CommandOrControl+Shift+P", () => {
                appWindow.show();
                appWindow.setFocus();
            });

            await appWindow.onFocusChanged(async ({ payload: focused }) => {
                if (!focused) {
                    await appWindow.hide();
                }
            });
        };

        setEventListeners();
    }, []);

    useEffect(() => {
        setSearch("");
        localStorage.setItem("page", selectedPage.toString());
    }, [selectedPage]);

    return (
        <>
            <div className="w-screen h-screen flex flex-col bg-primary shadow-2xl pb-12">
                <Header setSelectedPage={setSelectedPage} />

                <NavigationBar search={search} setSearch={setSearch} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                <HomeView selectedPage={selectedPage} pageId={0} />
                <SettingsView selectedPage={selectedPage} pageId={1} />
                <AppsView search={search} selectedPage={selectedPage} pageId={2} />
                <GamesView search={search} selectedPage={selectedPage} pageId={3} />
                <CommandsView search={search} selectedPage={selectedPage} pageId={4} />
                <FoldersView search={search} selectedPage={selectedPage} pageId={5} />
            </div>
        </>
    );
};

export default App;
