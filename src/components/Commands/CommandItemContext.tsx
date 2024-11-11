import React from "react";
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
      <ContextButton label="Execute" onClick={() => execute(false)} />
      <ContextButton label="Execute as admin" onClick={() => execute(true)} />
    </Context>
  );
};

export default CommandItemContext;
