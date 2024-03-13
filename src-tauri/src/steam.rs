use std::{error::Error, process::Command};

use reqwest;
use serde_json::Value;
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

fn get_all_available_steam_app_ids() -> Result<Vec<String>, Box<dyn Error>> {
    let key_path = r"SOFTWARE\Valve\Steam\Apps";

    let hklm = RegKey::predef(HKEY_CURRENT_USER);
    let key = hklm.open_subkey_with_flags(key_path, KEY_READ)?;

    let app_ids: Result<Vec<String>, Box<dyn Error>> = key
        .enum_keys()
        .map(|key_name| key_name.map(String::from).map_err(Box::from))
        .collect();

    app_ids
}

fn get_steam_games_from_app_ids(app_ids: Vec<String>) -> Result<Vec<SteamGame>, Box<dyn Error>> {
    let steam_games: Vec<_> = app_ids
        .into_iter()
        .filter_map(|id| {
            let key_path = format!(r"SOFTWARE\Valve\Steam\Apps\{}", id);
            RegKey::predef(HKEY_CURRENT_USER)
                .open_subkey_with_flags(&key_path, KEY_READ)
                .ok()
                .and_then(|key| {
                    Some(SteamGame {
                        id: id.clone(),
                        name: key.get_value::<String, _>("Name").ok()?,
                        installed: key.get_value::<u32, _>("Installed").ok()?.to_string(),
                    })
                })
        })
        .collect();

    Ok(steam_games)
}

#[tauri::command]
pub fn get_installed_steam_games() -> Vec<SteamGame> {
    let app_ids = get_all_available_steam_app_ids().unwrap_or_default();
    let all_games = get_steam_games_from_app_ids(app_ids).unwrap_or_default();

    // 1 REG_DWORD value in a Steam game means that it is installed
    let installed_games: Vec<SteamGame> = all_games
        .into_iter()
        .filter(|game| game.installed == "1")
        .collect();

    installed_games
}

#[tauri::command(async)]
pub async fn fetch_steam_game_data(app_id: String) -> Result<String, String> {
    let api_url = format!("https://store.steampowered.com/api/appdetails?appids={}", app_id);

    let result = reqwest::get(&api_url).await.map_err(|err| err.to_string())?;

    if result.status().is_success() {
        let json_response: Value = result.json().await.map_err(|err| err.to_string())?;

        let header_image = json_response
            .get(&app_id)
            .and_then(|app_data| app_data.get("data"))
            .and_then(|data| data.get("header_image"))
            .and_then(|v| v.as_str())
            .unwrap_or_default();

        Ok(header_image.to_string())
    } else {
        Err(result.status().to_string())
    }
}

#[tauri::command]
pub fn run_steam_game(app_id: String) -> String {
    Command::new("cmd.exe")
        .args(&["/c", &format!("start steam://rungameid/{}", app_id)])
        .status()
        .expect("Failed to execute command")
        .to_string()
}
