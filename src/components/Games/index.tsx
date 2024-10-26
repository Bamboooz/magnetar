import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import PageDisplay from "../PageDisplay";
import Expander from "../common/Expander";
import { Page } from "../../enums/page";
import { useMount } from "../../hooks/useMount";
import { Game } from "../../types/modules/games";
import GameItem from "./GameItem";
import GameLauncher from "./GameLauncher";
import { executeCommand } from "../../utils/cmd";

interface GamesProps {
  page: Page;
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
    await executeCommand("taskkill /f /im steam.exe", false);

  useMount(async () => {
    await invoke("fetch_steam_games").then((games) =>
      setGames(games as Game[])
    );
  });

  return (
    <PageDisplay id={Page.GAMES} page={page} className="gap-3">
      <Expander label="Launchers">
        <GameLauncher
          title="Open steam"
          command="start steam://run"
          onClick={openSteam}
        />
        <GameLauncher
          title="Close steam"
          command="taskkill /f /im steam.exe"
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
        <div className="w-full h-full flex flex-col items-center justify-center">
          <p className="text-neutral-300 text-2xl font-medium">
            No games found
          </p>
        </div>
      )}
    </PageDisplay>
  );
};

export default Games;
