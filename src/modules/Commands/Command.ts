import { readTextFile } from "@tauri-apps/api/fs";
import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";

interface Command {
    title: string;
    command: string;
    admin: boolean;
    isPowershell: boolean;
    execute: () => Promise<void>;
}

type Commands = { [category: string]: Command[] };

class TerminalCommand implements Command {
    public isPowershell: boolean;

    constructor (public title: string, public command: string, public admin: boolean = false) {
        this.isPowershell = this.command.includes("powershell");
    }

    public static async loadCommands(): Promise<Commands> {
        const appData = await invoke("get_magnetar_path");

        let commandsJson = await readTextFile(`${appData}/commands/commands.json`);

        let commands = Object.fromEntries(
            Object.entries(JSON.parse(commandsJson) as Commands)
                .map(([key, commands]) => [key, commands.map(command => new TerminalCommand(
                    command.title, command.command, command.admin
                ))]
            )
        );

        return commands;
    }

    public async execute() {
        await appWindow.hide();

        await invoke("execute_command", { command: this.command, admin: this.admin });
    }
}

export type { Command, Commands };
export { TerminalCommand };
