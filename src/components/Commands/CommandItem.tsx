import React from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";
import { LuTerminal } from "react-icons/lu";
import { VscTerminalPowershell } from "react-icons/vsc";

import admin_icon from "../../assets/admin.png";

interface CommandItemProps {
    title: string;
    command: string;
    requiresAdministrator?: boolean;
}

const CommandItem: React.FC<CommandItemProps> = ({ title, command, requiresAdministrator }) => {
    const executeCommand = async () => {
        await appWindow.hide();

        await invoke("execute_command", { command: command, requiresAdministrator: requiresAdministrator })
            .catch(err => {
                console.error(err);
            });
    };
    
    const trimmedTitle = command.length <= 50 ? command : `${command.substring(0, 50)}...`;

    return (
        <>
            <button title={command} onClick={executeCommand} className="w-full h-12 flex shrink-0 px-6 items-center justify-between hover:bg-item-hover">
                <div className="flex items-center justify-start gap-6">
                    {command.includes("powershell")
                        ? <VscTerminalPowershell className="text-neutral-300 text-[20px]" />
                        : <LuTerminal className="text-neutral-300 text-[20px]" />
                    }

                    <div className="flex flex-col items-start justify-center">
                        <p className="text-[14px] font-semibold text-neutral-300">{title}</p>
                        <p className="text-[12px] text-neutral-400 truncate">{trimmedTitle}</p>
                    </div>
                </div>

                {requiresAdministrator &&
                    <img src={admin_icon} className="h-4 w-4" />
                }
            </button>
        </>
    );
};

export default CommandItem;
