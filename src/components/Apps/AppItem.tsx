import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { LuPackage } from "react-icons/lu";
import Item from "../common/Item";
import { executeCommand } from "../../utils/cmd";
import { App } from "../../types/modules/apps";
import { useMount } from "../../hooks/useMount";
import AppItemContext from "./AppItemContext";

const initialContextMenu = {
  x: 0,
  y: 0,
  visible: false,
};

interface AppItemProps {
  app: App;
  apps: App[];
  setApps: React.Dispatch<React.SetStateAction<App[]>>;
}

const AppItem: React.FC<AppItemProps> = ({ app, apps, setApps }) => {
  const [label, setLabel] = useState<string>(app.label);
  const [path, setPath] = useState<string>(app.path);
  const [context, setContext] = useState(initialContextMenu);

  const closeContextMenu = () => setContext(initialContextMenu);

  const handleContextMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const x = e.clientX;
    const y = e.clientY;

    setContext({ x, y, visible: true });
  };

  const openApp = async () => executeCommand(app.path, false);

  const openInExplorer = async () => {
    const path = app.path.substring(0, app.path.lastIndexOf("\\"));

    executeCommand(`explorer "${path}"`, false);
  };

  const removeApp = async () => {
    const newApps = apps.filter((a) => a.path !== app.path);
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
    <>
      <Item
        onClick={openApp}
        onContextMenu={handleContextMenu}
        className="justify-start gap-6"
      >
        <LuPackage className="text-neutral-300 text-3xl" />

        <div className="flex flex-col items-start justify-center">
          <p className="text-md text-neutral-300">{label}</p>
          <p className="text-sm text-neutral-400">{path}</p>
        </div>
      </Item>

      {context.visible && (
        <AppItemContext
          x={context.x}
          y={context.y}
          closeContextMenu={closeContextMenu}
          openApp={openApp}
          openInExplorer={openInExplorer}
          removeApp={removeApp}
        />
      )}
    </>
  );
};

export default AppItem;
