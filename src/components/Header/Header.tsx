import React from "react";
import { open } from "@tauri-apps/api/shell";
import { LuSettings, LuGift } from "react-icons/lu";

import icon_white from "../../assets/icon_white.png";

interface HeaderProps {
    setSelectedPage: React.Dispatch<React.SetStateAction<number>>;
}

const Header: React.FC<HeaderProps> = ({ setSelectedPage }) => {
    return (
        <>
            <header className="group w-full h-14 shrink-0 bg-header flex items-center justify-between pl-4 pr-6 z-50">
                <button onClick={() => setSelectedPage(0)} className="h-full flex items-center justify-start">
                    <img src={icon_white} className="h-10 w-10" />
                    <p className="text-neutral-300 text-[12px] font-bold">Magnetar Toolbox</p>
                </button>

                <div className="h-full flex items-center justify-start gap-6">
                    <button onClick={() => open("https://github.com/Bamboooz/magnetar/releases/latest")} title="What's new in 0.0.4?" className="flex items-center justify-center p-1 rounded-full transition-colors hover:bg-header-item-hover">
                        <LuGift className="text-neutral-300 text-[16px]" />
                    </button>

                    {/*<button title="Settings" onClick={() => setSelectedPage(1)} className="flex items-center justify-center p-1 rounded-full transition-colors hover:bg-header-item-hover">
                        <LuSettings className="text-neutral-300 text-[16px]" />
                    </button>*/}
                </div>
            </header>
        </>
    );
};

export default Header;
