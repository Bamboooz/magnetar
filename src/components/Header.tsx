import React from "react";
import { open } from "@tauri-apps/plugin-shell";
import { LuHelpCircle } from "react-icons/lu";
import { Page } from "../enums/page";

import icon from "../assets/icons/icon_white.png";

interface HeaderProps {
  setPage: React.Dispatch<React.SetStateAction<Page>>;
}

const Header: React.FC<HeaderProps> = ({ setPage }) => {
  return (
    <div className="w-full h-16 flex items-center justify-between shrink-0 pr-6 bg-black">
      <button
        onClick={() => setPage(Page.HOME)}
        className="h-full flex items-center justify-center gap-4 px-6"
      >
        <img src={icon} alt="logo" className="w-5 h-5" />
        <p className="text-lg text-neutral-300">magnetar</p>
      </button>

      <button
        onClick={() => open("https://github.com/Bamboooz/magnetar/wiki")}
        className="flex items-center justify-center text-xl text-neutral-400 hover:text-neutral-300"
      >
        <LuHelpCircle />
      </button>
    </div>
  );
};

export default Header;
