import React, { useState } from "react";
import { open } from "@tauri-apps/api/dialog";
import { appWindow } from "@tauri-apps/api/window";
import { LuPlus } from "react-icons/lu";

import PageDisplay from "../PageDisplay";
import { Page } from "../../enums/page";
import { fileName } from "../../utils/file";
import Expander from "../Expander";
import Item from "../Item";
import AppItem from "./AppItem";

type App = {
  label: string;
  path: string;
};

interface AppsProps {
  page: Page;
  search: string;
}

const Apps: React.FC<AppsProps> = ({ page, search }) => {
  const foundApps = localStorage.getItem("apps") || "[]";
  const [apps, setApps] = useState<App[]>(JSON.parse(foundApps));

  const addApp = async () => {
    const paths = await open({
      title: "Select executables to add",
      multiple: true,
      filters: [
        {
          name: "",
          extensions: ["exe"],
        },
      ],
    });

    if (!paths) return;

    const pathsArray = Array.isArray(paths) ? paths : [paths];
    const addedApps = pathsArray.map((path) => ({
      label: fileName(path),
      path,
    }));

    setApps((prev) => {
      const newApps = [...prev, ...addedApps];
      localStorage.setItem("apps", JSON.stringify(newApps));
      return newApps;
    });

    appWindow.show();
    appWindow.setFocus();
  };

  const filteredApps = apps.filter((app) =>
    app.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageDisplay id={Page.APPS} page={page} className="gap-3">
      <Item
        label="Add a new app"
        onClick={addApp}
        className="justify-start gap-3 text-neutral-300"
      >
        <LuPlus className="text-3xl" />
        <p className="text-md">Add a new app</p>
      </Item>
      {filteredApps.length !== 0 ? (
        <Expander label="Apps">
          {filteredApps.map((app) => (
            <AppItem key={app.label} app={app} apps={apps} setApps={setApps} />
          ))}
        </Expander>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <p className="text-neutral-300 text-2xl font-medium">No apps found</p>
        </div>
      )}
    </PageDisplay>
  );
};

export type { App };
export default Apps;
