import React, { useState } from "react";
import { open } from "@tauri-apps/plugin-shell";
import { invoke } from "@tauri-apps/api/core";
import { LuDownload, LuHelpCircle } from "react-icons/lu";
import { Page } from "../../enums/page";
import { useMount } from "../../hooks/useMount";
import HeaderButton from "./HeaderButton";

import icon from "../../assets/icons/icon_white.png";

interface HeaderProps {
  setPage: React.Dispatch<React.SetStateAction<Page>>;
}

const Header: React.FC<HeaderProps> = ({ setPage }) => {
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);

  useMount(async () => {
    await invoke("updates_available").then((available) =>
      setUpdateAvailable(available as boolean)
    );
  });

  return (
    <div className="w-full h-16 flex items-center justify-between shrink-0 pr-6 bg-black">
      <button
        onClick={() => setPage(Page.HOME)}
        className="h-full flex items-center justify-center gap-4 px-6"
      >
        <img src={icon} alt="logo" className="w-5 h-5" />
        <p className="text-lg text-neutral-300">magnetar</p>
      </button>

      <div className="flex gap-6">
        {updateAvailable && (
          <HeaderButton
            title="Updates available"
            icon={<LuDownload />}
            onClick={() =>
              open("https://github.com/Bamboooz/magnetar/releases/latest")
            }
          />
        )}

        <HeaderButton
          title="Open magnetar wiki"
          icon={<LuHelpCircle />}
          onClick={() => open("https://github.com/Bamboooz/magnetar/wiki")}
        />
      </div>
    </div>
  );
};

export default Header;
