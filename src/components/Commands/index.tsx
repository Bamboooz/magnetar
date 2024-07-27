import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";

import PageDisplay from "../PageDisplay";
import Expander from "../Expander";
import CommandItem from "./CommandItem";
import { Page } from "../../enums/page";

type Command = {
  label: string;
  command: string;
  admin: boolean;
};

type Commands = {
  [label: string]: Command[];
};

interface HomeProps {
  page: Page;
  search: string;
}

const Commands: React.FC<HomeProps> = ({ page, search }) => {
  const [commands, setCommands] = useState<Commands>({});

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const commandsString = (await invoke("get_commands_json")) as string;
        const commands = JSON.parse(commandsString) as Commands;
        setCommands(commands);
      } catch (error) {
        setCommands({}); // if the content is in the wrong format or some io error
      }
    };

    fetchCommands();
  }, []);

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

export type { Command };
export default Commands;
