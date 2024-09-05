import React, { useState } from "react";
import { invoke } from "@tauri-apps/api";

import PageDisplay from "../PageDisplay";
import Expander from "../Expander";
import Game from "./GameItem";
import GameLaunchers from "./GameLaunchers";
import { Page } from "../../enums/page";
import { useMount } from "../../hooks/useMount";

type Game = {
  id: string;
  name: string;
  installed: boolean;
};

interface GamesProps {
  page: Page;
  search: string;
}

const Games: React.FC<GamesProps> = ({ page, search }) => {
  const [games, setGames] = useState<Game[]>([]);

  useMount(async () => {
    await invoke("fetch_steam_games")
      .then((games) => setGames(games as Game[]))
      .catch((error) => console.error(error));
  });

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  const installedGames = filteredGames.filter((game) => game.installed);
  const notInstalledGames = filteredGames.filter((game) => !game.installed);

  return (
    <PageDisplay id={Page.GAMES} page={page}>
      <GameLaunchers />
      {filteredGames.length !== 0 ? (
        <>
          {installedGames.length !== 0 && (
            <Expander label={"Installed"}>
              {installedGames.map((game) => (
                <Game key={game.id} game={game} />
              ))}
            </Expander>
          )}
          {notInstalledGames.length !== 0 && (
            <Expander label={"Not installed"}>
              {notInstalledGames.map((game) => (
                <Game key={game.id} game={game} />
              ))}
            </Expander>
          )}
        </>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <p className="text-neutral-300 text-2xl font-medium">
            No games found
          </p>
        </div>
      )}
    </PageDisplay>
  );
};

export type { Game };
export default Games;
