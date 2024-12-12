use std::{ffi::c_void, mem::size_of};
use tauri::{AppHandle, Manager, PhysicalPosition, PhysicalSize, Position, WebviewWindow};
use windows::Win32::{
    Foundation::{BOOL, HWND},
    Graphics::Dwm::{DwmSetWindowAttribute, DWMWA_TRANSITIONS_FORCEDISABLED},
};

pub fn show_window(app: &AppHandle) {
    if let Some(window) = app.get_webview_window("main") {
        let _ = window.show();
        let _ = window.set_focus();
    }
}

pub fn set_window_position(window: &WebviewWindow) {
    if let Ok(Some(screen)) = window.current_monitor() {
        if let Ok(window_size) = window.outer_size() {
            let screen_position = screen.position();

            let screen_size = PhysicalSize::<i32> {
                width: screen.size().width as i32,
                height: screen.size().height as i32,
            };

            let window_position = PhysicalPosition {
                x: screen_position.x + (screen_size.width - (window_size.width as i32)),
                y: screen_size.height
                    - (window_size.height - (screen_position.y as u32)) as i32
                    - 50,
            };

            window
                .set_position(Position::Physical(window_position))
                .unwrap();
        }
    }
}

pub fn disable_transitions(window: WebviewWindow) {
    if let Ok(hwnd) = window.hwnd() {
        unsafe {
            DwmSetWindowAttribute(
                HWND(hwnd.0),
                DWMWA_TRANSITIONS_FORCEDISABLED,
                &mut BOOL::from(true) as *mut _ as *mut c_void,
                size_of::<BOOL>() as u32,
            )
            .unwrap();
        }
    }
}
