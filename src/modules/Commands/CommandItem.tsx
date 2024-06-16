import React from "react";
import { LuTerminal } from "react-icons/lu";
import { VscTerminalPowershell } from "react-icons/vsc";

import Item from "../../components/Item";
import { trim } from "../../utils/string";
import { TerminalCommand } from "./Command";
import admin_icon from "../../assets/admin.png";

interface CommandItemProps {
    command: TerminalCommand;
}

const CommandItem: React.FC<CommandItemProps> = ({ command }) => {
    return (
        <>
            <Item title={command.command} onClick={() => command.execute()} className="justify-between">
                <div className="flex items-center justify-start gap-6 text-text-primary text-[20px]">
                    {command.isPowershell
                        ? <VscTerminalPowershell />
                        : <LuTerminal />
                    }

                    <div className="flex flex-col items-start justify-center">
                        <p className="text-[14px] font-semibold">{command.title}</p>

                        <p className="text-[12px] text-text-secondary">{trim(command.command, 50)}</p>
                    </div>
                </div>

                {command.admin &&
                    <img src={admin_icon} className="h-4 w-4" />
                }
            </Item>
        </>
    );
};

export default CommandItem;
