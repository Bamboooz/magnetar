import React from "react";
import { LuBookOpen, LuPlay } from "react-icons/lu";

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
            <Context x={x} y={y} closeContextMenu={closeContextMenu} className="w-56 bg-primary shadow-2xl rounded-sm border-solid border-[1px] border-border">
                <button title="Play" onClick={() => game.run()} className="h-10 w-full px-4 gap-2 flex items-center justify-start text-[12px] text-text-secondary hover:text-text-primary">
                    <LuPlay />
                    
                    <p>Play</p>
                </button>
                
                <button title="Open game page" onClick={() => game.openGamePage()} className="h-10 w-full px-4 gap-2 flex items-center justify-start text-[12px] text-text-secondary hover:text-text-primary">
                    <LuBookOpen />
                    
                    <p>Open game page</p>
                </button>
            </Context>
        </>
    );
};

export default GameContext;
