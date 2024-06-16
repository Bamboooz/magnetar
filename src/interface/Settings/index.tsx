import React from "react";
import { useSelector } from "react-redux";

import LanguageSettings from "./LanguageSettings";
import ThemeSettings from "./ThemeSettings";
import AutostartSettings from "./AutostartSettings";
import KeybindSettings from "./KeybindSettings";
import ModulesSettings from "./ModulesSettings";
import About from "./About";
import { cn } from "../../utils/cn";
import { RootState } from "../../store";

const SettingsView: React.FC = () => {
    const page = useSelector((state: RootState) => state.page);

    return (
        <>
            {/* -1 is reserved page for Settings */}
            <div className={cn(page === -1 ? "w-full h-full flex flex-col items-start justify-start overflow-auto px-6 py-4 gap-4" : "hidden")}>
                <p className="text-text-primary font-semibold text-[16px]">Settings</p>

                <div className="w-full h-full flex flex-col items-center justify-start gap-2">
                    <LanguageSettings />
                    <ThemeSettings />
                    <KeybindSettings />
                    <AutostartSettings />
                    <ModulesSettings />
                    <About />
                </div>
            </div>
        </>
    );
};

export default SettingsView;
