import React, { useState } from "react";
import { VscTerminalPowershell } from "react-icons/vsc";
import { LuTerminal } from "react-icons/lu";
import { exec } from "../../utils";
import { Command } from "../../types";
import CommandItemContext from "./CommandItemContext";
import Item from "../common/Item";

const initialContextMenu = {
  x: 0,
  y: 0,
  visible: false,
};

interface CommandItemProps {
  command: Command;
}

export default function CommandItem({ command }: CommandItemProps) {
  const [context, setContext] = useState(initialContextMenu);

  const isPowershell = command.command.toLowerCase().includes("powershell");

  const closeContextMenu = () => setContext(initialContextMenu);

  const handleContextMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const x = e.clientX;
    const y = e.clientY;

    setContext({ x, y, visible: true });
  };

  const execute = async (admin: boolean) => exec(command.command, admin);

  return (
    <>
      <Item
        icon={isPowershell ? <VscTerminalPowershell /> : <LuTerminal />}
        title={command.label}
        description={command.command}
        onClick={() => execute(command.admin)}
        onContextMenu={handleContextMenu}
      >
        {command.admin && <img src="/admin.png" className="h-4 w-4" />}
      </Item>

      {context.visible && (
        <CommandItemContext
          x={context.x}
          y={context.y}
          closeContextMenu={closeContextMenu}
          execute={execute}
        />
      )}
    </>
  );
}
