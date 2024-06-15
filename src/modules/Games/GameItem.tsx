import React, { useState } from "react";

import { SteamGame } from "./Game";
import GameContext from "./GameContext";
import Item from "../../components/Item";

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

    const title = game.installed === "0" ? `Install ${game.name}` : `Play ${game.name}`;

    const handleContextMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const { pageX, pageY } = e;
        setContextMenu({ show: true, x: pageX, y: pageY });
    };

    const contextMenuClose = () => setContextMenu(initialContextMenu);

    return (
        <>
            {valid &&
                <Item onClick={() => game.run()} title={title} onContextMenu={handleContextMenu} className="gap-3">
                    <img src={game.gameImageUrl} onError={() => setValid(false)} className="h-[44px] rounded-sm" />

                    <div className="flex flex-col items-start justify-center">
                        <p className="text-[14px] font-bold text-neutral-300">{game.name}</p>

                        <p className="text-[11px] text-neutral-400">{game.runGameIdScheme}</p>
                    </div>

                    {game.installed === "0" &&
                        <div className="absolute top-0 left-0 w-full h-full z-30 bg-primary bg-opacity-60 group-hover:-z-10 group-hover:bg-transparent" />
                    }

                    {contextMenu.show &&
                        <GameContext x={contextMenu.x} y={contextMenu.y} closeContextMenu={contextMenuClose} game={game} />
                    }
                </Item>
            }
        </>
    );
};

export default SteamGameItem;
