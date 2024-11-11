import React from "react";
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
      <ContextButton label="Open" onClick={openApp} />
      <ContextButton label="Open in explorer" onClick={openInExplorer} />
      <ContextButton label="Remove app" onClick={removeApp} />
    </Context>
  );
};

export default AppItemContext;
