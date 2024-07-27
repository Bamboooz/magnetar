import React, { useEffect, useState } from "react";
import { open } from "@tauri-apps/api/shell";
import { LuDownload } from "react-icons/lu";

import { Page } from "../enums/page";
import { context } from "../context";
import icon from "../assets/icons/icon_white.png";

interface HeaderProps {
  setPage: React.Dispatch<React.SetStateAction<Page>>;
}

const Header: React.FC<HeaderProps> = ({ setPage }) => {
  const [updateAvailable, setUpdateAvailable] = useState<boolean>(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      fetch("https://api.github.com/repos/Bamboooz/magnetar/releases/latest", {
        signal,
      })
        .then((res) => res.json())
        .then((data) => {
          setUpdateAvailable(data.tag_name !== context.version);
        })
        .catch((err) => {
          console.log("Failed to fetch latest version: ", err);
        });
    } catch (error) {
      console.error(error);
    }

    return () => {
      controller.abort();
    };
  }, []);

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
          className="flex items-center justify-center p-2 text-xl text-neutral-400 hover:text-neutral-300"
        >
          <LuDownload />
        </button>
      )}
    </div>
  );
};

export default Header;
