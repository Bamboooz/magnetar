import React, { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { invoke } from "@tauri-apps/api/core";
import { LuPlus } from "react-icons/lu";
import PageDisplay from "../PageDisplay";
import { Page } from "../../enums/page";
import Expander from "../common/Expander";
import Item from "../common/Item";
import AppItem from "./AppItem";
import { App } from "../../types/modules/apps";

interface AppsProps {
  page: Page;
  search: string;
}

const Apps: React.FC<AppsProps> = ({ page, search }) => {
  const foundApps = localStorage.getItem("apps") || "[]";
  const [apps, setApps] = useState<App[]>(JSON.parse(foundApps));

  const appWindow = getCurrentWindow();

  const filteredApps = apps.filter((app) =>
    app.label.toLowerCase().includes(search.toLowerCase())
  );

  const addApp = async () => {
    const paths = await open({
      multiple: true,
      filters: [
        {
          name: "",
          extensions: ["lnk", "exe"],
        },
      ],
    });

    if (!paths) return;

    const pathsArray = Array.isArray(paths) ? paths : [paths];

    const addedApps = await Promise.all(
      pathsArray.map(async (path) => {
        const label = (await invoke("file_name", {
          path,
        })) as string;
        return { label, path };
      })
    );

    setApps((prev) => {
      const newApps = [...prev, ...addedApps];
      localStorage.setItem("apps", JSON.stringify(newApps));
      return newApps;
    });

    appWindow.show();
    appWindow.setFocus();
  };

  return (
    <PageDisplay id={Page.APPS} page={page} className="gap-3">
      <Item onClick={addApp} className="justify-start gap-3 text-neutral-300">
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
        <div className="size-full flex flex-col items-center justify-center">
          <p className="text-neutral-300 text-2xl font-medium">No apps found</p>
        </div>
      )}
    </PageDisplay>
  );
};

export default Apps;
