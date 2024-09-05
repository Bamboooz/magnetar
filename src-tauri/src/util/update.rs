use reqwest::Client;
use serde::Deserialize;
use tauri::AppHandle;

#[derive(Deserialize)]
struct Release {
  tag_name: String,
}

#[tauri::command]
pub async fn updates_available(app_handle: AppHandle) -> Result<bool, String> {
  let url = "https://api.github.com/repos/Bamboooz/magnetar/releases/latest";
  
  let client = Client::new();

  let version = app_handle.package_info().version.to_string();

  let response = client
    .get(url)
    .header("User-Agent", "magnetar")
    .header("Accept", "application/vnd.github.v3+json")
    .send()
    .await
    .map_err(|e| format!("Request failed: {}", e))?;

  let release: Release = response.json().await.map_err(|e| format!("Failed to parse JSON: {}", e))?;

  Ok(release.tag_name != version)
}
