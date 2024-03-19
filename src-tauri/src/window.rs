use tauri::{AppHandle, Manager};

pub fn show_and_focus_window(app: &AppHandle) {
    let window = app.get_window("main").unwrap();

    window.show().unwrap();
    window.set_focus().unwrap();
}
