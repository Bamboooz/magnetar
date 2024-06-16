import React from "react";
import { removeFile } from "@tauri-apps/api/fs";
import { LuTrash2 } from "react-icons/lu";

import Context from "../../components/Context";
import { Application } from "./App";

interface AppItemContextProps {
    x: number;
    y: number;
    closeContextMenu: () => void;
    app: Application;
    setApps: React.Dispatch<React.SetStateAction<Application[]>>;
}

const AppItemContext: React.FC<AppItemContextProps> = ({ x, y, closeContextMenu, app, setApps }) => {
    const removeApp = async () => {
        setApps(prevApps => prevApps.filter(application => app !== application));
        await removeFile(app.iconPath!);

        closeContextMenu();
    };

    return (
        <>
            <Context x={x} y={y} closeContextMenu={closeContextMenu} className="w-56 bg-primary shadow-2xl rounded-md border-solid border-[1px] border-border">
                <button title="Remove app" onClick={removeApp} className="h-10 w-full px-4 gap-2 flex items-center justify-start text-[12px] text-close-primary hover:text-close-secondary">
                    <LuTrash2 />

                    <p>Remove app</p>
                </button>
            </Context>
        </>
    );
};

export default AppItemContext;
