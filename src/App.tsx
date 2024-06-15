import React, { useEffect } from "react";

import Header from "./interface/Header";
import NavigationBar from "./interface/Navigation";
import SettingsView from "./interface/Settings";
import HomeView from "./interface/Home";
import store from "./store";
import { setSearch } from "./store/slices/search";
import { modules } from "./modules/Module";

const App: React.FC = () => {
    useEffect(() => {
        store.dispatch(setSearch(""));
    }, [store.getState().page]);

    return (
        <>
            <div className="w-screen h-screen flex flex-col bg-primary shadow-2xl pb-12 overflow-hidden">
                <Header />
                <NavigationBar />

                <HomeView />
                <SettingsView />

                {modules.map((module, index) =>
                    <div key={index}>
                        {module.enabled && module.component}
                    </div>
                )}
            </div>
        </>
    );
};

export default App;
