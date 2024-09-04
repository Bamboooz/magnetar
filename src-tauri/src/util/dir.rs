use std::{env, fs};
use std::path::{Path, PathBuf};

pub fn magnetar_path() -> PathBuf {
  let appdata = env::var("APPDATA").expect("APPDATA environment variable not set or inaccessible");

  Path::new(&appdata).join("magnetar")
}

pub fn commands_path() -> PathBuf {
  let path = magnetar_path();

  path.join("commands")
}

pub fn themes_path() -> PathBuf {
  let path = magnetar_path();

  path.join("themes")
}

pub fn verify() {
  let path = magnetar_path();

  if !path.exists() {
    fs::create_dir_all(&path).unwrap();
  }

  let commands_directory = path.join("commands");

  if !commands_directory.exists() {
    fs::create_dir_all(&commands_directory).unwrap();
  }

  let commands_json = commands_directory.join("commands.json");

  if !commands_json.exists() {
    fs::write(commands_json, "{}").unwrap();
  }

  let themes_directory = path.join("themes");

  if !themes_directory.exists() {
    fs::create_dir_all(&themes_directory).unwrap();
  }
}
