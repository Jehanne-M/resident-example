// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod commands;
mod config;
mod database;
mod mailer;

use tauri::{CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu};

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let handle = app.handle();

            // SystemTray settings
            SystemTray::new()
                .with_id("main")
                .with_menu(SystemTrayMenu::new().add_item(CustomMenuItem::new("quit", "Quit")))
                .on_event(move |event| {
                    if let SystemTrayEvent::MenuItemClick { id, .. } = event {
                        if id == "quit" {
                            // Obtains and destorys the tasktray menu id from the app handler.
                            // Otherwise, it will remain in the tasktray.
                            let tray_handle = handle.tray_handle_by_id("main").unwrap();
                            tray_handle.destroy().unwrap();

                            // Send application exit code.
                            handle.exit(0);
                        }
                    }
                })
                .build(app)
                .unwrap();
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
