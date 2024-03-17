import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window";
import { FaSteam } from "react-icons/fa";

import { SteamGame } from "./Games";

const SteamGameItem: React.FC<SteamGame> = ({ id, name, installed }) => {
    const [valid, setValid] = useState<boolean>(true);

    const gameImageUrl = `https://cdn.akamai.steamstatic.com/steam/apps/${id}/header.jpg`;
    const runGameIdScheme = `steam://rungameid/${id}`;
    const storeScheme = `steam://store/${id}`;

    const useSteamScheme = async (scheme: string) => {
        await appWindow.hide();
        
        await invoke("run_steam_scheme", { scheme: scheme })
            .catch(err => {
                console.error(err);
            });
    };

    const runSteamGame = () => useSteamScheme(runGameIdScheme);
    const openSteamGamePage = () => useSteamScheme(storeScheme);

    return (
        <>
            {valid &&
                <div title={installed === "0" ? `Install ${name}` : `Play ${name}`} className="group relative w-full flex shrink-0 pl-6 pr-4 py-1 gap-3 items-center justify-between hover:bg-item-hover">
                    {/* If not installed running steam scheme to open a game runs the installator */}
                    <div onClick={runSteamGame} className="flex items-center justify-center gap-3">
                        <img src={gameImageUrl} onError={() => setValid(false)} className="h-[44px] rounded-sm" />

                        <div className="flex flex-col items-start justify-center">
                            <p className="text-[14px] font-bold text-neutral-300">{name}</p>
                            <p className="text-[11px] text-neutral-400">{runGameIdScheme}</p>
                        </div>
                    </div>

                    <button title="Open game page" onClick={openSteamGamePage} className="hidden group-hover:block group-hover:p-1 group-hover:z-50">
                        <FaSteam className="text-neutral-300 text-[16px]" />
                    </button>

                    {installed === "0" &&
                        <div className="absolute top-0 left-0 w-full h-full z-30 bg-primary bg-opacity-60 group-hover:-z-10 group-hover:bg-transparent" />
                    }
                </div>
            }
        </>
    );
};

export default SteamGameItem;
