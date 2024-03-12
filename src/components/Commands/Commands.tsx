import React, { useState } from "react";
import { resolveResource } from "@tauri-apps/api/path";

import CommandListView from "./CommandList";
import { cn } from "../../utils/tw";

type CommandListItem = { [command: string]: { title: string, requiresAdministrator: boolean } };
type CommandList = { [name: string]: CommandListItem };

interface CommandsViewProps {
    search: string;
}

const CommandsView: React.FC<CommandsViewProps> = ({ search }) => {
    const [bluetoothScriptPath, setBluetoothScriptPath] = useState<string>("");

    // add bluetooth support
    const commandLists: CommandList = {
        "Information": {
            "systeminfo": {
                title: "View your system information",
                requiresAdministrator: false
            },
            "dxdiag": {
                title: "View your system information from dxdiag",
                requiresAdministrator: false
            },
        },
        "Bluetooth": {
            [`powershell.exe -command ${bluetoothScriptPath} -BluetoothStatus On`]: {
                title: "Turn bluetooth on",
                requiresAdministrator: false
            },
            [`powershell.exe -command ${bluetoothScriptPath} -BluetoothStatus Off`]: {
                title: "Turn bluetooth off",
                requiresAdministrator: false
            },
        },
        "Scans": {
            "sfc /scannow": {
                title: "Perform a system integrity scan",
                requiresAdministrator: true
            },
            "CHKDSK /F /R /X": {
                title: "Scan your drive in search of bad sectors",
                requiresAdministrator: true
            },
        },
        "Cleanup": {
            "del /q /f /s %TEMP%\\": {
                title: "Delete application temp files",
                requiresAdministrator: false
            },
            "del /q /s /q C:\\Windows\\Temp\\": {
                title: "Delete windows temp files",
                requiresAdministrator: false
            }
        },
        "Power": {
            "shutdown /s /t 0": {
                title: "Shutdown your PC",
                requiresAdministrator: false
            },
            "shutdown /r /t 0": {
                title: "Reboot your PC",
                requiresAdministrator: false
            },
            "rundll32.exe powrprof.dll,SetSuspendState 0,1,0": {
                title: "Sleep",
                requiresAdministrator: false
            },
            "shutdown /r /o /f /t 00": {
                title: "Reboot into recovery options",
                requiresAdministrator: true
            },
            "bcdedit /set {current} safeboot minimal && shutdown /r /f /t 00": {
                title: "Reboot in safe mode",
                requiresAdministrator: true
            },
        }
    };

    const displayedLists = Object.fromEntries(Object.entries(commandLists).filter(([_, commands]) => Object.values(commands).some(command => command.title.toLowerCase().includes(search.toLowerCase()))));

    resolveResource("bluetooth.ps1")
        .then(filePath => {
            setBluetoothScriptPath(filePath as string);
        })
        .catch(err => {
            console.error(err);
        });

    return (
        <>
            <div className={cn("w-full h-full flex flex-col items-center overflow-auto", Object.keys(displayedLists).length > 0 ? "justify-start" : "justify-center")}>
                {Object.keys(displayedLists).length > 0 ?
                    Object.keys(displayedLists).map((key, index) => (
                        <CommandListView key={index} title={key} search={search} commands={commandLists[key]} />
                    ))
                    : <p className="text-neutral-300 text-[18px] font-semibold">No commands found.</p>
                }
            </div>
        </>
    );
};

export type { CommandListItem };
export default CommandsView;
