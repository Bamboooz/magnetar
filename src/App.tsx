import React, { useState, lazy, Suspense } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import { PageType } from "./types";

const Home = lazy(() => import("./components/Home"));
const Apps = lazy(() => import("./components/Apps"));
const Games = lazy(() => import("./components/Games"));
const Commands = lazy(() => import("./components/Commands"));
const Settings = lazy(() => import("./components/Settings"));

const App: React.FC = () => {
  const [page, setPage] = useState<PageType>(PageType.HOME);
  const [search, setSearch] = useState<string>("");

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-primary">
      <Header page={page} setPage={setPage} />
      <Navigation
        page={page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
      />
      <Suspense>
        <Home page={page} />
        <Apps page={page} search={search} />
        <Games page={page} search={search} />
        <Commands page={page} search={search} />
        <Settings page={page} />
      </Suspense>
    </div>
  );
};

export default App;
