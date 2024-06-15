import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { register, unregister } from "@tauri-apps/api/globalShortcut";
import { appWindow } from "@tauri-apps/api/window";

import Header from "./interface/Header";
import NavigationBar from "./interface/Navigation";
import SettingsView from "./interface/Settings";
import HomeView from "./interface/Home";
import store, { RootState } from "./store";
import { setSearch } from "./store/slices/search";
import { modules } from "./modules/Module";
import { cn } from "./utils/cn";

const App: React.FC = () => {
    const page = useSelector((state: RootState) => state.page);

    useEffect(() => {
        store.dispatch(setSearch(""));
    }, [page]);

    useEffect(() => {
        const registerKeybind = async () => {
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
        };

        registerKeybind();
    }, []);

    return (
        <>
            <div className="w-screen h-screen flex flex-col bg-primary shadow-2xl pb-12 overflow-hidden">
                <Header />
                <NavigationBar />

                <HomeView />
                <SettingsView />

                {modules.map((module, index) =>
                    <div key={index} className={cn(page === module.id ? "w-full h-full flex flex-col items-start justify-start overflow-auto" : "hidden")}>
                        {module.enabled && module.component}
                    </div>
                )}
            </div>
        </>
    );
};

export default App;
