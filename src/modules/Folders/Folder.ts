import { open } from "@tauri-apps/api/dialog";
import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";

// TODO: change the name of this interface, currently got no idea how to name it better
interface IFolder {
    path: string;
    name: string;
    open: () => void;
}

class Folder implements IFolder {
    public name: string;

    constructor(public path: string) {
        this.name = this.path.replace(/\\/g, "/").replace(/\/+$/, "").split("/").pop() || "";
    }

    public static async add(): Promise<Folder> {
        const path = await open({ title: "Select a folder", directory: true, multiple: false });

        await appWindow.show();
        await appWindow.setFocus();

        return new Folder(path as string);
    }

    public async open() {
        await invoke("explorer_open", { path: this.path });
    }
}

export { Folder };
