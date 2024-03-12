import React, { useEffect, useRef } from "react";
import { appWindow } from "@tauri-apps/api/window";

import PageButton from "./PageButton";

interface NavigationBarProps {
    selectedPage: number;
    setSelectedPage: React.Dispatch<React.SetStateAction<number>>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ selectedPage, setSelectedPage, search, setSearch }) => {
    const searchRef = useRef<HTMLInputElement>(null);
    
    useEffect(() => {
        const setupFocusListener = async () => {
            await appWindow.onFocusChanged(async ({ payload: focused }) => {
                if (focused) {
                    searchRef.current?.focus();
                }
            });
        };

        setupFocusListener();
    }, []);

    return (
        <>
            <div className="w-full h-16 flex items-center justify-between px-6 gap-6">
                <div className="flex items-center justify-center gap-6">
                    <PageButton text="Apps" targetPage={0} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                    <PageButton text="Games" targetPage={1} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                    <PageButton text="Commands" targetPage={2} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                </div>

                <div className="h-full w-full flex items-center justify-center">
                    <input ref={searchRef} value={search} onChange={(e) => setSearch(e.target.value)} spellCheck={false} type="text" placeholder="Search..." className="w-full h-8 bg-transparent outline-none px-2 text-neutral-400 text-[12px] rounded-md border border-border" />
                </div>
            </div>
        </>
    );
};

export default NavigationBar;
