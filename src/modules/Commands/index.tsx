import React, { useEffect, useState } from "react";

import CommandList from "./CommandList";
import { cn } from "../../utils/cn";
import { TerminalCommand } from "./Command";
import { Commands } from "../../types/commands";
import { Module } from "../Module";
import store from "../../store";

interface CommandsModuleProps {
    module: Module;
}

const CommandsModule: React.FC<CommandsModuleProps> = ({ module }) => {
    const [commands, setCommands] = useState<Commands>({});

    const search = store.getState().search;
    const page = store.getState().page;


    const displayedCategories: Commands = Object.fromEntries(
        Object.entries(commands)
            .filter(([_, terminalCommands]) =>
                terminalCommands.some(command =>
                    command.title.toLowerCase().includes(search.toLowerCase())
                )
            )
    );

    useEffect(() => {
        const loadCommands = async () => {
            const loadedCommands = await TerminalCommand.loadCommands();
            setCommands(loadedCommands);
        }

        loadCommands();
    }, []);

    return (
        <>
            <div className={cn(page === module.id ? "flex w-full h-full flex-col items-center overflow-auto" : "hidden", Object.keys(displayedCategories).length > 0 ? "justify-start" : "justify-center")}>
                {Object.keys(displayedCategories).length > 0
                    ? Object.keys(displayedCategories).map((category, index) => (
                        <CommandList key={index} title={category} search={search} commands={commands[category]} />
                    ))
                    : <p className="text-neutral-300 text-[18px] font-semibold">No commands found.</p>
                }
            </div>
        </>
    );
};

export default CommandsModule;
