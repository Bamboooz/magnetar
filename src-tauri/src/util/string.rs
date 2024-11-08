use std::path::Path;

#[tauri::command]
pub fn file_name(path: &str) -> String {
  let file_with_extension = Path::new(path).file_name().unwrap().to_str().unwrap();

  file_with_extension.split('.').next().unwrap().to_string()
}
