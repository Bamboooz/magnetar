import React from "react";
import { open } from "@tauri-apps/plugin-shell";
import { LuHelpCircle, LuSettings } from "react-icons/lu";
import { PageType } from "../types";
import { cn } from "../utils/cn";

import icon from "../assets/icons/icon_white.png";

interface HeaderProps {
  page: PageType;
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
}

const Header: React.FC<HeaderProps> = ({ page, setPage }) => {
  return (
    <div className="w-full h-16 flex items-center justify-between shrink-0 pr-6 bg-black">
      <button
        onClick={() => setPage(PageType.HOME)}
        className="h-full flex items-center justify-center gap-6 px-6"
      >
        <img src={icon} alt="logo" className="w-5 h-5" />
        <p className="text-lg text-neutral-300">magnetar</p>
      </button>

      <div className="flex items-center justify-center gap-6">
        <button
          onClick={() => open("https://github.com/Bamboooz/magnetar/wiki")}
          className="flex items-center justify-center text-xl text-neutral-400 hover:text-neutral-300"
        >
          <LuHelpCircle />
        </button>

        <button
          onClick={() => setPage(PageType.SETTINGS)}
          className={cn(
            "flex items-center justify-center text-xl",
            page === PageType.SETTINGS
              ? "text-accent"
              : "text-neutral-400 hover:text-neutral-300"
          )}
        >
          <LuSettings />
        </button>
      </div>
    </div>
  );
};

export default Header;
