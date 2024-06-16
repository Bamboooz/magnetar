import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { cn } from "../../utils/cn";
import { RootState } from "../../store";
import { App, Application } from "./App";
import AppPanel from "./AppPanel";
import AppItem from "./AppItem";

const AppsModule: React.FC = () => {
    const savedApps = localStorage.getItem("apps");
    
    let loadedApps: Application[] = savedApps ? JSON.parse(savedApps) : [];

    const [apps, setApps] = useState<Application[]>(loadedApps);

    const search = useSelector((state: RootState) => state.search);
    const displayedApps = Array.isArray(apps) ? apps.filter(app => app.name.toLowerCase().includes(search.toLowerCase())) : [];

    useEffect(() => {
        localStorage.setItem("apps", JSON.stringify(apps));
    }, [apps]);

    return (
        <>
            <AppPanel setApps={setApps} />
            
            <div className={cn("w-full h-full flex flex-col items-center overflow-auto", displayedApps.length > 0 ? "justify-start" : "justify-center")}>
                {displayedApps.length > 0
                    ? displayedApps.map((app, index) => (
                        <AppItem key={index} app={new App(app.path, app.name, app.iconPath)} setApps={setApps} />
                    ))
                    : <p className="text-text-primary text-[18px] font-semibold">No applications found.</p>
                }
            </div>
        </>
    );
};

export default AppsModule;
