import React from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { FcFolder } from "react-icons/fc";

import { trim } from "../../utils/string";
import Item from "../../components/Item";

interface FolderItemProps {
    filePath: string;
}

const FolderItem: React.FC<FolderItemProps> = ({ filePath }) => {
    const folderName = filePath.replace(/\\/g, "/").replace(/\/+$/, "").split("/").pop() || "";

    return (
        <>
            <Item onClick={() => invoke("explorer_open", { path: filePath })} title="Open folder in explorer">
                <div className="flex items-center justify-center gap-3">
                    <FcFolder className="text-neutral-300 text-[32px]" />

                    <div className="flex flex-col items-start justify-center">
                        <p className="text-[14px] font-bold text-neutral-300">{folderName}</p>
                        
                        <p className="text-[11px] text-neutral-400">{trim(filePath, 50)}</p>
                    </div>
                </div>
            </Item>
        </>
    );
};

export default FolderItem;
