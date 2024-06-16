import React, { useState } from "react";
import { convertFileSrc } from "@tauri-apps/api/tauri";

import AppItemContext from "./AppItemContext";
import { trim } from "../../utils/string";
import Item from "../../components/Item";
import { App, Application } from "./App";

const initialContextMenu = {
    show: false,
    x: 0,
    y: 0,
}

interface AppItemProps {
    app: App;
    setApps: React.Dispatch<React.SetStateAction<Application[]>>;
}

const AppItem: React.FC<AppItemProps> = ({ app, setApps }) => {
    const [contextMenu, setContextMenu] = useState(initialContextMenu);

    const handleContextMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const { pageX, pageY } = e;
        setContextMenu({ show: true, x: pageX, y: pageY });
    };

    const contextMenuClose = () => setContextMenu(initialContextMenu);

    return (
        <>
            <Item title={app.name} onClick={() => app.open()} onContextMenu={handleContextMenu} className="gap-3">
                <img src={convertFileSrc(app.path)} className="w-[px] h-[40px]" />

                <div className="flex flex-col items-start justify-center">
                    <p className="text-[14px] font-bold text-text-primary">{app.name}</p>
                    
                    <p className="text-[11px] text-neutral-400">{trim(app.path, 50)}</p>
                </div>
            </Item>

            {contextMenu.show &&
                <AppItemContext x={contextMenu.x} y={contextMenu.y} closeContextMenu={contextMenuClose} app={app} setApps={setApps} />
            }
        </>
    );
};

export default AppItem;
