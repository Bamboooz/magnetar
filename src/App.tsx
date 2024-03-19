import React, { useEffect, useState } from "react";
import { register, unregister } from "@tauri-apps/api/globalShortcut";
import { appWindow } from "@tauri-apps/api/window";

import AppsView from "./components/Apps/Apps";
import CommandsView from "./components/Commands/Commands";
import Header from "./components/Header/Header";
import NavigationBar from "./components/Navigation/NavigationBar";
import GamesView from "./components/Games/Games";
import SettingsView from "./components/Settings/Settings";
import AudioView from "./components/Audio/Audio";
import HomeView from "./components/Home/Home";

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
                <AudioView selectedPage={selectedPage} pageId={5} />
            </div>
        </>
    );
};

export default App;
