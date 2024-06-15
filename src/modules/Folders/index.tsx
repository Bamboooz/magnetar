import React, { useState, useEffect } from "react";
import { open } from "@tauri-apps/api/dialog";
import { appWindow } from "@tauri-apps/api/window";

import { cn } from "../../utils/cn";
import { LuPlus } from "react-icons/lu";
import FolderItem from "./FolderItem";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

const FoldersModule: React.FC = () => {
    const [folders, setFolders] = useState<string[]>(["C://Users//Bambu//Pulpit"]);

    const search = useSelector((state: RootState) => state.search);

    const displayedFolders = folders.filter((key) => key.toLowerCase().includes(search.toLowerCase()));

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

    useEffect(() => localStorage.setItem("folders", JSON.stringify(folders)), [folders]);

    return (
        <>
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
        </>
    );
};

export default FoldersModule;
