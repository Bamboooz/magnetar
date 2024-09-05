type Command = {
  label: string;
  command: string;
  admin: boolean;
};

type CommandList = {
  [label: string]: Command[];
};

export type { Command, CommandList };
