use std::{fs, os::windows::process::CommandExt, process::Command};

use crate::util::config;

const CREATE_NO_WINDOW: u32 = 0x08000000;

#[tauri::command]
pub async fn fetch_commands() -> String {
    config::verify();

    let path = config::magnetar_path()
        .join("commands")
        .join("commands.json");

    let json = fs::read_to_string(path).unwrap_or_else(|_| {
        return "{}".to_string();
    });

    json
}

#[tauri::command]
pub async fn execute_command(command: String, admin: bool) {
    let cmd = if admin {
        format!(
            "Start-Process -FilePath 'cmd.exe' -ArgumentList '/c {}' -Verb RunAs",
            command
        )
    } else {
        format!("cmd /c {}", command)
    };

    Command::new("powershell")
        .args(&["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", &cmd])
        .creation_flags(CREATE_NO_WINDOW)
        .spawn()
        .expect("Failed to execute command");
}
