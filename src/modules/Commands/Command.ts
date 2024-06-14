import { readTextFile } from "@tauri-apps/api/fs";
import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";

import { Commands } from "../../types/commands";

type CommandsJson = { [category: string]: { title: string, command: string, admin: boolean }[] };

interface Command {
    title: string;
    command: string;
    admin: boolean;
}

class TerminalCommand implements Command {
    constructor (public title: string, public command: string, public admin: boolean = false) {}

    public static async loadCommands(): Promise<Commands> {
        let commands: Commands = {};

        const appData = await invoke("get_magnetar_path");
        
        await readTextFile(`${appData}/commands/commands.json`)
            .then((foundCommands) => {
                const commandsJson = JSON.parse(foundCommands) as CommandsJson;

                commands = Object.fromEntries(
                    Object.entries(commandsJson)
                        .map(([key, commands]) => [key, commands.map(command => new TerminalCommand(
                            command.title, command.command, command.admin
                        ))]
                    )
                );
            });

        return commands;
    }

    public isPowershell(): boolean {
        return this.command.includes("powershell");
    }

    public async execute() {
        await appWindow.hide();

        await invoke("execute_command", { command: this.command, admin: this.admin });
    }
}

export { TerminalCommand };
