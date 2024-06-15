import React, { useEffect, useState } from "react";

import GameList from "./GameList";
import GameLaunchers from "./GameLaunchers";
import { cn } from "../../utils/cn";
import { SteamGame } from "./Game";
import { SteamLauncher } from "./GameLauncher";
import { RootState } from "../../store";
import { Module } from "../Module";
import { useSelector } from "react-redux";

interface GamesModuleProps {
    module: Module;
}

const GamesModule: React.FC<GamesModuleProps> = ({ module }) => {
    const [games, setGames] = useState<SteamGame[]>([]);

    const page = useSelector((state: RootState) => state.page);
    const search = useSelector((state: RootState) => state.search);

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
            <GameLaunchers />
                
            <GameList title="Installed" games={displayedGames.filter((game) => game.installed === "1")} />
            <GameList title="Not installed" games={displayedGames.filter((game) => game.installed === "0")} />
        </>
    );
};

export default GamesModule;
