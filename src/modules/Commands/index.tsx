import React, { useEffect, useState } from "react";

import CommandList from "./CommandList";
import { cn } from "../../utils/cn";
import { TerminalCommand } from "./Command";
import { Commands } from "../../types/commands";
import { RootState } from "../../store";
import { Module } from "../Module";
import { useSelector } from "react-redux";

interface CommandsModuleProps {
    module: Module;
}

const CommandsModule: React.FC<CommandsModuleProps> = ({ module }) => {
    const [commands, setCommands] = useState<Commands>({});

    const page = useSelector((state: RootState) => state.page);
    const search = useSelector((state: RootState) => state.search);

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
            {Object.keys(displayedCategories).length > 0
                ? Object.keys(displayedCategories).map((category, index) => (
                    <CommandList key={index} title={category} search={search} commands={commands[category]} />
                ))
                : <p className="text-neutral-300 text-[18px] font-semibold">No commands found.</p>
            }
        </>
    );
};

export default CommandsModule;
