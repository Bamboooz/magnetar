import React, { useState, useEffect } from "react";
import { open } from "@tauri-apps/api/dialog";
import { appWindow } from "@tauri-apps/api/window";

import { cn } from "../../utils/cn";
import { LuPlus } from "react-icons/lu";
import FolderItem from "./FolderItem";

interface FoldersViewProps {
    search: string;
    selectedPage: number;
    pageId: number;
}

const FoldersView: React.FC<FoldersViewProps> = ({ search, selectedPage, pageId }) => {
    const foldersStorage = localStorage.getItem("folders");
    const foldersDefault = foldersStorage ? JSON.parse(foldersStorage) : ["C://Users//Bambu//Pulpit"];

    const [folders, setFolders] = useState<string[]>(foldersDefault);

    const addFolder = async () => {
        await open({ title: "Select a folder", directory: true, multiple: false })
            .then(path => {
                setFolders(prevFolders => [...prevFolders, path as string]);
            })
            .catch(err => {
                console.error(err);
            });

        await appWindow.show();
        await appWindow.setFocus();
    };

    const displayedFolders = folders.filter((key) => key.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => localStorage.setItem("folders", JSON.stringify(folders)), [folders]);

    return (
        <>
           <div className={selectedPage === pageId ? "w-full h-full flex flex-col items-center justify-start overflow-auto" : "hidden"}>
                <div className="w-full h-12 flex items-center justify-start px-6">
                    <button onClick={addFolder} className="h-10 w-10 flex items-center justify-center text-neutral-400 transition-colors hover:text-neutral-300">
                        <LuPlus className="text-[22px]" />
                    </button>
                </div>
                
                <div className={cn("w-full h-full flex flex-col items-center overflow-auto", displayedFolders.length > 0 ? "justify-start" : "justify-center")}>
                    {displayedFolders.length > 0 ?
                        displayedFolders.map((key, index) => (
                            <FolderItem filePath={key} key={index} />
                        ))
                        : <p className="text-neutral-300 text-[18px] font-semibold">No folders found.</p>
                    }
                </div>
            </div>
        </>
    );
};

export default FoldersView;
