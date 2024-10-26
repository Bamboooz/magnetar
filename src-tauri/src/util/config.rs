use std::{
  env, fs,
  path::{Path, PathBuf}
};

pub fn magnetar_path() -> PathBuf {
  let appdata = env::var("APPDATA").expect("APPDATA environment variable not set or inaccessible");

  Path::new(&appdata).join("magnetar")
}

pub fn verify() {
  let path = magnetar_path();

  if !path.exists() {
    fs::create_dir_all(&path).unwrap();
  }

  let commands_path = path.join("commands");

  if !commands_path.exists() {
    fs::create_dir_all(&commands_path).unwrap();
  }

  let commands_json = commands_path.join("commands.json");

  if !commands_json.exists() {
    fs::write(commands_json, "{}").unwrap();
  }
}
