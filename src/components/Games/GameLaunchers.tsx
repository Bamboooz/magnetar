import React from "react";
import { FaSteam } from "react-icons/fa";

import Expander from "../Expander";
import Item from "../Item";
import { executeCommand } from "../../utils/cmd";

const GameLaunchers: React.FC = () => {
  const openSteam = async () =>
    await executeCommand("start steam://run", false);
  const closeSteam = async () =>
    await executeCommand("taskkill /f /im steam.exe", false);

  return (
    <Expander label="Launchers">
      <Item label="Open steam" onClick={openSteam} className="justify-start">
        <div className="flex items-center justify-start gap-6 text-neutral-300 text-3xl">
          <FaSteam />

          <div className="flex flex-col items-start justify-center">
            <p className="text-md">Open steam</p>
            <p className="text-sm text-neutral-400">start steam://run</p>
          </div>
        </div>
      </Item>
      <Item label="Close steam" onClick={closeSteam} className="justify-start">
        <div className="flex items-center justify-start gap-6 text-neutral-300 text-3xl">
          <FaSteam />

          <div className="flex flex-col items-start justify-center">
            <p className="text-md">Close steam</p>
            <p className="text-sm text-neutral-400">
              taskkill /f /im steam.exe
            </p>
          </div>
        </div>
      </Item>
    </Expander>
  );
};

export default GameLaunchers;
