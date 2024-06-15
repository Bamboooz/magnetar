import React from "react";
import { LuPaintbrush } from "react-icons/lu";

import SettingsItem from "./SettingsItem";
import Dropdown from "../../components/Dropdown";

const ThemeSettings: React.FC = () => {
    return (
        <>
            <SettingsItem icon={<LuPaintbrush />} name="Theme" description="Select which app theme to display.">
                <Dropdown values={["Dark", "Light"]} defaultIndex={0} />
            </SettingsItem>
        </>
    );
};

export default ThemeSettings;
