import React from "react";

import { cn } from "../../utils/tw";

interface SettingsViewProps {
    selectedPage: number;
    pageId: number;
}

const SettingsView: React.FC<SettingsViewProps> = ({ selectedPage, pageId }) => {
    return (
        <>
            <div className={cn(selectedPage === pageId ? "w-full h-full flex flex-col items-start justify-start overflow-auto px-6 py-4" : "hidden")}>
                <p className="text-neutral-300 font-semibold text-[16px]">Settings</p>
            </div>
        </>
    );
};

export default SettingsView;
