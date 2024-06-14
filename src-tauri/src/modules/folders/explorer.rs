use std::process::Command;

#[tauri::command]
pub fn explorer_open(path: &str) {
    Command::new("cmd")
        .args(&["/C", "start", path])
        .spawn()
        .expect("Failed to open folder");
}
