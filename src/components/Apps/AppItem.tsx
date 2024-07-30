import React from "react";
import { LuPackage, LuTrash } from "react-icons/lu";

import Item from "../Item";
import { trim } from "../../utils/trim";
import { executeCommand } from "../../utils/cmd";
import { App } from ".";

interface AppItemProps {
  app: App;
  apps: App[];
  setApps: React.Dispatch<React.SetStateAction<App[]>>;
}

const AppItem: React.FC<AppItemProps> = ({ app, apps, setApps }) => {
  const openApp = async () => executeCommand(`start "${app.path}"`, false);

  const removeApp = async () => {
    const newApps = apps.filter((a) => a.label !== app.label);
    setApps(newApps);
    localStorage.setItem("apps", JSON.stringify(newApps));
  };

  return (
    <Item label={app.label} className="justify-between">
      <div
        onClick={openApp}
        className="w-full flex items-center justify-start gap-6"
      >
        <LuPackage className="text-neutral-300 text-3xl" />

        <div className="flex flex-col items-start justify-center">
          <p className="text-md text-neutral-300">{trim(app.label)}</p>
          <p className="text-sm text-neutral-400">{trim(app.path)}</p>
        </div>
      </div>

      <div
        title={`Remove ${app.label}`}
        onClick={removeApp}
        className="hidden group-hover:flex items-center justify-center p-2 z-10 text-neutral-400 hover:text-neutral-300"
      >
        <LuTrash className="text-xl" />
      </div>
    </Item>
  );
};

export default AppItem;
