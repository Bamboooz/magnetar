import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-shell";
import Item from "../common/Item";
import { executeCommand } from "../../utils/cmd";
import { useMount } from "../../hooks/useMount";
import { Game } from "../../types";
import GameItemContext from "./GameItemContext";

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
  const [name, setName] = useState<string>(game.name);
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

  useMount(async () => {
    await invoke("trim", { input: game.name }).then((name) =>
      setName(name as string)
    );
  });

  return (
    <>
      {valid && (
        <>
          <Item
            onClick={openGame}
            onContextMenu={handleContextMenu}
            className="justify-start gap-3"
          >
            <img
              src={headerImage}
              onError={() => setValid(false)}
              className="h-[44px] rounded-sm"
            />

            <div className="flex flex-col items-start justify-center">
              <p className="text-md text-neutral-300">{name}</p>
              <p className="text-sm text-neutral-400">
                steam://rungameid/{game.id}
              </p>
            </div>

            {!game.installed && !context.visible && (
              <div className="absolute top-0 left-0 size-full z-30 bg-primary bg-opacity-60 group-hover:hidden" />
            )}
          </Item>

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
