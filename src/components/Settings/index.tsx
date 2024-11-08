import React from "react";
import { LuLanguages, LuPaintbrush, LuPlay } from "react-icons/lu";
import Page from "../common/Page";
import Expander from "../common/Expander";
import SettingsItem from "./SettingsItem";
import { PageType } from "../../types";

interface SettingsProps {
  page: PageType;
}

const Settings: React.FC<SettingsProps> = ({ page }) => {
  return (
    <Page id={PageType.SETTINGS} page={page} className="gap-3">
      <Expander label="General">
        <SettingsItem
          icon={<LuLanguages />}
          title="Language"
          description="Select which language to use"
        />
        <SettingsItem
          icon={<LuPaintbrush />}
          title="Theme"
          description="Select which theme to display"
        />
        <SettingsItem
          icon={<LuPlay />}
          title="Autostart"
          description="Select whether should run on autostart"
        />
      </Expander>
    </Page>
  );
};

export default Settings;
