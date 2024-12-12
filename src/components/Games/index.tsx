import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { FaSteam } from "react-icons/fa";
import Expander from "../common/Expander";
import { Game, PageType } from "../../types";
import GameItem from "./GameItem";
import { exec } from "../../utils";
import Item from "../common/Item";
import Page from "../common/Page";

interface GamesProps {
  page: PageType;
  search: string;
}

export default function Games({ page, search }: GamesProps) {
  const [games, setGames] = useState<Game[]>([]);

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  const installedGames = filteredGames.filter((game) => game.installed);
  const notInstalledGames = filteredGames.filter((game) => !game.installed);

  const openSteam = async () => await exec("start steam://run", false);
  const closeSteam = async () => await exec("start steam://exit", false);

  useEffect(() => {
    invoke<Game[]>("fetch_steam_apps").then((games) => setGames(games));
  }, []);

  return (
    <Page target={PageType.GAMES} current={page} className="gap-3">
      <Expander label="Launchers">
        <Item
          icon={<FaSteam />}
          title="Open Steam"
          description="start steam://run"
          onClick={openSteam}
        />
        <Item
          icon={<FaSteam />}
          title="Close Steam"
          description="start steam://exit"
          onClick={closeSteam}
        />
      </Expander>

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
    </Page>
  );
}
