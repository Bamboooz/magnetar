import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import { SteamGame } from "./Game";
import { cn } from "../../utils/tw";
import GameListView from "./GameList";

type GameListGroup = {
    id: string;
    name: string;
    installed: string;
}[];

interface GamesViewProps {
    search: string;
    selectedPage: number;
    pageId: number;
}

const GamesView: React.FC<GamesViewProps> = ({ search, selectedPage, pageId }) => {
    const [requestCounter, setRequestCounter] = useState<number>(0);
    const [games, setGames] = useState<SteamGame[]>([]);

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
            <div className={cn(selectedPage === pageId ? "w-full h-full flex flex-col items-center overflow-auto" : "hidden", displayedGames.length > 0 ? "justify-start" : "justify-center")}>
                {displayedGames.length > 0
                    ? <>
                        <GameListView title="Installed" games={displayedGames.filter((game) => game.installed === "1")} requestCounter={requestCounter} setRequestCounter={setRequestCounter} />
                        <GameListView title="Not installed" games={displayedGames.filter((game) => game.installed === "0")} requestCounter={requestCounter} setRequestCounter={setRequestCounter} />
                    </>
                    : <p className="text-neutral-300 text-[18px] font-semibold">No games found.</p>
                }
            </div>
        </>
    );
};

export type { GameListGroup };
export default GamesView;
