use std::env;
use std::fs;
use std::path::{Path, PathBuf};

pub fn get_magnetar_path() -> PathBuf {
    let appdata = env::var("APPDATA").unwrap_or_else(|_| {
        panic!("Failed to retrieve APPDATA environment variable");
    });

    Path::new(&appdata).join("magnetar")
}

pub fn initialize_magnetar_folders() -> bool {
    let magnetar_path = get_magnetar_path();
    let folders = ["", "icons", "commands"];

    for folder in folders.iter() {
        let path = magnetar_path.join(folder);
        if !fs::metadata(&path).is_ok() && !fs::create_dir(&path).is_ok() {
            return false;
        }
    }

    true
}

pub fn get_file_name(file_path: &str) -> String {
    Path::new(file_path).file_name().unwrap_or_default().to_string_lossy().to_string()
}

#[tauri::command]
pub fn remove_file(file_path: &str) -> Result<(), String> {
    match fs::remove_file(file_path) {
        Ok(_) => Ok(()),
        Err(err) => Err(format!("{}", err))
    }
}
