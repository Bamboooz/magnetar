use std::process::Command;
use std::ptr;
use std::ffi::OsStr;
use std::os::windows::ffi::OsStrExt;

use winapi;

use crate::filesystem::get_magnetar_path;

fn execute_command_without_admin(command: &str) -> bool {
    let commands_path = &get_magnetar_path().join("commands").display().to_string();

    Command::new("cmd.exe")
        .args(&["/c", &format!("cd {} && {}", commands_path, command)])
        .status()
        .expect("Failed to execute a command")
        .success()
}

fn execute_command_as_admin(command: &str) -> bool {
    unsafe {
        let verb = OsStr::new("runas").encode_wide().chain(Some(0).into_iter()).collect::<Vec<_>>();
        let file = OsStr::new("cmd.exe").encode_wide().chain(Some(0).into_iter()).collect::<Vec<_>>();
        let parameters = OsStr::new(&format!("{}", command)).encode_wide().chain(Some(0).into_iter()).collect::<Vec<_>>();

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

#[tauri::command]
pub fn execute_command(command: &str, admin: bool) -> bool {
    if admin {
        execute_command_as_admin(command)
    } else {
        execute_command_without_admin(command)
    }
}
