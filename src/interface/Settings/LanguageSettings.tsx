import React from "react";
import { LuLanguages } from "react-icons/lu";

import SettingsItem from "./SettingsItem";
import Dropdown from "../../components/Dropdown";

const LanguageSettings: React.FC = () => {
    return (
        <>
            <SettingsItem icon={<LuLanguages />} name="Language" description="Select which language do you want magnetar to use.">
                <Dropdown values={["English", "Polish"]} defaultIndex={0} />
            </SettingsItem>
        </>
    );
};

export default LanguageSettings;
