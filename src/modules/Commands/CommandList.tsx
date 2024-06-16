import React from "react";

import CommandItem from "./CommandItem";
import Expander from "../../components/Expander";
import { Command } from "./Command";

interface CommandListProps {
    title: string;
    search: string;
    commands: Command[];
}

const CommandList: React.FC<CommandListProps> = ({ title, search, commands }) => {
    const displayedItems = commands.filter(command => command.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            {displayedItems.length > 0 &&
                <Expander title={title}>
                    {displayedItems.map((command, index) => (
                        <CommandItem key={index} command={command} />
                    ))}
                </Expander>
            }
        </>
    );
};

export default CommandList;
