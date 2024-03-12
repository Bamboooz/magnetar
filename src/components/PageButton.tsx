import React from "react";

import { cn } from "../utils/tw";

interface PageButtonProps {
    text: string;
    targetPage: number;
    selectedPage: number;
    setSelectedPage: React.Dispatch<React.SetStateAction<number>>;
}

const PageButton: React.FC<PageButtonProps> = ({ text, targetPage, selectedPage, setSelectedPage }) => {
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-1 h-full">
                <p onClick={() => setSelectedPage(targetPage)} className={cn("text-[14px] font-semibold cursor-pointer", selectedPage === targetPage ? "text-neutral-300" : "text-neutral-400 transition-colors hover:text-neutral-300")}>{text}</p>
                <div className={cn("w-full h-[3px] rounded-full", selectedPage === targetPage ? "bg-accent" : "bg-transparent")} />
            </div>
        </>
    );
};

export default PageButton;
