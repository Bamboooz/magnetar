use std::process::Command;
use std::os::windows::process::CommandExt;

#[tauri::command]
pub fn spawn_executable(file_path: &str) -> String {
    const DETACHED_PROCESS: u32 = 0x00000008;

    let output = Command::new(file_path)
        .creation_flags(DETACHED_PROCESS)
        .status()
        .expect("Failed to run the executable");

    output.to_string()
}
