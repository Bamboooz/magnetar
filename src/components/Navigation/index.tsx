import React from "react";
import NavigationButton from "./NavigationButton";
import NavigationSearch from "./NavigationSearch";
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

      <NavigationSearch page={page} search={search} setSearch={setSearch} />
    </div>
  );
};

export default Navigation;
