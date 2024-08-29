// use mailler::send_smtp;

#[tauri::command]
pub async fn send_mail() -> Result<(), String> {
    Ok(())
}
