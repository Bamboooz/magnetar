import React from "react";
import { FaSteam } from "react-icons/fa";

import Expander from "../../components/Expander";
import { GameLauncher, SteamLauncher } from "./GameLauncher";

interface LauncherControlsProps {
    launcher: GameLauncher;
}

const LauncherControls: React.FC<LauncherControlsProps> = ({ launcher }) => {
    return (
        <>
            <div onClick={launcher.open} className="w-full h-12 flex items-center justify-start pl-6 gap-6 hover:bg-item-hover">
                <FaSteam className="text-neutral-300 text-[26px]" />

                <div className="flex flex-col items-start justify-center">
                    <p className="text-[14px] font-semibold text-neutral-300">Open {launcher.name}</p>

                    <p className="text-[12px] text-neutral-400 truncate">{launcher.openCommand}</p>
                </div>
            </div>

            <div onClick={launcher.close} className="w-full h-12 flex items-center justify-start pl-6 gap-6 hover:bg-item-hover">
                <FaSteam className="text-neutral-300 text-[26px]" />

                <div className="flex flex-col items-start justify-center">
                    <p className="text-[14px] font-semibold text-neutral-300">Close {launcher.name}</p>
                    
                    <p className="text-[12px] text-neutral-400 truncate">{launcher.closeCommand}</p>
                </div>
            </div>
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
