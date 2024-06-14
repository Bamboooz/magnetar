import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";

import { Game, SteamGame } from "./Game";

interface GameLauncher {
    name: string;
    openCommand: string;
    closeCommand: string;
    open: () => void;
    close: () => void;
    fetchGames: () => Promise<Game[]>;
}

class SteamLauncher implements GameLauncher {
    public name: string = "steam";
    public openCommand: string = "steam://run";
    public closeCommand: string = "taskkill /f /im steam.exe";

    private async runSteamScheme(scheme: string) {
        await appWindow.hide();
        
        await invoke("run_steam_scheme", { scheme: scheme });
    }

    private async executeCommand(command: string) {
        await appWindow.hide();

        await invoke("execute_command", { command: command, admin: false });
    }

    public async open() {
        this.runSteamScheme(this.openCommand);
    }

    public async close() {
        this.executeCommand(this.closeCommand);
    }

    public async fetchGames(): Promise<SteamGame[]> {
        try {
            type LoadedGames = { id: string, name: string, installed: string }[];

            const games = await invoke("fetch_all_steam_games") as LoadedGames;

            return games.map((game) => new SteamGame(game.id, game.name, game.installed));
        } catch (err) {
            return [];
        }
    }
}

export type { GameLauncher };
export { SteamLauncher };
