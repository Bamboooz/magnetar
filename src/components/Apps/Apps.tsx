import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";

import AppItem from "./AppItem";
import { cn } from "../../utils/tw";
import NewAppMenu from "./NewAppMenu";

type AppItem = { name: string, iconPath: string };
type AppList = { [filePath: string]: AppItem };

interface AppsViewProps {
    search: string;
}

const AppsView: React.FC<AppsViewProps> = ({ search }) => {
    const appsStorage = localStorage.getItem("apps");
    const appsDefault: AppList = appsStorage ? JSON.parse(appsStorage) : {};
    const [apps, setApps] = useState<AppList>(appsDefault);
    const [newAppMenuOpened, setNewAppMenuOpened] = useState<boolean>(false);

    const displayedApps = Object.keys(apps).filter((key) => apps[key].name.toLowerCase().includes(search.toLowerCase()));

    const addNewApp = (filePath: string, icoPath: string, fileName: string) => {
        const newAppItem: AppItem = {
            name: fileName,
            iconPath: icoPath,
        };

        setApps((prevApps) => ({ ...prevApps, [filePath]: newAppItem }));
    };
    
    useEffect(() => {
        localStorage.setItem("apps", JSON.stringify(apps));
    }, [apps]);

    return (
        <>
            <div className="w-full h-full flex flex-col items-center justify-start overflow-auto">
                <div className="w-full h-12 flex items-center justify-start px-4 gap-6">
                    <button onClick={() => setNewAppMenuOpened(true)} className="h-10 w-10 flex items-center justify-center text-neutral-400 transition-colors hover:text-neutral-300">
                        <LuPlus className="text-[16px]" />
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

                <NewAppMenu newAppMenuOpened={newAppMenuOpened} setNewAppMenuOpened={setNewAppMenuOpened} addNewApp={addNewApp} />
            </div>
        </>
    );
};

export type { AppList };
export default AppsView;
