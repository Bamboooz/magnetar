use winreg::{enums::HKEY_CURRENT_USER, RegKey};

pub fn locate_steam_exe() -> Option<String> {
    let hkcu = RegKey::predef(HKEY_CURRENT_USER);
    let key = hkcu.open_subkey("SOFTWARE\\Valve\\Steam").ok()?;
    let exe: String = key.get_value("SteamExe").ok()?;

    Some(exe)
}
