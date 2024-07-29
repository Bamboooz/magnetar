use std::{env, fs};
use std::path::{Path, PathBuf};

pub fn get_magnetar_path() -> PathBuf {
  let appdata: String = env::var("APPDATA").unwrap_or_else(|_| {
    panic!("Failed to retrieve APPDATA environment variable");
  });

  Path::new(&appdata).join("magnetar")
}

pub fn verify_magnetar_files() {
  let path = get_magnetar_path();

  if !path.exists() {
    fs::create_dir_all(&path).unwrap();
  }

  let commands_json = path.join("commands.json");

  if !commands_json.exists() {
    fs::write(commands_json, "{}").unwrap();
  }
}
