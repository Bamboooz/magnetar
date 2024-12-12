import React, { useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-shell";
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

  const openGame = async () => {
    await invoke<void>("run_steam_app", { id: game.id });

    const appWindow = getCurrentWindow();
    await appWindow.hide();
  };

  const openGamePage = async () =>
    await open(`https://store.steampowered.com/app/${game.id}`);

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
}
