import React from "react";
import NavigationButton from "./NavigationButton";
import NavigationSearch from "./NavigationSearch";
import { PageType } from "../../types";

interface NavigationProps {
  page: PageType;
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function Navigation({
  page,
  setPage,
  search,
  setSearch,
}: NavigationProps) {
  return (
    <div className="w-full h-16 flex items-center justify-between shrink-0 pl-3 pr-6 gap-6">
      <div className="flex items-center">
        <NavigationButton
          id={PageType.APPS}
          label="Apps"
          page={page}
          setPage={setPage}
        />
        <NavigationButton
          id={PageType.GAMES}
          label="Games"
          page={page}
          setPage={setPage}
        />
        <NavigationButton
          id={PageType.COMMANDS}
          label="Commands"
          page={page}
          setPage={setPage}
        />
      </div>

      <NavigationSearch page={page} search={search} setSearch={setSearch} />
    </div>
  );
}
