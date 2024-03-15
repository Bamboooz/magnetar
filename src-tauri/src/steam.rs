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

#[tauri::command]
pub fn fetch_all_steam_games() -> Result<Vec<SteamGame>, String> {
    let app_ids = get_all_available_steam_app_ids().map_err(|e| e.to_string())?;
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

fn run_steam_scheme(scheme: String) -> String {
    Command::new("cmd.exe")
        .args(&["/c", &format!("start {}", scheme)])
        .status()
        .expect("Failed to execute command")
        .to_string()
}

#[tauri::command]
pub fn run_steam_game(app_id: String) -> String {
    run_steam_scheme(format!("steam://rungameid/{}", app_id))
}

#[tauri::command]
pub fn open_steam_game_page(app_id: String) -> String {
    run_steam_scheme(format!("steam://store/{}", app_id))
}
