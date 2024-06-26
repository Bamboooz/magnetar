use std::path::{Path, PathBuf};
use std::process::Command;

use pelite::{FileMap, PeFile};

use crate::filesystem::get_magnetar_path;

fn sanitize_pe_path_to_filename(input: String) -> String {
    let invalid_chars = "\\/:*?\"<>|";
    
    input.chars()
        .filter(|&c| !invalid_chars.contains(c))
        .collect()
}

#[tauri::command]
pub fn save_pe_ico(pe_path: &str) -> PathBuf {
    let dest = get_magnetar_path().join("icons");
    let icon_name = format!("{}.ico", sanitize_pe_path_to_filename(pe_path.to_string()));

    if Path::new(&icon_name).exists() {
        return dest.join(icon_name);
    }

    let map = FileMap::open(&pe_path).expect("Error opening the pe");
    let file = PeFile::from_bytes(&map).expect("Error parsing the pe");
    let resources = file.resources().expect("Error pe does not have resources");

    for (_, group) in resources.icons().filter_map(Result::ok) {
        let mut contents = Vec::new();
        group.write(&mut contents).unwrap();

        let path = dest.join(&icon_name);
        let _ = std::fs::write(&path, &contents);
    }

    dest.join(icon_name)
}

#[tauri::command]
pub fn run_pe(pe_path: &str) -> bool {
    Command::new("cmd.exe")
        .args(&["/c", pe_path])
        .status()
        .expect("Failed to execute a command")
        .success()
}
