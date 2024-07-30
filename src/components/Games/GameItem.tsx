import React, { useState } from "react";

import Item from "../Item";
import { trim } from "../../utils/trim";
import { executeCommand } from "../../utils/cmd";
import { Game } from ".";

interface GameItemProps {
  game: Game;
}

const GameItem: React.FC<GameItemProps> = ({ game }) => {
  const [valid, setValid] = useState<boolean>(true);

  const title = game.installed ? `Play ${name}` : `Install ${name}`;
  const headerImage = `https://cdn.akamai.steamstatic.com/steam/apps/${game.id}/header.jpg`;

  const openGame = async () =>
    executeCommand(`start steam://rungameid/${game.id}`, false);

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
            <p className="text-md text-neutral-300">{trim(game.name)}</p>
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
