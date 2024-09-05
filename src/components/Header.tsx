import React, { useState } from "react";
import { open } from "@tauri-apps/api/shell";
import { LuDownload } from "react-icons/lu";

import { Page } from "../enums/page";
import icon from "../assets/icons/icon_white.png";
import { useMount } from "../hooks/useMount";
import { invoke } from "@tauri-apps/api";

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
    <div className="w-full h-16 flex items-center justify-between shrink-0 px-6 bg-black">
      <button
        onClick={() => setPage(Page.HOME)}
        className="h-full flex items-center justify-center gap-4"
      >
        <img src={icon} alt="logo" className="w-5 h-5" />
        <p className="text-lg text-neutral-300">magnetar</p>
      </button>

      {updateAvailable && (
        <button
          onClick={() =>
            open("https://github.com/Bamboooz/magnetar/releases/latest")
          }
          title="Updates available"
          className="flex items-center justify-center text-xl text-neutral-400 hover:text-neutral-300"
        >
          <LuDownload />
        </button>
      )}
    </div>
  );
};

export default Header;
