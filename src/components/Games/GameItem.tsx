import React, { useState } from "react";
import { open } from "@tauri-apps/plugin-shell";
import { executeCommand } from "../../utils/cmd";
import { Game } from "../../types";
import GameItemContext from "./GameItemContext";
import Item from "../common/Item";

const initialContextMenu = {
  x: 0,
  y: 0,
  visible: false,
};

interface GameItemProps {
  game: Game;
}

const GameItem: React.FC<GameItemProps> = ({ game }) => {
  const [valid, setValid] = useState<boolean>(true);
  const [context, setContext] = useState(initialContextMenu);

  const headerImage = `https://cdn.akamai.steamstatic.com/steam/apps/${game.id}/header.jpg`;

  const closeContextMenu = () => setContext(initialContextMenu);

  const handleContextMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const x = e.clientX;
    const y = e.clientY;

    setContext({ x, y, visible: true });
  };

  const openGame = async () =>
    await executeCommand(`start steam://rungameid/${game.id}`, false);
  const openGamePage = async () =>
    await open(`https://store.steampowered.com/app/${game.id}`);

  return (
    <>
      {valid && (
        <>
          <Item
            icon={<img src={headerImage} onError={() => setValid(false)} className="h-[44px] rounded-sm" />}
            title={game.name}
            description={`steam://rungameid/${game.id}`}
            onClick={openGame}
            onContextMenu={handleContextMenu}
          />

          {context.visible && (
            <GameItemContext
              x={context.x}
              y={context.y}
              closeContextMenu={closeContextMenu}
              installed={game.installed}
              playGame={openGame}
              openGamePage={openGamePage}
            />
          )}
        </>
      )}
    </>
  );
};

export default GameItem;
