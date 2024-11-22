import { open } from "@tauri-apps/plugin-shell";
import { LuHeart } from "react-icons/lu";
import Page from "../common/Page";
import HomeUpdatePanel from "./HomeUpdatePanel";
import { PageType } from "../../types";

interface HomeProps {
  page: PageType;
}

export default function Home({ page }: HomeProps) {
  return (
    <Page
      target={PageType.HOME}
      current={page}
      className="justify-between p-10"
    >
      <div className="size-full flex flex-col items-center justify-center gap-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <img src="/favicon.png" alt="logo" className="w-16 h-16" />
          <p className="text-3xl ">magnetar</p>
          <p className="text-lg text-foreground-secondary text-center">
            An advanced Windows toolbox
          </p>
        </div>

        <div className="flex items-center justify-center gap-1 text-lg text-foreground-tertiary">
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
    </Page>
  );
}
