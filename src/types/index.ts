export enum PageType {
  HOME,
  APPS,
  GAMES,
  COMMANDS,
}

export interface App {
  label: string;
  path: string;
}

export interface Game {
  id: string;
  name: string;
  installed: boolean;
}

export interface Command {
  label: string;
  command: string;
  admin: boolean;
}

export interface CommandList {
  [label: string]: Command[];
}
