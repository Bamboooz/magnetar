use serde::Serialize;
use winreg::{enums::HKEY_CURRENT_USER, RegKey};

#[derive(Serialize)]
pub struct SteamGame {
    id: String,
    name: String,
    banner: String,
    installed: bool,
}

fn fetch_steam_app_ids() -> Option<Vec<String>> {
    let hkcu = RegKey::predef(HKEY_CURRENT_USER);
    let key = hkcu.open_subkey("SOFTWARE\\Valve\\Steam\\Apps").ok()?;

    let app_ids: Vec<String> = key
        .enum_keys()
        .filter_map(|key_name_result| key_name_result.ok())
        .collect();

    Some(app_ids)
}

fn fetch_steam_game(id: String) -> Option<SteamGame> {
    let hkcu = RegKey::predef(HKEY_CURRENT_USER);
    let key_path = format!(r"SOFTWARE\Valve\Steam\Apps\{}", id);
    let key: RegKey = hkcu.open_subkey(key_path).ok()?;

    let name: String = key.get_value("Name").ok()?;
    let installed: u32 = key.get_value("Installed").ok()?;
    let banner = format!(
        "https://cdn.akamai.steamstatic.com/steam/apps/{}/header.jpg",
        id
    );

    Some(SteamGame {
        id,
        name,
        banner,
        installed: installed == 1,
    })
}

#[tauri::command]
pub async fn fetch_steam_games() -> Vec<SteamGame> {
    fetch_steam_app_ids()
        .unwrap_or_default()
        .into_iter()
        .filter_map(fetch_steam_game)
        .collect()
}
