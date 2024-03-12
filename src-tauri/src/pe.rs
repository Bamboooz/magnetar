use std::path::PathBuf;
use std::fs;

use pelite::{FileMap, PeFile};

use crate::filesystem::{get_magnetar_path, get_file_name};

fn sanitize_for_directory_name(input: PathBuf) -> String {
    let invalid_chars = "\\/:*?\"<>|";
    
    input.to_string_lossy().into_owned().chars()
        .filter(|&c| !invalid_chars.contains(c))
        .collect()
}

#[tauri::command]
pub fn save_pe_ico(pe_path: &str) -> PathBuf {
    // make filename unique by just naming it by its filepath without any unsupported characters
    let dest = get_magnetar_path();
    let icon_name = format!("{}.ico", sanitize_for_directory_name(dest.join(get_file_name(pe_path))));

    // don't create again if icon already exists
    if fs::metadata(icon_name.clone()).is_ok() {
        return dest.join(icon_name);
    }

    // get pe ico file and save it to magnetar directory
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
