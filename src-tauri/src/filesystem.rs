use std::env;
use std::fs;
use std::path::{Path, PathBuf};

pub fn get_magnetar_path() -> PathBuf {
    let appdata = env::var("APPDATA").unwrap_or_else(|_| {
        panic!("Failed to retrieve APPDATA environment variable");
    });

    Path::new(&appdata).join("magnetar")
}

pub fn initialize_magnetar_folder() -> bool{
    let magnetar_path = get_magnetar_path();

    // check if exists beforehand
    if fs::metadata(magnetar_path.clone()).is_ok() {
        return true;
    }

    match fs::create_dir(magnetar_path) {
        Ok(_) => true,
        Err(_) => false,
    }
}

#[tauri::command]
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
