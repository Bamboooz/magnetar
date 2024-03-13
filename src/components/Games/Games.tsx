import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import SteamGameItem, { SteamGame } from "./Game";
import { cn } from "../../utils/tw";

interface GamesViewProps {
    search: string;
    selectedPage: number;
    pageId: number;
}

const GamesView: React.FC<GamesViewProps> = ({ search, selectedPage, pageId }) => {
    const [games, setGames] = useState<SteamGame[]>([]);

    const displayedGames = games.filter((game) => game.name.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        invoke("get_installed_steam_games")
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
                {displayedGames.length > 0 ?
                    displayedGames.map((game) => (
                        <SteamGameItem key={games.indexOf(game)} id={game.id} name={game.name} installed={game.installed} />
                    ))
                    : <p className="text-neutral-300 text-[18px] font-semibold">No games found.</p>
                }
            </div>
        </>
    );
};

export default GamesView;
