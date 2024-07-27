import { invoke } from "@tauri-apps/api";
import { appWindow } from "@tauri-apps/api/window";

const executeCommand = async (command: string, admin: boolean) => {
  try {
    await invoke("execute_command", { command, admin });
    await appWindow.hide();
  } catch (error) {
    console.error(error);
  }
};

export { executeCommand };
