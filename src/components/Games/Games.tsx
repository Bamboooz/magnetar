import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { appWindow } from "@tauri-apps/api/window"
import { FaSteam } from "react-icons/fa";

import GameListView from "./GameList";
import { cn } from "../../utils/tw";

interface SteamGame {
    id: string;
    name: string;
    installed: string;
}

interface GamesViewProps {
    search: string;
    selectedPage: number;
    pageId: number;
}

const GamesView: React.FC<GamesViewProps> = ({ search, selectedPage, pageId }) => {
    const [games, setGames] = useState<SteamGame[]>([]);

    const executeCommand = async (command: string) => {
        await appWindow.hide();

        await invoke("execute_command", { command: command, requiresAdministrator: false })
            .catch(err => {
                console.error(err);
            });
    };

    const useSteamScheme = async (scheme: string) => {
        await appWindow.hide();
        
        await invoke("run_steam_scheme", { scheme: scheme })
            .catch(err => {
                console.error(err);
            });
    };
    
    const displayedGames = games.filter((game) => game.name.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        invoke("fetch_all_steam_games")
            .then(games => {
                setGames(games as SteamGame[]);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <>
            <div className={cn(selectedPage === pageId ? "w-full h-full flex flex-col items-center justify-start overflow-auto" : "hidden")}>
                <div className="w-full flex flex-col my-2 items-start justify-between">
                    <div onClick={() => useSteamScheme("steam://run")} className="w-full h-12 flex items-center justify-start pl-6 gap-6 hover:bg-item-hover">
                        <FaSteam className="text-neutral-300 text-[26px]" />

                        <div className="flex flex-col items-start justify-center">
                            <p className="text-[14px] font-semibold text-neutral-300">Open steam</p>
                            <p className="text-[12px] text-neutral-400 truncate">start steam://run</p>
                        </div>
                    </div>

                    <div onClick={() => executeCommand("taskkill /f /im steam.exe")} className="w-full h-12 flex items-center justify-start pl-6 gap-6 hover:bg-item-hover">
                        <FaSteam className="text-neutral-300 text-[26px]" />

                        <div className="flex flex-col items-start justify-center">
                            <p className="text-[14px] font-semibold text-neutral-300">Close steam</p>
                            <p className="text-[12px] text-neutral-400 truncate">taskkill /f /im steam.exe</p>
                        </div>
                    </div>
                </div>
                
                <GameListView title="Installed" games={displayedGames.filter((game) => game.installed === "1")} />
                <GameListView title="Not installed" games={displayedGames.filter((game) => game.installed === "0")} />
            </div>
        </>
    );
};

export type { SteamGame };
export default GamesView;
