import React from "react";
import { appWindow } from "@tauri-apps/api/window";
import { VscTerminalPowershell } from "react-icons/vsc";
import { LuTerminal } from "react-icons/lu";

import Item from "../Item";
import { trim } from "../../utils/trim";
import { executeCommand } from "../../utils/cmd";
import { Command } from ".";
import admin_icon from "../../assets/icons/admin.png";

interface CommandItemProps {
  command: Command;
}

const CommandItem: React.FC<CommandItemProps> = ({ command }) => {
  const execute = async () => {
    appWindow.hide();
    executeCommand(command.command, command.admin);
  };

  return (
    <Item label={command.label} onClick={execute} className="justify-between">
      <div className="flex items-center justify-start gap-6 text-neutral-300 text-3xl">
        {command.command.toLowerCase().includes("powershell") ? (
          <VscTerminalPowershell />
        ) : (
          <LuTerminal />
        )}

        <div className="flex flex-col items-start justify-center">
          <p className="text-md">{trim(command.label)}</p>
          <p className="text-sm text-neutral-400">{trim(command.command)}</p>
        </div>
      </div>

      {command.admin && <img src={admin_icon} className="h-4 w-4" />}
    </Item>
  );
};

export default CommandItem;
