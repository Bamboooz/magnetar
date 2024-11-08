import React, { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { invoke } from "@tauri-apps/api/core";
import { LuPlus } from "react-icons/lu";
import Page from "../common/Page";
import { PageType, App } from "../../types";
import Expander from "../common/Expander";
import AppItem from "./AppItem";
import Item from "../common/Item";

interface AppsProps {
  page: PageType;
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

    const addedApps = await Promise.all(
      paths.map(async (path) => {
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
    <Page id={PageType.APPS} page={page} className="gap-3">
      <Item
        icon={<LuPlus />}
        title="Add a new app"
        description=""
        onClick={addApp}
      />

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
    </Page>
  );
};

export default Apps;
