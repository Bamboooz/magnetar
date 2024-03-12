import React from "react";
import { LuTrash2 } from "react-icons/lu";

import Context from "../common/Context";
import { AppList } from "./Apps";

interface AppItemContextProps {
    x: number;
    y: number;
    closeContextMenu: () => void;
    filePath: string;
    setApps: React.Dispatch<React.SetStateAction<AppList>>;
}

const AppItemContext: React.FC<AppItemContextProps> = ({ x, y, closeContextMenu, setApps, filePath }) => {
    const removeApp = () => {
        setApps((prevApps) => {
            const { [filePath]: ommited, ...newApps } = prevApps;
            return newApps;
        });

        closeContextMenu();
    };

    return (
        <>
            <Context x={x} y={y} closeContextMenu={closeContextMenu} className="w-56 bg-primary shadow-2xl rounded-md border-solid border-[1px] border-border">
                <button title="Remove app" onClick={removeApp} className="h-10 w-full px-4 gap-2 flex items-center justify-start text-[12px] text-red-500 hover:text-red-400">
                    <LuTrash2 />
                    <p>Remove app</p>
                </button>
            </Context>
        </>
    );
};

export default AppItemContext;
