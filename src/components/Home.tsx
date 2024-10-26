import React, { useState } from "react";
import { open } from "@tauri-apps/plugin-shell";
import { getVersion } from "@tauri-apps/api/app";
import { LuHeart } from "react-icons/lu";
import PageDisplay from "./PageDisplay";
import { Page } from "../enums/page";
import { useMount } from "../hooks/useMount";

import icon from "../assets/icons/icon_white.png";

interface HomeProps {
  page: Page;
}

const Home: React.FC<HomeProps> = ({ page }) => {
  const [version, setVersion] = useState<string>("");

  useMount(async () => {
    const currentVersion = await getVersion();
    setVersion(currentVersion);
  });

  return (
    <PageDisplay
      id={Page.HOME}
      page={page}
      className="items-center justify-center gap-16"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <img src={icon} alt="logo" className="w-16 h-16" />
        <p className="text-3xl text-neutral-300">magnetar</p>
        <p className="text-lg text-neutral-400 text-center">
          An advanced Windows toolbox
        </p>
        <a
          onClick={() =>
            open("https://github.com/Bamboooz/magnetar/releases/latest")
          }
          className="text-lg text-neutral-500 hover:underline cursor-pointer"
        >{`What's new in v${version}?`}</a>
      </div>

      <div className="flex items-center justify-center gap-1 text-lg text-neutral-500">
        <p>Made with</p>
        <LuHeart className="text-accent" />
        <p>by</p>
        <a
          onClick={() => open("https://github.com/Bamboooz")}
          className="hover:underline cursor-pointer"
        >
          Bamboooz
        </a>
      </div>
    </PageDisplay>
  );
};

export default Home;
