import React from "react";
import { LuPlay } from "react-icons/lu";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Context from "../common/Context";
import ContextButton from "../common/ContextButton";

interface CommandItemContextProps {
  x: number;
  y: number;
  closeContextMenu: () => void;
  execute: (admin: boolean) => Promise<void>;
}

const CommandItemContext: React.FC<CommandItemContextProps> = ({
  x,
  y,
  closeContextMenu,
  execute,
}) => {
  return (
    <Context x={x} y={y} closeContextMenu={closeContextMenu}>
      <ContextButton
        title="Execute"
        icon={<LuPlay />}
        className="text-neutral-400 hover:text-neutral-300"
        onClick={() => execute(false)}
      />
      <ContextButton
        title="Execute as admin"
        icon={<MdOutlineAdminPanelSettings />}
        className="text-neutral-400 hover:text-neutral-300"
        onClick={() => execute(true)}
      />
    </Context>
  );
};

export default CommandItemContext;
