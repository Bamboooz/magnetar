import React, { useEffect, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";

import PageButton from "./PageButton";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import store, { RootState } from "../../store";
import { setSearch } from "../../store/slices/search";
import { modules } from "../../modules/Module";
import { useSelector } from "react-redux";

const NavigationBar: React.FC = () => {
    const [editing, setEditing] = useState<boolean>(false);

    const searchRef = useRef<HTMLInputElement>(null);

    const page = useSelector((state: RootState) => state.page);
    const search = useSelector((state: RootState) => state.search);

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
        store.dispatch(setSearch(""));
    }, [page]);

    return (
        <>
            <div className="w-full h-14 flex items-center justify-between shrink-0 px-6 gap-6">
                <div className="flex items-center justify-center gap-6">
                    {modules.map((module, index) => 
                        <PageButton key={index} module={module} />
                    )}
                </div>

                {modules.find(module => module.id === page)?.useSearch &&
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
