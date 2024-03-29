import React, { useEffect, useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { open } from "@tauri-apps/api/dialog";
import { LuPlus } from "react-icons/lu";

import AppItem from "./AppItem";
import NewAppMenu from "./NewAppMenu";
import { cn } from "../../utils/tw";

type AppItem = { name: string, iconPath: string };
type AppList = { [filePath: string]: AppItem };

interface AppsViewProps {
    search: string;
    selectedPage: number;
    pageId: number;
}

const AppsView: React.FC<AppsViewProps> = ({ search, selectedPage, pageId }) => {
    const appsStorage = localStorage.getItem("apps");
    const appsDefault: AppList = appsStorage ? JSON.parse(appsStorage) : {};

    const [apps, setApps] = useState<AppList>(appsDefault);

    const [newAppMenuOpened, setNewAppMenuOpened] = useState<boolean>(false);
    const [filePath, setFilePath] = useState<string>("");

    const displayedApps = Object.keys(apps).filter((key) => apps[key].name.toLowerCase().includes(search.toLowerCase()));

    const addNewApp = (filePath: string, icoPath: string, fileName: string) => {
        const newAppItem: AppItem = {
            name: fileName,
            iconPath: icoPath,
        };

        setApps(prevApps => ({ ...prevApps, [filePath]: newAppItem }));
    };
    
    const openNewAppDialog = async () => {
        await open({ title: "Select an executable", multiple: false, filters: [{ name: "", extensions: ["exe"] }] })
            .then(path => {
                setFilePath(path as string);
                setNewAppMenuOpened(true);
            })
            .catch(err => {
                console.error(err);
            });

        await appWindow.show();
        await appWindow.setFocus();
    };

    useEffect(() => {
        localStorage.setItem("apps", JSON.stringify(apps));
    }, [apps]);

    return (
        <>
            <div className={selectedPage === pageId ? "w-full h-full flex flex-col items-center justify-start overflow-auto" : "hidden"}>
                <div className="w-full h-12 flex items-center justify-start px-6">
                    <button onClick={openNewAppDialog} className="h-10 w-10 flex items-center justify-center text-neutral-400 transition-colors hover:text-neutral-300">
                        <LuPlus className="text-[22px]" />
                    </button>
                </div>
                
                <div className={cn("w-full h-full flex flex-col items-center overflow-auto", displayedApps.length > 0 ? "justify-start" : "justify-center")}>
                    {displayedApps.length > 0 ?
                        displayedApps.map((key, index) => (
                            <AppItem key={index} filePath={key} name={apps[key].name} iconPath={apps[key].iconPath} setApps={setApps} />
                        ))
                        : <p className="text-neutral-300 text-[18px] font-semibold">No applications found.</p>
                    }
                </div>

                <NewAppMenu newAppMenuOpened={newAppMenuOpened} setNewAppMenuOpened={setNewAppMenuOpened} filePath={filePath} setFilePath={setFilePath} addNewApp={addNewApp} />
            </div>
        </>
    );
};

export type { AppList };
export default AppsView;
