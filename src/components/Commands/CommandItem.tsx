import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { VscTerminalPowershell } from "react-icons/vsc";
import { LuTerminal } from "react-icons/lu";
import Item from "../common/Item";
import { executeCommand } from "../../utils/cmd";
import admin_icon from "../../assets/icons/admin.png";
import { useMount } from "../../hooks/useMount";
import { Command } from "../../types";
import CommandItemContext from "./CommandItemContext";

const initialContextMenu = {
  x: 0,
  y: 0,
  visible: false,
};

interface CommandItemProps {
  command: Command;
}

const CommandItem: React.FC<CommandItemProps> = ({ command }) => {
  const [label, setLabel] = useState<string>(command.label);
  const [cmd, setCmd] = useState<string>(command.command);
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

  const execute = async (admin: boolean) =>
    executeCommand(command.command, admin);

  useMount(async () => {
    await invoke("trim", { input: command.label }).then((label) =>
      setLabel(label as string)
    );

    await invoke("trim", { input: command.command }).then((cmd) =>
      setCmd(cmd as string)
    );
  });

  return (
    <>
      <Item
        onClick={() => execute(command.admin)}
        onContextMenu={handleContextMenu}
        className="justify-between"
      >
        <div className="flex items-center justify-start gap-6 text-neutral-300 text-3xl">
          {isPowershell ? <VscTerminalPowershell /> : <LuTerminal />}

          <div className="flex flex-col items-start justify-center">
            <p className="text-md">{label}</p>
            <p className="text-sm text-neutral-400">{cmd}</p>
          </div>
        </div>

        {command.admin && <img src={admin_icon} className="h-4 w-4" />}
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
};

export default CommandItem;
