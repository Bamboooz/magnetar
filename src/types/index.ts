enum PageType {
  HOME,
  APPS,
  GAMES,
  COMMANDS,
}

interface App {
  label: string;
  path: string;
}

interface Game {
  id: string;
  name: string;
  installed: boolean;
}

interface Command {
  label: string;
  command: string;
  admin: boolean;
}

interface CommandList {
  [label: string]: Command[];
}

export { PageType };
export type { App, Game, Command, CommandList };
