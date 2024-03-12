import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { fetch, ResponseType } from "@tauri-apps/api/http"
import { appWindow } from "@tauri-apps/api/window";

interface SteamGame {
    id: string;
    name: string;
    installed: string;
}

// installed is redundant in the frontend, only used in the backend but the data structure is shared
const SteamGameItem: React.FC<SteamGame> = ({ id, name }) => {
    const [iconPath, setIconPath] = useState<string>("");

    const runCommand = `start steam://rungameid/${id}`;

    const startGame = async () => {
        await appWindow.hide();
        
        await invoke("execute_command", { command: runCommand, displayCmd: false })
            .catch(err => {
                console.error(err);
            });
    };

    // maybe add some enchancement to save the urls to localStorage and only get them if not found.
    useEffect(() => {
        const getGameIcon = async () => {
            const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${id}`, {
                method: "GET",
                responseType: ResponseType.JSON,
            });

            if (response.status === 200) {
                type SteamResponseJson = { [key: string]: { success: boolean; data: { header_image: string } } };
                const data: SteamResponseJson = response.data as SteamResponseJson;
    
                if (data[id]?.success) {
                    setIconPath(data[id].data.header_image);
                }
            }
        };

        getGameIcon();
    }, []);

    return (
        <>
            <div title={name} onClick={startGame} className="w-full flex shrink-0 pl-6 pr-4 py-1 gap-3 items-center justify-start hover:bg-item-hover">
                <img src={iconPath} className="h-[44px] rounded-sm" alt="icon" />

                <div className="flex flex-col items-start justify-center">
                    <p className="text-[14px] font-bold text-neutral-300">{name}</p>
                    <p className="text-[11px] text-neutral-400">{runCommand.split(" ")[1]}</p>
                </div>
            </div>
        </>
    );
};

export type { SteamGame };
export default SteamGameItem;
