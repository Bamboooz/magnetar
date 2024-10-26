import { invoke } from "@tauri-apps/api/core";
import { getCurrentWindow } from "@tauri-apps/api/window";

const executeCommand = async (command: string, admin: boolean = false) => {
  const appWindow = getCurrentWindow();

  try {
    await appWindow.hide();
    await invoke("execute_command", { command, admin });
  } catch (error) {
    console.error(error);
  }
};

export { executeCommand };
