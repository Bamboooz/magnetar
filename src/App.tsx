import React, { useState } from "react";

import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Apps from "./components/Apps";
import Games from "./components/Games";
import Commands from "./components/Commands";
import { Page } from "./enums/page";

const App: React.FC = () => {
  const [page, setPage] = useState<Page>(Page.HOME);
  const [search, setSearch] = useState<string>("");

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-primary">
      <Header setPage={setPage} />
      <Navigation
        page={page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
      />

      <Home page={page} />
      <Apps page={page} search={search} />
      <Games page={page} search={search} />
      <Commands page={page} search={search} />
    </div>
  );
};

export default App;
