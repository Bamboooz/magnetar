use std::{env, fs};
use std::path::{Path, PathBuf};

pub fn magnetar_path() -> PathBuf {
  let appdata = env::var("APPDATA").expect("APPDATA environment variable not set or inaccessible");

  Path::new(&appdata).join("magnetar")
}

pub fn verify() {
  let path = magnetar_path();

  if !path.exists() {
    fs::create_dir_all(&path).unwrap();
  }

  let commands_json = path.join("commands.json");

  if !commands_json.exists() {
    fs::write(commands_json, "{}").unwrap();
  }

  let themes_directory = path.join("themes");

  if !themes_directory.exists() {
    fs::create_dir_all(&themes_directory).unwrap();
  }
}
