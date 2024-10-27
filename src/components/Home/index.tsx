import React from "react";
import { open } from "@tauri-apps/plugin-shell";
import { LuHeart } from "react-icons/lu";
import PageDisplay from "../PageDisplay";
import HomeUpdatePanel from "./HomeUpdatePanel";
import { Page } from "../../enums/page";

import icon from "../../assets/icons/icon_white.png";

interface HomeProps {
  page: Page;
}

const Home: React.FC<HomeProps> = ({ page }) => {
  return (
    <PageDisplay id={Page.HOME} page={page} className="justify-between p-10">
      <div className="size-full flex flex-col items-center justify-center gap-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <img src={icon} alt="logo" className="w-16 h-16" />
          <p className="text-3xl text-neutral-300">magnetar</p>
          <p className="text-lg text-neutral-400 text-center">
            An advanced Windows toolbox
          </p>
        </div>

        <div className="flex items-center justify-center gap-1 text-lg text-neutral-500">
          <span>Made with</span>
          <LuHeart className="text-accent" />
          <span>by</span>
          <a
            onClick={() => open("https://github.com/Bamboooz")}
            className="hover:underline cursor-pointer"
          >
            Bamboooz
          </a>
        </div>
      </div>

      <HomeUpdatePanel />
    </PageDisplay>
  );
};

export default Home;
