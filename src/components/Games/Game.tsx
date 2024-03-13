import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";

interface SteamGame {
    id: string;
    name: string;
    installed: string;
    requestCounter: number;
    setRequestCounter: React.Dispatch<React.SetStateAction<number>>;
}

// installed is redundant in the frontend, only used in the backend but the data structure is shared
const SteamGameItem: React.FC<SteamGame> = ({ id, name, requestCounter, setRequestCounter }) => {
    const [iconPath, setIconPath] = useState<string>("");
    const [valid, setValid] = useState<boolean>(true);

    const startGame = async () => {
        await appWindow.hide();
        
        await invoke("run_steam_game", { appId: id })
            .catch(err => {
                console.error(err);
            });
    };

    useEffect(() => {
        const localSteamIcon = localStorage.getItem(id);

        if (localSteamIcon) {
            setIconPath(localSteamIcon);
        } else {
            setRequestCounter(prevCounter => prevCounter + 1);
            const delay = requestCounter * 10000;
 
            setTimeout(() => {
                invoke("fetch_steam_game_data", { appId: id })
                    .then(header_image => {
                        if (header_image) {
                            setIconPath(header_image as string);
                            localStorage.setItem(id, header_image as string);
                        } else {
                            setValid(false);
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        setValid(false);
                    });
            }, delay);
        }
    }, []);

    return (
        <>
            {valid &&
                <div title={name} onClick={startGame} className="w-full flex shrink-0 pl-6 pr-4 py-1 gap-3 items-center justify-start hover:bg-item-hover">
                    <img src={iconPath} className="h-[44px] rounded-sm" alt="icon" />

                    <div className="flex flex-col items-start justify-center">
                        <p className="text-[14px] font-bold text-neutral-300">{name}</p>
                        <p className="text-[11px] text-neutral-400">{`steam://rungameid/${id}`}</p>
                    </div>
                </div>
            }
        </>
    );
};

export type { SteamGame };
export default SteamGameItem;
