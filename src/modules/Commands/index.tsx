import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CommandList from "./CommandList";
import { TerminalCommand } from "./Command";
import { Commands } from "./Command";
import { RootState } from "../../store";

const CommandsModule: React.FC = () => {
    const [commands, setCommands] = useState<Commands>({});

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
                : <div className="w-full h-full flex items-center justify-center">
                    <p className="text-text-primary text-[18px] font-semibold">No commands found.</p>
                </div>
            }
        </>
    );
};

export default CommandsModule;
