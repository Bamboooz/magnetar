import { invoke } from "@tauri-apps/api/core";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function exec(command: string, admin: boolean = false) {
  const appWindow = getCurrentWindow();

  try {
    await appWindow.hide();
    await invoke("execute_command", { command, admin });
  } catch (error) {
    console.log(error);
  }
}
