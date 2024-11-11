import React from "react";
import { LuLanguages, LuPaintbrush, LuPlay } from "react-icons/lu";
import Expander from "../common/Expander";
import Page from "../common/Page";
import Item from "../common/Item";
import { PageType } from "../../types";

interface SettingsProps {
  page: PageType;
}

const Settings: React.FC<SettingsProps> = ({ page }) => {
  return (
    <Page target={PageType.SETTINGS} current={page} className="gap-3">
      <Expander label="General">
        <Item
          icon={<LuLanguages />}
          title="Language"
          description="Select which language to use"
        />
        <Item
          icon={<LuPaintbrush />}
          title="Theme"
          description="Select which theme to display"
        />
        <Item
          icon={<LuPlay />}
          title="Autostart"
          description="Select whether should run on autostart"
        />
      </Expander>
    </Page>
  );
};

export default Settings;
