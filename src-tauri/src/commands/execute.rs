use std::{os::windows::process::CommandExt, process::Command};

const CREATE_NO_WINDOW: u32 = 0x08000000;

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
        .arg("-NoProfile")
        .arg("-ExecutionPolicy")
        .arg("Bypass")
        .arg("-Command")
        .arg(cmd)
        .creation_flags(CREATE_NO_WINDOW)
        .spawn()
        .expect("Failed to execute command");
}
