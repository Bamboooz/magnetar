import React from "react";
import { invoke } from "@tauri-apps/api/tauri";

import admin_icon from "../../assets/admin.png";

interface CommandItemProps {
    icon: React.ReactElement;
    title: string;
    command: string;
    requiresAdministrator?: boolean;
}

const CommandItem: React.FC<CommandItemProps> = ({ icon, title, command, requiresAdministrator }) => {
    const executeCommand = () => {
        const mode = requiresAdministrator ? "execute_command_as_admin" : "execute_command";
        
        invoke(mode, { command: command })
            .catch((err) => {
                console.error(err);
            });
    };
    
    const trimmedTitle = command.length <= 50 ? command : `${command.substring(0, 50)}...`;

    return (
        <>
            <button title={command} onClick={executeCommand} className="w-full h-12 flex shrink-0 px-6 items-center justify-between hover:bg-item-hover">
                <div className="flex items-center justify-start gap-6">
                    {React.cloneElement(icon, { className: "text-neutral-300 text-[20px]" })}

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
