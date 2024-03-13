use std::env;
use std::fs;
use std::path::{Path, PathBuf};

#[tauri::command]
pub fn get_magnetar_path() -> PathBuf {
    let appdata: String = env::var("APPDATA").unwrap_or_else(|_| {
        panic!("Failed to retrieve APPDATA environment variable");
    });

    Path::new(&appdata).join("magnetar")
}

pub fn initialize_magnetar_folders() -> bool {
    let magnetar_path = get_magnetar_path();
    let commands_file_path = magnetar_path.join("commands").join("commands.json");
    let folders = ["", "icons", "commands"];

    for folder in folders.iter() {
        let path = magnetar_path.join(folder);
        if !fs::metadata(&path).is_ok() && !fs::create_dir(&path).is_ok() {
            return false;
        }
    }

    if !fs::metadata(&commands_file_path).is_ok() {
        if !fs::File::create(&commands_file_path).is_ok() {
            return false;
        } else {
            if !fs::write(commands_file_path, "{\n\n}\n").is_ok() {
                return false;
            }
        }
    }

    true
}
