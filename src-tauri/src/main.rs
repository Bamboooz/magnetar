#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{App, Manager};

mod app;
mod module;
mod util;

fn initialize(app: &mut App) -> Result<(), Box<dyn std::error::Error>> {
  util::config::verify();

  let _ = app::tray::create_tray(app);

  let window = app.get_webview_window("main").unwrap();

  app::window::set_window_position(&window);
  app::window::disable_transitions(window);

  Ok(())
}

fn main() {
  tauri::Builder::default()
    .plugin(tauri_plugin_global_shortcut::Builder::new().build())
    .plugin(tauri_plugin_shell::init())
    .plugin(tauri_plugin_fs::init())
    .plugin(tauri_plugin_dialog::init())
    .setup(initialize)
    .invoke_handler(tauri::generate_handler![
      module::steam::fetch_games,
      module::commands::fetch_commands,
      module::commands::execute_command,
      util::update::latest_update,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
