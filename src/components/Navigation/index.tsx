import React, { useEffect, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";

import NavigationButton from "./NavigationButton";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { Page } from "../../enums/page";

interface NavigationProps {
  page: Page;
  setPage: React.Dispatch<React.SetStateAction<Page>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const Navigation: React.FC<NavigationProps> = ({
  page,
  setPage,
  search,
  setSearch,
}) => {
  const [searching, setSearching] = useState<boolean>(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useOnClickOutside(searchRef, () => {
    if (search.trim() === "") {
      setSearching(false);
    }
  });

  useEffect(() => {
    if (searching) {
      searchRef.current?.focus();
    }
  }, [searching]);

  useEffect(() => {
    setSearch("");
    setSearching(false);
  }, [page]);

  return (
    <div className="w-full h-16 flex items-center justify-between shrink-0 px-6 gap-6 text-neutral-400 text-lg">
      <div className="flex items-center justify-center gap-6">
        <NavigationButton
          id={Page.APPS}
          label="Apps"
          page={page}
          setPage={setPage}
        />
        <NavigationButton
          id={Page.GAMES}
          label="Games"
          page={page}
          setPage={setPage}
        />
        <NavigationButton
          id={Page.COMMANDS}
          label="Commands"
          page={page}
          setPage={setPage}
        />
      </div>

      {page !== Page.HOME && (
        <div className="flex flex-col gap-1">
          {!searching ? (
            <button
              onClick={() => setSearching(true)}
              className="flex items-center justify-center p-2 text-xl hover:text-neutral-300"
            >
              <LuSearch />
            </button>
          ) : (
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none bg-transparent border-b border-neutral-400"
            />
          )}
          <div className="w-full h-1 rounded-full bg-transparent" />
        </div>
      )}
    </div>
  );
};

export default Navigation;
