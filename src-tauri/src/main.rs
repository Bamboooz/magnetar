#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{App, Manager, AppHandle, CustomMenuItem, SystemTray, SystemTrayMenu, SystemTrayEvent};

use tauri_plugin_positioner::{WindowExt, Position};
use window_shadows::set_shadow;

mod shell;
mod executable;
mod filesystem;
mod window;
mod pe;
mod steam;

fn initialize(app: &mut App) -> Result<(), Box<dyn std::error::Error>> {
    if !filesystem::initialize_magnetar_folder() {
        panic!("Failed to create magnetar directory.");
    }

    let window = app.get_window("main").unwrap();
    set_shadow(&window, true).unwrap();
    window.hide().unwrap();

    let _ = window.move_window(Position::BottomRight);

    Ok(())
}

fn handle_system_tray_event(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::LeftClick { .. } => handle_tray_icon_left_click(app),
        SystemTrayEvent::MenuItemClick { id, .. } => handle_menu_item_click(app, id),
        _ => {}
    }
}

fn handle_tray_icon_left_click(app: &AppHandle) {
    window::show_and_focus_window(app);
}

fn handle_menu_item_click(app: &AppHandle, id: String) {
    match id.as_str() {
        "Open toolbox" => window::show_and_focus_window(app),
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
        .setup(initialize)
        .system_tray(SystemTray::new().with_menu(tray_menu))
        .on_system_tray_event(handle_system_tray_event)
        .invoke_handler(tauri::generate_handler![
            shell::execute_command,
            shell::execute_command_as_admin,
            executable::spawn_executable,
            pe::save_pe_ico,
            filesystem::remove_file,
            steam::get_installed_steam_games,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
