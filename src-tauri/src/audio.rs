#[derive(Debug, serde::Serialize, serde::Deserialize)]
pub struct AudioDevice {
    name: String,
    is_input: bool,
}

#[tauri::command]
pub fn list_audio_devices() -> Result<Vec<AudioDevice>, String> {
    Ok(vec![])
}

fn set_input_device_volume(device: AudioDevice, volume: u8) -> Result<(), String> {
    Ok(())
}

fn set_output_device_volume(device: AudioDevice, volume: u8) -> Result<(), String> {
    Ok(())
}

#[tauri::command]
pub fn set_device_volume(device: AudioDevice, volume: u8) -> Result<(), String> {
    if device.is_input {
        return set_input_device_volume(device, volume);
    }

    set_output_device_volume(device, volume)
}

fn get_input_device_volume(device: AudioDevice) -> Result<u8, String> {
    Ok(0)
}

fn get_output_device_volume(device: AudioDevice) -> Result<u8, String> {
    Ok(0)
}

#[tauri::command]
pub fn get_device_volume(device: AudioDevice) -> Result<u8, String> {
    if device.is_input {
        return get_input_device_volume(device);
    }

    get_output_device_volume(device)
}
