import React, { useState } from "react";
import { appWindow } from "@tauri-apps/api/window";
import { LuPackage, LuTrash } from "react-icons/lu";

import Item from "../Item";
import { executeCommand } from "../../utils/cmd";
import { App } from ".";
import { useMount } from "../../hooks/useMount";
import { invoke } from "@tauri-apps/api";

interface AppItemProps {
  app: App;
  apps: App[];
  setApps: React.Dispatch<React.SetStateAction<App[]>>;
}

const AppItem: React.FC<AppItemProps> = ({ app, apps, setApps }) => {
  const [label, setLabel] = useState<string>(app.label);
  const [path, setPath] = useState<string>(app.path);

  const openApp = async () => {
    appWindow.hide();
    executeCommand(app.path, false);
  };

  const removeApp = async () => {
    const newApps = apps.filter((a) => a.label !== app.label);
    setApps(newApps);
    localStorage.setItem("apps", JSON.stringify(newApps));
  };

  useMount(async () => {
    await invoke("trim", { input: app.label }).then((label) =>
      setLabel(label as string)
    );

    await invoke("trim", { input: app.path }).then((path) =>
      setPath(path as string)
    );
  });

  return (
    <Item label={app.label} className="justify-between">
      <div
        onClick={openApp}
        className="w-full flex items-center justify-start gap-6"
      >
        <LuPackage className="text-neutral-300 text-3xl" />

        <div className="flex flex-col items-start justify-center">
          <p className="text-md text-neutral-300">{label}</p>
          <p className="text-sm text-neutral-400">{path}</p>
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
