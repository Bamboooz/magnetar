import React, { useEffect, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";

import PageButton from "./PageButton";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

interface NavigationBarProps {
    selectedPage: number;
    setSelectedPage: React.Dispatch<React.SetStateAction<number>>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ selectedPage, setSelectedPage, search, setSearch }) => {
    const [editing, setEditing] = useState<boolean>(false);

    const searchRef = useRef<HTMLInputElement>(null);

    useOnClickOutside(searchRef, () => {
        if (search.replaceAll(" ", "") === "") {
            setEditing(false);
        }
    });

    useEffect(() => {
        if (editing) {
            searchRef.current?.focus();
        }
    }, [editing]);
    
    useEffect(() => {
        setEditing(false);
        setSearch("");
    }, [selectedPage]);

    return (
        <>
            <div className="w-full h-16 flex items-center justify-between px-6 gap-6">
                <div className="flex items-center justify-center gap-6">
                    <PageButton text="Apps" targetPage={2} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                    <PageButton text="Games" targetPage={3} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                    <PageButton text="Commands" targetPage={4} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
                    {/*<PageButton text="Audio" targetPage={5} selectedPage={selectedPage} setSelectedPage={setSelectedPage} />*/}
                </div>

                {selectedPage !== 0 && selectedPage !== 1 && selectedPage !== 5 &&
                    <div className="h-full w-full flex items-center justify-end">
                        {editing
                            ? <input ref={searchRef} value={search} onChange={(e) => setSearch(e.target.value)} spellCheck={false} type="text" placeholder="Search..." className="w-full h-8 mb-1 bg-transparent outline-none px-2 text-neutral-400 text-[12px] border-b border-border" />
                            : <button title="Search..." onClick={() => setEditing(true)} className="p-1 rounded-full hover:bg-item-hover">
                                <LuSearch className="text-neutral-300 text-[16px]" />
                            </button>
                        }
                    </div>
                }
            </div>
        </>
    );
};

export default NavigationBar;
