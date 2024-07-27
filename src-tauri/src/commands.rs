use std::fs;
use std::process::Command;
use crate::dir;

#[tauri::command]
pub async fn get_commands_json() -> String {
  dir::verify_magnetar_files();
  
  let path = dir::get_magnetar_path().join("commands.json");

  let json = fs::read_to_string(path).unwrap_or_else(|_| {
    return "{}".to_string();
  });

  json
}

#[tauri::command]
pub async fn execute_command(command: String, admin: bool) {
  let full_command = if admin {
    format!(
      r#"powershell -Command "Start-Process -FilePath 'cmd.exe' -ArgumentList '/c {}' -Verb RunAs""#,
      command
    )
  } else {
    format!("cmd /C {}", command)
  };

  let _ = Command::new("powershell")
    .arg("-Command")
    .arg(&full_command)
    .spawn()
    .expect("Failed to start command");
}
