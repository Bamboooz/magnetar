import React from "react";
import { LuKeyboard } from "react-icons/lu";

import SettingsItem from "./SettingsItem";

const KeybindSettings: React.FC = () => {
    return (
        <>
            <SettingsItem icon={<LuKeyboard />} name="Keybind" description="Select which keybind will open magnetar.">

            </SettingsItem>
        </>
    );
};

export default KeybindSettings;
