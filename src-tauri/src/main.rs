#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{
  process::exit,
  ffi::c_void,
  mem::size_of,
};
use tauri::{Window, App, AppHandle, CustomMenuItem, Manager, Position, PhysicalPosition, PhysicalSize, SystemTray, SystemTrayEvent, SystemTrayMenu};
use windows::Win32::{
  Foundation::{BOOL, HWND},
  Graphics::Dwm::{DwmSetWindowAttribute, DWMWA_TRANSITIONS_FORCEDISABLED},
};

mod config;
mod module;
mod util;

fn focus_window(window: &Window) {
  window.show().unwrap();
  window.set_focus().unwrap();
}

fn set_window_position(window: &Window) {
  if let Ok(Some(screen)) = window.current_monitor() {
    if let Ok(window_size) = window.outer_size() {
      let screen_position = screen.position();

      let screen_size = PhysicalSize::<i32> {
        width: screen.size().width as i32,
        height: screen.size().height as i32,
      };

      let taskbar_height = 40;
    
      let window_position = PhysicalPosition {
        x: screen_position.x + (screen_size.width - (window_size.width as i32)),
        y: screen_size.height - (window_size.height - (screen_position.y as u32)) as i32 - taskbar_height,
      };
    
      window.set_position(Position::Physical(window_position)).unwrap();
    }
  }
}

fn disable_window_transitions(window: Window) {
  if let Ok(hwnd) = window.hwnd() {
    unsafe {
      DwmSetWindowAttribute(
        HWND(hwnd.0 as *mut c_void),
        DWMWA_TRANSITIONS_FORCEDISABLED,
        &mut BOOL::from(true) as *mut _ as *mut c_void,
        size_of::<BOOL>() as u32,
      ).unwrap();
    }
  }
}

fn handle_system_tray_event(app: &AppHandle, event: SystemTrayEvent) {
  let window = app.get_window("main").unwrap();

  match event {
    SystemTrayEvent::LeftClick { .. } => focus_window(&window),
    SystemTrayEvent::MenuItemClick { id, .. } => handle_menu_item_click(&window, id),
    _ => {}
  }
}

fn handle_menu_item_click(window: &Window, id: String) {
  match id.as_str() {
    "0" => focus_window(window),
    "1" => exit(0),
    _ => {}
  }
}

fn initialize(app: &mut App) -> Result<(), Box<dyn std::error::Error>> {
  util::dir::verify();

  let window = app.get_window("main").unwrap();

  set_window_position(&window);
  disable_window_transitions(window);

  Ok(())
}

fn main() {
  let open_btn_tray_item = CustomMenuItem::new("0", "Open toolbox");
  let quit_btn_tray_item = CustomMenuItem::new("1", "Quit toolbox");

  let tray_menu = SystemTrayMenu::new()
    .add_item(open_btn_tray_item)
    .add_item(quit_btn_tray_item);

  tauri::Builder::default()
    .setup(initialize)
    .system_tray(SystemTray::new().with_menu(tray_menu))
    .on_system_tray_event(handle_system_tray_event)
    .invoke_handler(tauri::generate_handler![
      config::theme::load_themes,
      config::theme::load_theme,
      module::steam::fetch_steam_games,
      module::commands::get_commands_json,
      module::commands::execute_command,
      util::string::trim,
      util::string::file_name,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
