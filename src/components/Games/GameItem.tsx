import React, { useState } from "react";
import { appWindow } from "@tauri-apps/api/window";

import Item from "../Item";
import { executeCommand } from "../../utils/cmd";
import { invoke } from "@tauri-apps/api";
import { useMount } from "../../hooks/useMount";
import { Game } from "../../types/modules/games";

interface GameItemProps {
  game: Game;
}

const GameItem: React.FC<GameItemProps> = ({ game }) => {
  const [valid, setValid] = useState<boolean>(true);
  const [name, setName] = useState<string>(game.name);

  const openGame = async () => {
    appWindow.hide();
    executeCommand(`start steam://rungameid/${game.id}`, false);
  };

  const title = game.installed ? `Play ${name}` : `Install ${name}`;
  const headerImage = `https://cdn.akamai.steamstatic.com/steam/apps/${game.id}/header.jpg`;

  useMount(async () => {
    await invoke("trim", { input: game.name }).then((name) =>
      setName(name as string)
    );
  });

  return (
    <>
      {valid && (
        <Item label={title} onClick={openGame} className="justify-start gap-3">
          <img
            src={headerImage}
            onError={() => setValid(false)}
            className="h-[44px] rounded-sm"
          />

          <div className="flex flex-col items-start justify-center">
            <p className="text-md text-neutral-300">{name}</p>
            <p className="text-sm text-neutral-400">{`steam://rungameid/${game.id}`}</p>
          </div>

          {!game.installed && (
            <div className="absolute top-0 left-0 w-full h-full z-30 bg-primary bg-opacity-60 group-hover:hidden" />
          )}
        </Item>
      )}
    </>
  );
};

export default GameItem;
