#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{App, Manager, AppHandle, CustomMenuItem, SystemTray, SystemTrayMenu, SystemTrayEvent};

use tauri_plugin_positioner::{WindowExt, Position};
use window_shadows::set_shadow;

mod window;
mod filesystem;

#[path = "./modules/folders/explorer.rs"] mod explorer;
#[path = "./modules/commands/shell.rs"] mod shell;
#[path = "./modules/apps/pe.rs"] mod pe;
#[path = "./modules/games/steam.rs"] mod games;

fn initialize(app: &mut App) -> Result<(), Box<dyn std::error::Error>> {
    match filesystem::initialize_magnetar_folders() {
        Ok(_) => println!("Succesfully initialized magnetar directories and files!"),
        Err(err) => panic!("Failed to initialize magnetar directories and files: {}", err)
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
        .plugin(tauri_plugin_positioner::init())
        .setup(initialize)
        .system_tray(SystemTray::new().with_menu(tray_menu))
        .on_system_tray_event(handle_system_tray_event)
        .invoke_handler(tauri::generate_handler![
            shell::execute_command,
            pe::save_pe_ico,
            pe::run_pe,
            filesystem::get_magnetar_path,
            games::fetch_all_steam_games,
            games::run_steam_scheme,
            explorer::explorer_open,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
