import React from "react";
import { open } from "@tauri-apps/api/shell";
import { LuSettings, LuGift } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";

import icon_white from "../assets/icon_white.png";
import { cn } from "../utils/tw";

interface HeaderProps {
    settingsOpened: boolean;
    setSettingsOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ settingsOpened, setSettingsOpened }) => {
    const closeSettings = () => {
        if (settingsOpened)
            setSettingsOpened(false);
    };

    return (
        <>
            <header onClick={closeSettings} className={cn("group w-full h-14 shrink-0 bg-header flex items-center justify-between pl-4 pr-6 z-50", settingsOpened ? "cursor-pointer" : "")}>
                {!settingsOpened 
                    ? <div className="h-full flex items-center justify-start">
                        <img src={icon_white} className="h-10 w-10" />
                        <p className="text-neutral-300 text-[12px] font-bold">Magnetar Toolbox</p>
                    </div>
                    : <div className="h-full flex items-center justify-start gap-2 ml-[7px]">
                        <LuSettings className="text-[24px] text-neutral-300 group-hover:hidden" />
                        <p className="text-neutral-300 text-[12px] font-bold group-hover:hidden">Magnetar Settings</p>

                        <IoIosArrowForward className="hidden text-[24px] text-neutral-300 group-hover:block" />
                        <p className="hidden text-neutral-300 text-[12px] font-bold group-hover:block">Return</p>
                    </div>
                }

                {!settingsOpened &&
                    <div className="h-full flex items-center justify-start gap-6">
                        <button onClick={() => open("https://github.com/Bamboooz/magnetar/releases/latest")} title="What's new in 0.0.3?" className="flex items-center justify-center p-1 rounded-full transition-colors hover:bg-header-item-hover">
                            <LuGift className="text-neutral-300 text-[16px]" />
                        </button>

                        {/* Gotta wait for this one a little bit more
                            <button title="Settings" onClick={() => setSettingsOpened(true)} className="flex items-center justify-center p-1 rounded-full transition-colors hover:bg-header-item-hover">
                                <LuSettings className="text-neutral-300 text-[16px]" />
                            </button>
                        */}
                    </div>
                }
            </header>
        </>
    );
};

export default Header;
