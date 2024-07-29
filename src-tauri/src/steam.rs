use std::error::Error;
use winreg::{
  enums::{HKEY_CURRENT_USER, KEY_READ},
  RegKey,
};

#[derive(Debug, serde::Serialize)]
pub struct SteamGame {
  id: String,
  name: String,
  installed: bool,
}

fn fetch_steam_app_ids() -> Result<Vec<String>, Box<dyn Error>> {
  let key_path = r"SOFTWARE\Valve\Steam\Apps";
  let hklm = RegKey::predef(HKEY_CURRENT_USER);
  let key = hklm.open_subkey_with_flags(key_path, KEY_READ)?;

  let app_ids = key
    .enum_keys()
    .map(|key_name| key_name.map(String::from).map_err(Box::from))
    .collect();
  
  app_ids
}

fn fetch_steam_game(id: String) -> Option<SteamGame> {
  let key_path = format!(r"SOFTWARE\Valve\Steam\Apps\{}", id);
  let key = RegKey::predef(HKEY_CURRENT_USER)
    .open_subkey_with_flags(&key_path, KEY_READ)
    .ok()?;

  let name = key.get_value::<String, _>("Name").ok()?;
  let installed = key.get_value::<u32, _>("Installed").ok()?;

  Some(SteamGame {
    id,
    name,
    installed: installed == 1,
  })
}

#[tauri::command]
pub async fn fetch_steam_games() -> Vec<SteamGame> {
  let app_ids = match fetch_steam_app_ids() {
    Ok(ids) => ids,
    Err(_) => return Vec::new(),
  };

  app_ids
    .into_iter()
    .filter_map(|id| fetch_steam_game(id))
    .collect()
}
