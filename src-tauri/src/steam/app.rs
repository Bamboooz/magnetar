use std::process::Command;

use crate::steam::locate;

#[tauri::command]
pub async fn run_game(id: String) {
    if let Some(exe) = locate::locate_steam_exe() {
        Command::new(exe)
            .arg("-silent")
            .arg("-applaunch")
            .arg(id)
            .spawn()
            .ok();
    }
}

#[tauri::command]
pub async fn open_steam_page(id: String) {
    let protocol = format!("steam://store/{}", id);

    Command::new("cmd")
        .arg("/C")
        .arg("start")
        .arg(protocol)
        .spawn()
        .ok();
}

#[tauri::command]
pub async fn uninstall_game(id: String) {
    let protocol = format!("steam://uninstall/{}", id);

    Command::new("cmd")
        .arg("/C")
        .arg("start")
        .arg(protocol)
        .spawn()
        .ok();
}
