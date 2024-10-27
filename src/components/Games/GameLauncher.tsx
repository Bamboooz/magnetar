import React from "react";
import { FaSteam } from "react-icons/fa";
import Item from "../common/Item";

interface GameLauncherProps {
  title: string;
  command: string;
  onClick: () => void;
}

const GameLauncher: React.FC<GameLauncherProps> = ({
  title,
  command,
  onClick,
}) => {
  return (
    <Item onClick={onClick} className="justify-start gap-6 text-neutral-300">
      <FaSteam className="text-3xl" />

      <div className="flex flex-col items-start justify-center">
        <p className="text-md">{title}</p>
        <p className="text-sm text-neutral-400">{command}</p>
      </div>
    </Item>
  );
};

export default GameLauncher;
