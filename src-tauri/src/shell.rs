use std::process::Command;
use std::ptr;
use std::ffi::OsStr;
use std::os::windows::ffi::OsStrExt;

use winapi;

fn execute_command_without_admin(command: &str) -> bool {
    Command::new("cmd")
        .args(&[command])
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
pub fn execute_command(command: &str, requires_administrator: bool, display_cmd: bool) -> bool {
    let final_command = if display_cmd {
        format!("/c start cmd /k {}", command)
    } else {
        format!("/c {}", command)
    };

    if requires_administrator {
        execute_command_as_admin(&final_command)
    } else {
        execute_command_without_admin(&final_command)
    }
}
