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

  if !commands_path().exists() {
    fs::create_dir_all(&commands_path()).unwrap();
  }

  let commands_json = commands_path().join("commands.json");

  if !commands_json.exists() {
    fs::write(commands_json, "{}").unwrap();
  }

  if !themes_path().exists() {
    fs::create_dir_all(&themes_path()).unwrap();
  }
}
