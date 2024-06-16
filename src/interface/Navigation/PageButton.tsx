import React from "react";

import { Module } from "../../modules/Module";
import { cn } from "../../utils/cn";
import { setPage } from "../../store/slices/page";
import store, { RootState } from "../../store";
import { useSelector } from "react-redux";

interface PageButtonProps {
    module: Module;
}

const PageButton: React.FC<PageButtonProps> = ({ module }) => {
    const page = useSelector((state: RootState) => state.page);

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-1 h-full">
                <p onClick={() => store.dispatch(setPage(module.id))} className={cn("text-[14px] font-semibold cursor-pointer", page === module.id ? "text-text-primary" : "text-text-secondary transition-colors hover:text-text-primary")}>{module.name}</p>
                
                <div className={cn("w-full h-[3px] rounded-full", page === module.id ? "bg-accent" : "bg-transparent")} />
            </div>
        </>
    );
};

export default PageButton;
