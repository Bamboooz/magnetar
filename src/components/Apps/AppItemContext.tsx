import React from "react";
import { LuFolder, LuPlay, LuTrash } from "react-icons/lu";
import Context from "../common/Context";
import ContextButton from "../common/ContextButton";

interface AppItemContextProps {
  x: number;
  y: number;
  closeContextMenu: () => void;
  openApp: () => Promise<void>;
  openInExplorer: () => Promise<void>;
  removeApp: () => Promise<void>;
}

const AppItemContext: React.FC<AppItemContextProps> = ({
  x,
  y,
  closeContextMenu,
  openApp,
  openInExplorer,
  removeApp,
}) => {
  return (
    <Context x={x} y={y} closeContextMenu={closeContextMenu}>
      <ContextButton
        title="Open"
        icon={<LuPlay />}
        className="text-neutral-400 hover:text-neutral-300"
        onClick={openApp}
      />
      <ContextButton
        title="Open in explorer"
        icon={<LuFolder />}
        className="text-neutral-400 hover:text-neutral-300"
        onClick={openInExplorer}
      />
      <ContextButton
        title="Remove app"
        icon={<LuTrash />}
        className="text-red-500 hover:text-red-400"
        onClick={removeApp}
      />
    </Context>
  );
};

export default AppItemContext;
