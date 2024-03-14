use std::env;
use std::fs;
use std::io::Write;
use std::path::{Path, PathBuf};

#[tauri::command]
pub fn get_magnetar_path() -> PathBuf {
    let appdata: String = env::var("APPDATA").unwrap_or_else(|_| {
        panic!("Failed to retrieve APPDATA environment variable");
    });

    Path::new(&appdata).join("magnetar")
}

pub fn initialize_magnetar_folders() -> Result<(), String> {
    let magnetar_path = get_magnetar_path();
    let commands_file_path = magnetar_path.join("commands").join("commands.json");
    let folders = ["", "icons", "commands"];

    for folder in &folders {
        let path = magnetar_path.join(folder);
        if !path.exists() {
            fs::create_dir_all(&path).map_err(|err| err.to_string())?;
        }
    }

    if !commands_file_path.exists() {
        let mut file = fs::File::create(&commands_file_path).map_err(|err| err.to_string())?;
        file.write_all(b"{\n\n}\n").map_err(|err| err.to_string())?;
    }

    Ok(())
}
