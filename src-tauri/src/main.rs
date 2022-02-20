#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::*;

fn toggle_window_visibility(window: &Window) {
    if window.is_visible().unwrap() {
        window.hide().unwrap();
    } else {
        window.show().unwrap();
        window.maximize().unwrap();
        window.set_focus().unwrap();
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
                    .unwrap();
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
