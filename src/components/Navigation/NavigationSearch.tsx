import React, { useState, useRef, useEffect } from "react";
import { LuSearch } from "react-icons/lu";
import { Page } from "../../enums/page";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

interface NavigationSearchProps {
  page: Page;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const NavigationSearch: React.FC<NavigationSearchProps> = ({
  page,
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
    <>
      {page !== Page.HOME && (
        <div className="flex flex-col gap-1">
          {!searching ? (
            <>
              <button
                onClick={() => setSearching(true)}
                className="flex items-center justify-center text-xl hover:text-neutral-300"
              >
                <LuSearch />
              </button>

              <div className="h-1" />
            </>
          ) : (
            <>
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="outline-none bg-transparent"
              />

              <div className="w-full h-1 rounded-full bg-secondary" />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default NavigationSearch;
