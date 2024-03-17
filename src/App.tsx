import React, { useEffect, useState } from "react";
import { register, unregister } from "@tauri-apps/api/globalShortcut";
import { appWindow } from "@tauri-apps/api/window";

import AppsView from "./components/Apps/Apps";
import CommandsView from "./components/Commands/Commands";
import Header from "./components/Header";
import NavigationBar from "./components/NavigationBar";
import GamesView from "./components/Games/Games";
import SettingsView from "./components/Settings/Settings";

const App: React.FC = () => {
    const pageStorage = localStorage.getItem("page");
    const pageDefault = pageStorage ? Number(pageStorage) : 0;
    const [selectedPage, setSelectedPage] = useState<number>(pageDefault);
    const [settingsOpened, setSettingsOpened] = useState<boolean>(false);

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
                <Header settingsOpened={settingsOpened} setSettingsOpened={setSettingsOpened} />

                <NavigationBar search={search} setSearch={setSearch} settingsOpened={settingsOpened} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                <AppsView search={search} selectedPage={selectedPage} pageId={0} settingsOpened={settingsOpened} />
                <GamesView search={search} selectedPage={selectedPage} pageId={1} settingsOpened={settingsOpened} />
                <CommandsView search={search} selectedPage={selectedPage} pageId={2} settingsOpened={settingsOpened} />
                <SettingsView settingsOpened={settingsOpened} />
            </div>
        </>
    );
};

export default App;
