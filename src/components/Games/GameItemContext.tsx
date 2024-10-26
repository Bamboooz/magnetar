import React from "react";
import { LuExternalLink, LuPlay } from "react-icons/lu";
import Context from "../common/Context";
import ContextButton from "../common/ContextButton";

interface GameItemContextProps {
  x: number;
  y: number;
  closeContextMenu: () => void;
  installed: boolean;
  playGame: () => Promise<void>;
  openGamePage: () => Promise<void>;
}

const GameItemContext: React.FC<GameItemContextProps> = ({
  x,
  y,
  closeContextMenu,
  installed,
  playGame,
  openGamePage,
}) => {
  return (
    <Context x={x} y={y} closeContextMenu={closeContextMenu}>
      <ContextButton
        title={installed ? "Play game" : "Install game"}
        icon={<LuPlay />}
        className="text-neutral-400 hover:text-neutral-300"
        onClick={playGame}
      />

      <ContextButton
        title="Open game page"
        icon={<LuExternalLink />}
        className="text-neutral-400 hover:text-neutral-300"
        onClick={openGamePage}
      />
    </Context>
  );
};

export default GameItemContext;
