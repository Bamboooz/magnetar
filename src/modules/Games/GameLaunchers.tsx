import React from "react";
import { FaSteam } from "react-icons/fa";

import Expander from "../../components/Expander";
import { GameLauncher, SteamLauncher } from "./GameLauncher";
import Item from "../../components/Item";

interface LauncherControlsProps {
    launcher: GameLauncher;
}

const LauncherControls: React.FC<LauncherControlsProps> = ({ launcher }) => {
    return (
        <>
            <Item onClick={() => launcher.open()} title={`Open ${launcher.name}`} className="gap-6">
                <FaSteam className="text-text-primary text-[26px]" />

                <div className="flex flex-col items-start justify-center">
                    <p className="text-[14px] font-semibold text-text-primary">Open {launcher.name}</p>

                    <p className="text-[12px] text-text-secondary">{launcher.openCommand}</p>
                </div>
            </Item>

            <Item onClick={() => launcher.close()} title={`Close ${launcher.name}`} className="gap-6">
                <FaSteam className="text-text-primary text-[26px]" />

                <div className="flex flex-col items-start justify-center">
                    <p className="text-[14px] font-semibold text-text-primary">Close {launcher.name}</p>

                    <p className="text-[12px] text-text-secondary">{launcher.closeCommand}</p>
                </div>
            </Item>
        </>
    );
};

const GameLaunchers: React.FC = () => {
    const steamLauncher = new SteamLauncher();
    
    return (
        <>
            <Expander title="Launchers">
                <LauncherControls launcher={steamLauncher} />
            </Expander>
        </>
    );
};

export default GameLaunchers;
