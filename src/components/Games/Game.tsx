import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";
import { FaSteam } from "react-icons/fa";

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
    const [valid, setValid] = useState<boolean>(false);

    const useSteamScheme = async (mode: string) => {
        await appWindow.hide();
        
        await invoke(mode, { appId: id })
            .catch(err => {
                console.error(err);
            });
    };

    useEffect(() => {
        const localSteamIcon = localStorage.getItem(id);

        if (localSteamIcon) {
            setIconPath(localSteamIcon);
            setValid(true);
        } else {
            setRequestCounter(prevCounter => prevCounter + 1);
            const delay = requestCounter * 10000;
 
            setTimeout(() => {
                invoke("fetch_steam_game_data", { appId: id })
                    .then(header_image => {
                        if ((header_image as string).replaceAll(" ", "") !== "") {
                            setIconPath(header_image as string);
                            localStorage.setItem(id, header_image as string);
                            setValid(true);
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }, delay);
        }
    }, []);

    return (
        <>
            {valid &&
                <div className="w-full flex shrink-0 pl-6 pr-4 py-1 gap-3 items-center justify-between hover:bg-item-hover">
                    <div title={name} onClick={() => useSteamScheme("run_steam_game")} className="group flex items-center justify-center gap-3">
                        <img src={iconPath} className="h-[44px] rounded-sm" alt="icon" />

                        <div className="flex flex-col items-start justify-center">
                            <p className="text-[14px] font-bold text-neutral-300">{name}</p>
                            <p className="text-[11px] text-neutral-400">{`steam://rungameid/${id}`}</p>
                        </div>
                    </div>

                    <button onClick={() => useSteamScheme("open_steam_game_page")} className="p-1 z-20">
                        <FaSteam className="text-neutral-300 text-[20px]" />
                    </button>
                </div>
            }
        </>
    );
};

export type { SteamGame };
export default SteamGameItem;
