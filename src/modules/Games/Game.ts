import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";

interface Game {
    id: string;
    name: string;
    installed: string;
    gameImageUrl: string;
    run: () => void;
    openGamePage: () => void;
}

class SteamGame implements Game {
    public gameImageUrl: string;
    public runGameIdScheme: string;
    public openGamePageScheme: string;

    constructor(public id: string, public name: string, public installed: string) {
        this.gameImageUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${this.id}/header.jpg`;

        this.runGameIdScheme = `steam://rungameid/${this.id}`;
        this.openGamePageScheme = `steam://store/${this.id}`;
    }

    private async runSteamScheme(scheme: string) {
        await appWindow.hide();
        
        await invoke("run_steam_scheme", { scheme: scheme });
    }

    public async run() {
        await this.runSteamScheme(this.runGameIdScheme);
    }

    public async openGamePage() {
        await this.runSteamScheme(this.openGamePageScheme);
    }
}

export type { Game };
export { SteamGame };
