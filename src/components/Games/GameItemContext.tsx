import React from "react";
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
        label={installed ? "Play" : "Install"}
        onClick={playGame}
      />
      <ContextButton label="Open game page" onClick={openGamePage} />
    </Context>
  );
};

export default GameItemContext;
