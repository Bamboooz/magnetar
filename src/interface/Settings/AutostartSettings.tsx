import React from "react";
import { LuPlay } from "react-icons/lu";

import SettingsItem from "./SettingsItem";
import Checkbox from "../../components/Checkbox";
import store from "../../store";
import { setAutostart } from "../../store/slices/settings";

const AutostartSettings: React.FC = () => {
    const changeAutostart = (autostart: boolean) => {
        store.dispatch(setAutostart(autostart));
    };

    return (
        <>
            <SettingsItem icon={<LuPlay />} name="Autostart" description="Select whether you want the app to start with your computer.">
                <Checkbox text="Add to autostart" defaultState={false} onCheck={changeAutostart} className="bg-tertiary border-border" />
            </SettingsItem>
        </>
    );
};

export default AutostartSettings;
