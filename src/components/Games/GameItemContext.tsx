import Context from "../common/Context";
import ContextButton from "../common/ContextButton";

interface GameItemContextProps {
  x: number;
  y: number;
  closeContextMenu: () => void;
  installed: boolean;
  runGame: () => void;
  openSteamPage: () => void;
  uninstallGame: () => void;
}

export default function GameItemContext({
  x,
  y,
  closeContextMenu,
  installed,
  runGame,
  openSteamPage,
  uninstallGame,
}: GameItemContextProps) {
  return (
    <Context x={x} y={y} closeContextMenu={closeContextMenu}>
      <ContextButton
        label={installed ? "Play" : "Install"}
        onClick={runGame}
      />
      <ContextButton label="Open Steam page" onClick={openSteamPage} />
      {installed && <ContextButton label="Uninstall" onClick={uninstallGame} />}
    </Context>
  );
}
