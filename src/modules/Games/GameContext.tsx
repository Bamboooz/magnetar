import React from "react";
import { LuTrash2 } from "react-icons/lu";

import Context from "../../components/Context";
import { SteamGame } from "./Game";

interface GameContextProps {
    x: number;
    y: number;
    closeContextMenu: () => void;
    game: SteamGame;
}

const GameContext: React.FC<GameContextProps> = ({ x, y, closeContextMenu, game }) => {
    return (
        <>
            <Context x={x} y={y} closeContextMenu={closeContextMenu} className="w-56 bg-primary shadow-2xl rounded-md border-solid border-[1px] border-border">
                <button title="Remove app" onClick={game.openGamePage} className="h-10 w-full px-4 gap-2 flex items-center justify-start text-[12px] text-red-500 hover:text-red-400">
                    <LuTrash2 />
                    
                    <p>Open game page</p>
                </button>
            </Context>
        </>
    );
};

export default GameContext;
