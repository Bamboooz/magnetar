#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{App, Manager, AppHandle, CustomMenuItem, SystemTray, SystemTrayMenu, SystemTrayEvent};
use tauri_plugin_positioner::{WindowExt, Position};
use window_shadows::set_shadow;

mod dir;
mod steam;
mod commands;

fn focus_window(app: &AppHandle) {
  let window = app.get_window("main").unwrap();

  let _ = window.show();
  let _ = window.set_focus();
}

fn initialize(app: &mut App) -> Result<(), Box<dyn std::error::Error>> {
  dir::verify_magnetar_files();
  dir::cleanup_last_version();

  let window = app.get_window("main").unwrap();

  let _ = set_shadow(&window, true);
  let _ = window.move_window(Position::BottomRight);

  Ok(())
}

fn handle_system_tray_event(app: &AppHandle, event: SystemTrayEvent) {
  match event {
    SystemTrayEvent::LeftClick { .. } => focus_window(app),
    SystemTrayEvent::MenuItemClick { id, .. } => handle_menu_item_click(app, id),
    _ => {}
  }
}

fn handle_menu_item_click(app: &AppHandle, id: String) {
  match id.as_str() {
    "Open toolbox" => focus_window(app),
    "Quit toolbox" => std::process::exit(0),
    _ => {}
  }
}

fn main() {
  let open_btn_tray_item = CustomMenuItem::new("Open toolbox".to_string(), "Open toolbox");
  let quit_btn_tray_item = CustomMenuItem::new("Quit toolbox".to_string(), "Quit toolbox");

  let tray_menu = SystemTrayMenu::new()
    .add_item(open_btn_tray_item)
    .add_item(quit_btn_tray_item);

  tauri::Builder::default()
    .plugin(tauri_plugin_positioner::init())
    .setup(initialize)
    .system_tray(SystemTray::new().with_menu(tray_menu))
    .on_system_tray_event(handle_system_tray_event)
    .invoke_handler(tauri::generate_handler![
      steam::fetch_all_steam_games,
      commands::get_commands_json,
      commands::execute_command,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
