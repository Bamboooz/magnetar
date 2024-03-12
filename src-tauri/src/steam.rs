use std::error::Error;

use winreg::{
    enums::{HKEY_CURRENT_USER, KEY_READ},
    RegKey,
};

#[derive(Debug, serde::Serialize)]
pub struct SteamGame {
    id: String,
    name: String,
    installed: String,
}

fn read_steam_app_ids() -> Result<Vec<String>, Box<dyn Error>> {
    let key_path = r"SOFTWARE\Valve\Steam\Apps";

    let hklm = RegKey::predef(HKEY_CURRENT_USER);
    let key = hklm.open_subkey_with_flags(key_path, KEY_READ)?;

    let app_ids: Result<Vec<String>, Box<dyn Error>> = key
        .enum_keys()
        .map(|key_name| key_name.map(String::from).map_err(Box::from))
        .collect();

    app_ids
}

fn read_steam_games(app_ids: Vec<String>) -> Result<Vec<SteamGame>, Box<dyn Error>> {
    let mut steam_games = Vec::new();

    for id in app_ids {
        let key_path = format!(r"SOFTWARE\Valve\Steam\Apps\{}", id);

        let hklm = RegKey::predef(HKEY_CURRENT_USER);
        let key = match hklm.open_subkey_with_flags(&key_path, KEY_READ) {
            Ok(key) => key,
            Err(_) => continue,
        };

        match (key.get_value::<u32, _>("Installed"), key.get_value::<String, _>("Name")) {
            (Ok(installed_value), Ok(name_value)) => {
                let installed_value: String = installed_value.to_string();
                let name_value: String = name_value;

                let steam_game = SteamGame {
                    id: id.clone(),
                    name: name_value,
                    installed: installed_value,
                };

                steam_games.push(steam_game);
            }
            (Err(_), _) | (_, Err(_)) => {
                continue; // Steam handler keys, not games will fall here
            }
        }
    }

    Ok(steam_games)
}

#[tauri::command]
pub fn get_installed_steam_games() -> Vec<SteamGame> {
    let app_ids = read_steam_app_ids().unwrap_or_default();
    let all_games = read_steam_games(app_ids).unwrap_or_default();

    // 1 REG_DWORD value in a Steam game means that it is installed
    let installed_games: Vec<SteamGame> = all_games
        .into_iter()
        .filter(|game| game.installed == "1")
        .collect();

    installed_games
}
