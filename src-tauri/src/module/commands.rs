use std::fs;
use std::process::Command;
use std::os::windows::process::CommandExt;

use crate::util::dir;

const CREATE_NO_WINDOW: u32 = 0x08000000;

#[tauri::command]
pub async fn fetch_commands() -> String {
  dir::verify();
  
  let path = dir::commands_path().join("commands.json");

  let json = fs::read_to_string(path).unwrap_or_else(|_| {
    return "{}".to_string();
  });

  json
}

#[tauri::command]
pub async fn execute_command(command: String, admin: bool) {
  if admin {
    let ps_command = format!(
      "Start-Process -FilePath 'cmd.exe' -ArgumentList '/c {}' -Verb RunAs",
      command
    );

    Command::new("powershell")
      .args(&["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", &ps_command])
      .creation_flags(CREATE_NO_WINDOW)
      .spawn()
      .expect("Failed to execute command");
  } else {
    Command::new("cmd")
      .args(&["/c", &command])
      .creation_flags(CREATE_NO_WINDOW)
      .spawn()
      .expect("Failed to execute command");
  }
}
