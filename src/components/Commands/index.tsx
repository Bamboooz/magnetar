import React, { useState } from "react";
import { invoke } from "@tauri-apps/api";

import PageDisplay from "../PageDisplay";
import Expander from "../Expander";
import CommandItem from "./CommandItem";
import { Page } from "../../enums/page";
import { useMount } from "../../hooks/useMount";
import { CommandList } from "../../types/modules/commands";

interface HomeProps {
  page: Page;
  search: string;
}

const Commands: React.FC<HomeProps> = ({ page, search }) => {
  const [commands, setCommands] = useState<CommandList>({});

  useMount(async () => {
    await invoke("fetch_commands").then((commands) => {
      const commandsJson = JSON.parse(commands as string) as CommandList;
      setCommands(commandsJson);
    });
  });

  const filteredCommandGroups = Object.entries(commands)
    .map(([label, commands]) => ({
      label,
      commands: commands.filter((command) =>
        command.label.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((group) => group.commands.length > 0);

  return (
    <PageDisplay id={Page.COMMANDS} page={page} className="gap-3">
      {filteredCommandGroups.length !== 0 ? (
        filteredCommandGroups.map((group) => (
          <Expander label={group.label} key={group.label}>
            {group.commands.map((command) => (
              <CommandItem key={command.label} command={command} />
            ))}
          </Expander>
        ))
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <p className="text-neutral-300 text-2xl font-medium">
            No commands found
          </p>
        </div>
      )}
    </PageDisplay>
  );
};

export default Commands;
