import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { readTextFile } from "@tauri-apps/api/fs";

import CommandListView from "./CommandList";
import { cn } from "../../utils/tw";

type CommandListItem = { [command: string]: { title: string, requiresAdministrator: boolean } };
type CommandList = { [name: string]: CommandListItem };

interface CommandsViewProps {
    search: string;
    selectedPage: number;
    pageId: number;
}

const CommandsView: React.FC<CommandsViewProps> = ({ search, selectedPage, pageId }) => {
    const [commandsJson, setCommandsJson] = useState<CommandList>({});

    const displayedLists = Object.fromEntries(Object.entries(commandsJson).filter(([_, commands]) => Object.values(commands).some(command => command.title.toLowerCase().includes(search.toLowerCase()))));

    useEffect(() => {
        const getCommandsJsonPath = async () => {
            const appData = await invoke("get_magnetar_path");
            const commands = await readTextFile(`${appData}/commands/commands.json`);
            setCommandsJson(JSON.parse(commands));
        };

        getCommandsJsonPath();
    }, []);

    return (
        <>
            <div className={cn(selectedPage === pageId ? "flex w-full h-full flex-col items-center overflow-auto" : "hidden", Object.keys(displayedLists).length > 0 ? "justify-start" : "justify-center")}>
                {Object.keys(displayedLists).length > 0 ?
                    Object.keys(displayedLists).map((key, index) => (
                        <CommandListView key={index} title={key} search={search} commands={commandsJson[key]} />
                    ))
                    : <p className="text-neutral-300 text-[18px] font-semibold">No commands found.</p>
                }
            </div>
        </>
    );
};

export type { CommandListItem };
export default CommandsView;
