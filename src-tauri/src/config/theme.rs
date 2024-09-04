use std::fs;

use crate::util::dir;

#[tauri::command]
pub fn load_themes() -> Vec<String> {
  dir::verify();

  let path = dir::themes_path();

  let themes = match fs::read_dir(&path) {
    Ok(entries) => entries,
    Err(_) => return vec![],
  };

  themes.filter_map(|entry| {
    entry.ok().and_then(|e| {
      let file_name = e.file_name();
      let file_str = file_name.to_string_lossy();

      if file_str.ends_with(".json") {
        Some(file_str.to_string())
      } else {
        None
      }
    })
  }).collect()
}

#[tauri::command]
pub fn load_theme(name: String) -> Result<String, String> {
  dir::verify();
  
  let path = dir::themes_path().join(format!("{}.json", name));

  match fs::read_to_string(&path) {
    Ok(theme) => Ok(theme),
    Err(_) => Err(format!("Failed to load theme {}", name)),
  }
}
