import React, { useState } from "react";
import { invoke, convertFileSrc } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window"

import AppItemContext from "./AppItemContext";
import { AppList } from ".";
import { trim } from "../../utils/string";
import Item from "../../components/Item";

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

    const handleContextMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const { pageX, pageY } = e;
        setContextMenu({ show: true, x: pageX, y: pageY });
    };

    const contextMenuClose = () => setContextMenu(initialContextMenu);

    const openExecutable = async () => {
        await appWindow.hide();

        await invoke("run_pe", { pePath: filePath })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <>
            <Item title={name} onClick={openExecutable} onContextMenu={handleContextMenu} className="gap-3">
                <img src={convertFileSrc(iconPath)} className="w-[px] h-[40px]" />

                <div className="flex flex-col items-start justify-center">
                    <p className="text-[14px] font-bold text-neutral-300">{name}</p>
                    
                    <p className="text-[11px] text-neutral-400">{trim(filePath, 50)}</p>
                </div>

                {contextMenu.show &&
                    <AppItemContext x={contextMenu.x} y={contextMenu.y} filePath={filePath} iconPath={iconPath} closeContextMenu={contextMenuClose} setApps={setApps} />
                }
            </Item>
        </>
    );
};

export default AppItem;
