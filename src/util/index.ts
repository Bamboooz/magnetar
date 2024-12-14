import { invoke as tauriInvoke } from "@tauri-apps/api/core";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function invoke<T>(cmd: string, args?: any, hide: boolean = true): Promise<T> {
  if (hide) {
    const appWindow = getCurrentWindow();
    await appWindow.hide();
  }
  
  return tauriInvoke<T>(cmd, args);
}

export async function exec(command: string, admin: boolean = false) {
  await invoke("execute_command", { command, admin });
}
