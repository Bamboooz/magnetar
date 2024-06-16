import React from "react";
import { LuPaintbrush } from "react-icons/lu";

import SettingsItem from "./SettingsItem";
import Dropdown from "../../components/Dropdown";
import store from "../../store";
import { Theme, setTheme } from "../../store/slices/settings";

const ThemeSettings: React.FC = () => {
    const themes: Theme[] = ["Dark", "Light"];
    const defaultTheme = themes.indexOf(store.getState().settings.theme);

    const changeTheme = (index: number) => {
        const theme = themes[index];

        store.dispatch(setTheme(theme));

        document.documentElement.setAttribute("data-theme", theme.toLowerCase());
    };

    return (
        <>
            <SettingsItem icon={<LuPaintbrush />} name="Theme" description="Select which app theme to display.">
                <Dropdown values={themes} defaultIndex={defaultTheme} onSelect={changeTheme} />
            </SettingsItem>
        </>
    );
};

export default ThemeSettings;
