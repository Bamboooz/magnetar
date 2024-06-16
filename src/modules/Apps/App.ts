import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";

interface Application {
    path: string;
    name: string;
    iconPath: string;
}

class App implements Application {
    constructor(public path: string, public name: string, public iconPath: string) {}

    public async open() {
        await appWindow.hide();

        await invoke("run_pe", { pePath: this.path });
    }

    public serialize(): Application {
        return {
            "path": this.path,
            "name": this.name,
            "iconPath": this.iconPath,
        };
    }
}

export type { Application };
export { App };
