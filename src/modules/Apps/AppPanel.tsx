import React from "react";
import { open } from "@tauri-apps/api/dialog";
import { LuPlus } from "react-icons/lu";
import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";

import { Application } from "./App";
import { fileName } from "../../utils/path";

interface AppPanelProps {
    setApps: React.Dispatch<React.SetStateAction<Application[]>>;
}

const AppPanel: React.FC<AppPanelProps> = ({ setApps }) => {
    const openNewAppDialog = async () => {
        const path = await open({ title: "Select an executable", multiple: false, filters: [{ name: "", extensions: ["exe"] }] }) as string;
        const iconPath = await invoke("save_pe_ico", { pePath: path }) as string;

        setApps(prevApps => [...prevApps, {
            "path": path,
            "name": fileName(path),
            "iconPath": iconPath
        }]);

        await appWindow.show();
        await appWindow.setFocus();
    };

    return (
        <>
            <div className="w-full h-12 flex items-center justify-start px-6">
                <button onClick={() => openNewAppDialog()} className="h-10 w-10 flex items-center justify-center text-text-secondary transition-colors hover:text-text-primary">
                    <LuPlus className="text-[22px]" />
                </button>
            </div>
        </>
    );
};

export default AppPanel;
