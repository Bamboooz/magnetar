use std::path::Path;

#[tauri::command]
pub fn trim(input: &str) -> String {
  if input.chars().count() > 40 {
    let trimmed: String = input.chars().take(40).collect();
    let trimmed = trimmed.trim_end();
    format!("{}...", trimmed)
  } else {
    input.to_string()
  }
}

#[tauri::command]
pub fn file_name(path: &str) -> String {
  let file_with_extension = Path::new(path).file_name().unwrap().to_str().unwrap();

  file_with_extension.split('.').next().unwrap().to_string()
}
