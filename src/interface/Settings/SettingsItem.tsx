import React, { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

import { cn } from "../../utils/cn";

interface SettingsItemProps {
    icon: React.ReactElement;
    name: string;
    description: string;
    children?: React.ReactNode;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ icon, name, description, children }) => {
    const [expanded, setExpanded] = useState<boolean>(false);

    return (
        <>
            <div className="w-full flex flex-col items-center justify-between bg-secondary rounded-md">
                <button onClick={() => setExpanded(!expanded)} className="w-full h-16 flex items-center justify-between px-4">
                    <div className="flex items-center justify-between gap-4">
                        {React.cloneElement(icon, { className: "text-text-primary text-[22px]" })}

                        <div className="flex flex-col items-start justify-between">
                            <p className="text-text-primary text-[12px]">{name}</p>

                            <p className="text-text-secondary text-[10px]">{description}</p>
                        </div>
                    </div>

                    <LuChevronDown className={cn("text-text-primary text-[22px] transition-all", expanded ? "-rotate-180" : "")} />
                </button>

                <div className={cn("w-full h-full overflow-hidden px-4 transition-all ease-in-out duration-800", expanded ? "h-auto" : "h-0")}>
                    <div className="w-full h-full flex flex-col items-start justify-start py-4">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SettingsItem;
