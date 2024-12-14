import React, { useState } from "react";
import { Game } from "../../types";
import { invoke } from "../../util";
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

export default function GameItem({ game }: GameItemProps) {
  const [valid, setValid] = useState<boolean>(true);
  const [context, setContext] = useState(initialContextMenu);

  const closeContextMenu = () => setContext(initialContextMenu);

  const handleContextMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const x = e.clientX;
    const y = e.clientY;

    setContext({ x, y, visible: true });
  };

  const runGame = async () => await invoke("run_game", { id: game.id });
  const openSteamPage = async () => await invoke("open_steam_page", { id: game.id });
  const uninstallGame = async () => await invoke("uninstall_game", { id: game.id });

  return (
    <>
      {valid && (
        <>
          <Item
            icon={
              <img
                src={game.banner}
                onError={() => setValid(false)}
                className="h-[44px] rounded-sm"
              />
            }
            title={game.name}
            description={`steam.exe -silent -applaunch ${game.id}`}
            onClick={runGame}
            onContextMenu={handleContextMenu}
          />

          {context.visible && (
            <GameItemContext
              x={context.x}
              y={context.y}
              closeContextMenu={closeContextMenu}
              installed={game.installed}
              runGame={runGame}
              openSteamPage={openSteamPage}
              uninstallGame={uninstallGame}
            />
          )}
        </>
      )}
    </>
  );
}
