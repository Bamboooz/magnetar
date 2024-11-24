import React from "react";
import { open } from "@tauri-apps/plugin-shell";
import { LuHelpCircle } from "react-icons/lu";
import { PageType } from "../types";

interface HeaderProps {
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
}

export default function Header({ setPage }: HeaderProps) {
  return (
    <div className="w-full h-16 flex items-center justify-between shrink-0 pr-6 bg-header">
      <button
        onClick={() => setPage(PageType.HOME)}
        className="h-full flex items-center justify-center gap-6 px-6"
      >
        <img src="/favicon.png" alt="logo" className="w-5 h-5" />
        <p className="text-lg ">magnetar</p>
      </button>

      <button
        onClick={() => open("https://github.com/Bamboooz/magnetar/wiki")}
        className="flex items-center justify-center text-xl text-foreground-secondary hover:"
      >
        <LuHelpCircle />
      </button>
    </div>
  );
}
