import { open } from "@tauri-apps/plugin-dialog";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { LuPlus } from "react-icons/lu";
import { App, PageType } from "../../types";
import Expander from "../common/Expander";
import AppItem from "./AppItem";
import Item from "../common/Item";
import { useStickyState } from "../../hooks/useStickyState";
import Page from "../common/Page";

interface AppsProps {
  page: PageType;
  search: string;
}

export default function Apps({ page, search }: AppsProps) {
  const [apps, setApps] = useStickyState<App[]>("apps", []);

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

    setApps((prev) => {
      const newApps = paths
        .filter((path) => !prev.some((app) => app.path === path))
        .map((path) => {
          const file = path.split(/(\\|\/)/g).pop()!;
          const label = file.replace(/\.[^/.]+$/, "");
          return { label, path };
        });

      return [...prev, ...newApps];
    });

    appWindow.show();
    appWindow.setFocus();
  };

  return (
    <Page target={PageType.APPS} current={page} className="gap-3">
      <Item
        icon={<LuPlus />}
        title="Add a new app"
        description=""
        onClick={addApp}
      />

      {filteredApps.length !== 0 ? (
        <Expander label="Apps">
          {filteredApps.map((app) => (
            <AppItem key={app.path} app={app} apps={apps} setApps={setApps} />
          ))}
        </Expander>
      ) : (
        <div className="size-full flex flex-col items-center justify-center">
          <p className=" text-2xl font-medium">No apps found</p>
        </div>
      )}
    </Page>
  );
}
