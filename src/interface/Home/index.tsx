import React from "react";
import { open } from "@tauri-apps/api/shell";
import { FaGithub } from "react-icons/fa6";

import { cn } from "../../utils/cn";
import icon_white from "../../assets/icon_white.png";

interface HomeViewProps {
    selectedPage: number;
    pageId: number;
}

const HomeView: React.FC<HomeViewProps> = ({ selectedPage, pageId }) => {
    return (
        <>
            <div className={cn(selectedPage === pageId ? "w-full h-full flex flex-col items-center justify-between pb-12" : "hidden")}>
                <div />
                
                <div className="flex flex-col items-center justify-center">
                    <img src={icon_white} className="h-32 w-32" />

                    <h1 className="text-neutral-300 text-[24px] font-semibold -mt-4">magnetar</h1>
                    <p className="text-neutral-400 text-[14px] mt-1">An advanced Windows toolbox</p>

                    <button  onClick={() => open("https://github.com/Bamboooz/magnetar")}className="flex items-center justify-center gap-2 mt-6 text-neutral-500 hover:text-neutral-400">
                        <FaGithub className="text-[18px] mt-[2px]" />

                        <p className="text-[12px]">magnetar on GitHub</p>
                    </button>
                </div>

                <p className="text-neutral-500 text-[12px] mt-6">Made with ❤ for code by <span onClick={() => open("https://github.com/Bamboooz")} className="hover:text-neutral-300 cursor-pointer">Bamboooz.</span></p>
            </div>
        </>
    );
};

export default HomeView;
