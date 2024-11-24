import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import Expander from "../common/Expander";
import CommandItem from "./CommandItem";
import { CommandList, PageType } from "../../types";
import Page from "../common/Page";

interface HomeProps {
  page: PageType;
  search: string;
}

export default function Commands({ page, search }: HomeProps) {
  const [commands, setCommands] = useState<CommandList>({});

  const filteredCommandGroups = Object.entries(commands)
    .map(([label, commands]) => ({
      label,
      commands: commands.filter((command) =>
        command.label.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((group) => group.commands.length > 0);

  useEffect(() => {
    invoke("fetch_commands").then((commands) => {
      const commandsJson = JSON.parse(commands as string) as CommandList;
      setCommands(commandsJson);
    });
  }, []);

  return (
    <Page target={PageType.COMMANDS} current={page} className="gap-3">
      {filteredCommandGroups.length !== 0 ? (
        filteredCommandGroups.map((group) => (
          <Expander label={group.label} key={group.label}>
            {group.commands.map((command) => (
              <CommandItem key={command.label} command={command} />
            ))}
          </Expander>
        ))
      ) : (
        <div className="size-full flex flex-col items-center justify-center">
          <p className=" text-2xl font-medium">No commands found</p>
        </div>
      )}
    </Page>
  );
}
