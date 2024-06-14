import React, { useState } from "react";

import { SteamGame } from "./Game";
import GameContext from "./GameContext";

const initialContextMenu = {
    show: false,
    x: 0,
    y: 0,
}

interface SteamGameItemProps {
    game: SteamGame;
}

const SteamGameItem: React.FC<SteamGameItemProps> = ({ game }) => {
    const [valid, setValid] = useState<boolean>(true);
    const [contextMenu, setContextMenu] = useState(initialContextMenu);

    const handleContextMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const { pageX, pageY } = e;
        setContextMenu({ show: true, x: pageX, y: pageY });
    };

    const contextMenuClose = () => setContextMenu(initialContextMenu);

    return (
        <>
            {valid &&
                <button onContextMenu={handleContextMenu} title={game.installed === "0" ? `Install ${game.name}` : `Play ${game.name}`} className="group relative w-full flex shrink-0 pl-6 pr-4 py-1 gap-3 items-center justify-between hover:bg-item-hover">
                    <div onClick={game.run} className="flex items-center justify-center gap-3">
                        <img src={game.gameImageUrl} onError={() => setValid(false)} className="h-[44px] rounded-sm" />

                        <div className="flex flex-col items-start justify-center">
                            <p className="text-[14px] font-bold text-neutral-300">{game.name}</p>

                            <p className="text-[11px] text-neutral-400">{game.runGameIdScheme}</p>
                        </div>
                    </div>

                    {game.installed === "0" &&
                        <div className="absolute top-0 left-0 w-full h-full z-30 bg-primary bg-opacity-60 group-hover:-z-10 group-hover:bg-transparent" />
                    }

                    {contextMenu.show &&
                        <GameContext x={contextMenu.x} y={contextMenu.y} closeContextMenu={contextMenuClose} game={game} />
                    }
                </button>
            }
        </>
    );
};

export default SteamGameItem;
