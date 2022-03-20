#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::*;

fn toggle_window_visibility(window: &Window) {
    if window.is_visible().unwrap_or(true) {
        window.hide().unwrap_or_default();
    } else {
        window.show().unwrap_or_default();
        window.maximize().unwrap_or_default();
        window.set_focus().unwrap_or_default();
        window
            .emit("focused", Option::<String>::None)
            .unwrap_or_default();
    }
}

fn system_tray_event(app: &AppHandle, event: SystemTrayEvent) {
    match event {
        SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
            "quit" => std::process::exit(0),
            _ => {}
        },
        SystemTrayEvent::LeftClick {
            position: _,
            size: _,
            ..
        } => {
            if let Some(window) = app.get_window("main") {
                toggle_window_visibility(&window);
            }
        }
        _ => {}
    }
}

fn main() {
    let tray_menu = SystemTrayMenu::new().add_item(CustomMenuItem::new("quit", "Quit"));
    tauri::Builder::default()
        .system_tray(SystemTray::new().with_menu(tray_menu))
        .on_system_tray_event(system_tray_event)
        .setup(|app| {
            // listen to global shortcut
            if let Some(window) = app.get_window("main") {
                app.global_shortcut_manager()
                    .register("SUPER+/", move || {
                        toggle_window_visibility(&window);
                    })
                    .unwrap_or_default();
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
