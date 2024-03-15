import React, { useRef, useState } from "react";
import { invoke, convertFileSrc } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window"
import { LuMoreVertical } from "react-icons/lu";

import AppItemContext from "./AppItemContext";
import { AppList } from "./Apps";

const initialContextMenu = {
    show: false,
    x: 0,
    y: 0,
}

interface AppItemProps {
    name: string;
    filePath: string;
    iconPath: string;
    setApps: React.Dispatch<React.SetStateAction<AppList>>;
}

const AppItem: React.FC<AppItemProps> = ({ name, filePath, iconPath, setApps }) => {
    const [contextMenu, setContextMenu] = useState(initialContextMenu);

    const appItemRef = useRef<HTMLButtonElement>(null);

    const trimmedFilePath = filePath.length <= 40 ? filePath : `${filePath.substring(0, 40)}...`;

    const handleContextMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const { pageX, pageY } = e;
        setContextMenu({ show: true, x: pageX, y: pageY });
    };

    const contextMenuClose = () => setContextMenu(initialContextMenu);

    const openExecutable = async () => {
        await appWindow.hide();

        await invoke("execute_command", { command: `"${filePath}"`, requiresAdministrator: false })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <>
            <div className="group w-full flex shrink-0 pl-6 pr-6 py-1 items-center justify-between hover:bg-item-hover">
                <div className="w-full flex items-center justify-between">
                    <div title={name} onClick={openExecutable} className="flex items-center justify-center gap-3">
                        <img src={convertFileSrc(iconPath)} className="h-[44px] w-[44px]" alt="icon" />

                        <div className="flex flex-col items-start justify-center">
                            <p className="text-[14px] font-bold text-neutral-300">{name}</p>
                            <p className="text-[11px] text-neutral-400">{trimmedFilePath}</p>
                        </div>
                    </div>

                    <button title="More" ref={appItemRef} onClick={(e) => handleContextMenu(e)} className="hidden group-hover:block group-hover:p-1 group-hover:z-20">
                        <LuMoreVertical className="text-neutral-300 text-[16px]" />
                    </button>
                </div>

                {contextMenu.show &&
                    <AppItemContext x={contextMenu.x} y={contextMenu.y} filePath={filePath} iconPath={iconPath} closeContextMenu={contextMenuClose} setApps={setApps} />
                }
            </div>
        </>
    );
};

export default AppItem;
