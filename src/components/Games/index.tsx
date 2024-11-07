import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import Page from "../common/Page";
import Expander from "../common/Expander";
import { PageType, Game } from "../../types";
import { useMount } from "../../hooks/useMount";
import GameItem from "./GameItem";
import GameLauncher from "./GameLauncher";
import { executeCommand } from "../../utils/cmd";

interface GamesProps {
  page: PageType;
  search: string;
}

const Games: React.FC<GamesProps> = ({ page, search }) => {
  const [games, setGames] = useState<Game[]>([]);

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  const installedGames = filteredGames.filter((game) => game.installed);
  const notInstalledGames = filteredGames.filter((game) => !game.installed);

  const openSteam = async () =>
    await executeCommand("start steam://run", false);
  const closeSteam = async () =>
    await executeCommand("start steam://exit", false);

  useMount(async () => {
    await invoke("fetch_steam_games").then((games) =>
      setGames(games as Game[])
    );
  });

  return (
    <Page id={PageType.GAMES} page={page} className="gap-3">
      <Expander label="Launchers">
        <GameLauncher
          title="Open Steam"
          command="start steam://run"
          onClick={openSteam}
        />
        <GameLauncher
          title="Close Steam"
          command="start steam://exit"
          onClick={closeSteam}
        />
      </Expander>

      {filteredGames.length !== 0 ? (
        <>
          {installedGames.length !== 0 && (
            <Expander label="Installed">
              {installedGames.map((game) => (
                <GameItem key={game.id} game={game} />
              ))}
            </Expander>
          )}
          {notInstalledGames.length !== 0 && (
            <Expander label="Not installed">
              {notInstalledGames.map((game) => (
                <GameItem key={game.id} game={game} />
              ))}
            </Expander>
          )}
        </>
      ) : (
        <div className="size-full flex flex-col items-center justify-center">
          <p className="text-neutral-300 text-2xl font-medium">
            No games found
          </p>
        </div>
      )}
    </Page>
  );
};

export default Games;
