import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

import SteamGameItem from "./Game";
import { SteamGame } from "./Games";
import { cn } from "../../utils/tw";

interface GameListViewProps {
    title: string;
    games: SteamGame[];
}

const GameListView: React.FC<GameListViewProps> = ({ title, games }) => {
    const [opened, setOpened] = useState<boolean>(true);

    return (
        <>
            {games.length > 0 &&
                <div className="w-full flex flex-col items-center justify-start gap-1">
                    <button onClick={() => setOpened(!opened)} className="w-full h-8 flex items-center justify-start px-6 gap-2">
                        <IoIosArrowForward className={cn("text-neutral-400 text-[14px] transition-all duration-800", opened ? "rotate-90" : "")} />
                        <p className="text-neutral-400 text-[14px]">{title}</p>
                    </button>
                    
                    <div className={cn("w-full flex flex-col items-center justify-start transition-all overflow-hidden ease-in-out duration-800", opened ? "h-auto mb-4" : "h-0 mb-0")}>
                        {games.map((game, index) => (
                            <SteamGameItem key={index} id={game.id} name={game.name} installed={game.installed} />
                        ))}
                    </div>
                </div>
            }
        </>
    );
};

export default GameListView;
