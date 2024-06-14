import React, { useEffect, useState } from "react";

import GameList from "./GameList";
import GameLaunchers from "./GameLaunchers";
import { cn } from "../../utils/cn";
import { SteamGame } from "./Game";
import { SteamLauncher } from "./GameLauncher";

interface GamesViewProps {
    search: string;
    selectedPage: number;
    pageId: number;
}

const GamesView: React.FC<GamesViewProps> = ({ search, selectedPage, pageId }) => {
    const [games, setGames] = useState<SteamGame[]>([]);

    const displayedGames = games.filter((game) => game.name.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        const steamLauncher = new SteamLauncher();
    
        const fetchGames = async () => {
            const loadedGames = await steamLauncher.fetchGames();
            setGames(loadedGames);
        };
    
        fetchGames();
    }, []);
    

    return (
        <>
            <div className={cn(selectedPage === pageId ? "w-full h-full flex flex-col items-center justify-start overflow-auto" : "hidden")}>
                <GameLaunchers />
                
                <GameList title="Installed" games={displayedGames.filter((game) => game.installed === "1")} />
                <GameList title="Not installed" games={displayedGames.filter((game) => game.installed === "0")} />
            </div>
        </>
    );
};

export default GamesView;
