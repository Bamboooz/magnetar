import React, { useState } from "react";
import { LuPackage } from "react-icons/lu";
import { executeCommand } from "../../utils/cmd";
import { App } from "../../types";
import AppItemContext from "./AppItemContext";
import Item from "../common/Item";

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

  return (
    <>
      <Item
        icon={<LuPackage />}
        title={app.label}
        description={app.path}
        onClick={openApp}
        onContextMenu={handleContextMenu}
      />

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
