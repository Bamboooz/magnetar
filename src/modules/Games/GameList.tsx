import React from "react";

import SteamGameItem from "./GameItem";
import Expander from "../../components/Expander";
import { SteamGame } from "./Game";

interface GameListProps {
    title: string;
    games: SteamGame[];
}

const GameList: React.FC<GameListProps> = ({ title, games }) => {
    return (
        <>
            {games.length > 0 &&
                <Expander title={title}>
                    {games.map((game, index) => (
                        <SteamGameItem key={index} game={game} />
                    ))}
                </Expander>
            }
        </>
    );
};

export default GameList;
