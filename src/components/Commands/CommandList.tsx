import React, { useState } from "react";
import { LuTerminal } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";

import CommandItem from "./CommandItem";
import { CommandListItem } from "./Commands";
import { cn } from "../../utils/tw";

interface CommandListViewProps {
    title: string;
    search: string;
    commands: CommandListItem;
}

const CommandListView: React.FC<CommandListViewProps> = ({ title, search, commands }) => {
    const [opened, setOpened] = useState<boolean>(true);

    const displayedItems = Object.keys(commands).filter((key) => commands[key].title.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            {displayedItems.length > 0 &&
                <div className="w-full flex flex-col items-center justify-start gap-1">
                    <button onClick={() => setOpened(!opened)} className="w-full h-8 flex items-center justify-start px-6 gap-2">
                        <IoIosArrowForward className={cn("text-neutral-400 text-[14px] transition-all duration-800", opened ? "rotate-90" : "")} />
                        <p className="text-neutral-400 text-[14px]">{title}</p>
                    </button>
                    
                    <div className={cn("w-full flex flex-col items-center justify-start transition-all overflow-hidden ease-in-out duration-800", opened ? "max-h-screen mb-4" : "max-h-0 mb-0")}>
                        {displayedItems.map((key, index) => (
                            <CommandItem key={index} requiresAdministrator={commands[key].requiresAdministrator} icon={<LuTerminal />} title={commands[key].title} command={key} />
                        ))}
                    </div>
                </div>
            }
        </>
    );
};

export default CommandListView;
