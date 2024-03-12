use std::process::Command;
use std::ptr;
use std::ffi::OsStr;
use std::os::windows::ffi::OsStrExt;

use winapi;

#[tauri::command]
pub fn execute_command(command: &str) -> String {
    let status = Command::new("cmd")
        .args(&["/c", &format!("start cmd /k {}", command)])
        .status()
        .expect("Failed to execute command");

    status.to_string()
}

#[tauri::command]
pub fn execute_command_as_admin(command: &str) -> bool {
    unsafe {
        let verb = OsStr::new("runas").encode_wide().chain(Some(0).into_iter()).collect::<Vec<_>>();
        let file = OsStr::new("cmd.exe").encode_wide().chain(Some(0).into_iter()).collect::<Vec<_>>();
        let parameters = OsStr::new(&format!("/c start cmd /k {}", command)).encode_wide().chain(Some(0).into_iter()).collect::<Vec<_>>();

        let result = winapi::um::shellapi::ShellExecuteW(
            ptr::null_mut(),
            verb.as_ptr(),
            file.as_ptr(),
            parameters.as_ptr(),
            ptr::null(),
            winapi::um::winuser::SW_SHOWNORMAL as winapi::um::winnt::INT,
        ) as isize;

        result > 32
    }
}
