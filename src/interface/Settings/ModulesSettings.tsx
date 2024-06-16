import React from "react";
import { LuPackage } from "react-icons/lu";

import SettingsItem from "./SettingsItem";
import Checkbox from "../../components/Checkbox";
import { Module, modules } from "../../modules/Module";
import store from "../../store";
import { setEnabledModules } from "../../store/slices/settings";

const ModulesSettings: React.FC = () => {
    const changeEnabled = (module: Module, enabled: boolean) => {
        const enabledModules = store.getState().settings.enabledModules;

        if (enabled) {
            store.dispatch(setEnabledModules([...enabledModules, module.id]));
        } else {
            store.dispatch(setEnabledModules(enabledModules.filter(id => id !== module.id)));
        }
    };

    return (
        <>
            <SettingsItem icon={<LuPackage />} name="Enabled modules" description="Select which modules you want to be displayed in the navbar.">
                <div className="w-full h-full flex flex-col items-start justify-start gap-2">
                    {modules.map((module, index) => 
                        <Checkbox key={index} text={module.name} defaultState={false} onCheck={(checked) => changeEnabled(module, checked)} className="bg-tertiary border-border" />
                    )}
                </div>
            </SettingsItem>
        </>
    );
};

export default ModulesSettings;
