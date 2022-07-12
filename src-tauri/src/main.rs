#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod commands;
mod models;
use crate::commands::database::create_tables;
use crate::commands::notes::*;

fn main() {
  let res = create_tables();
  if res.err().is_some() {
    println!("There was an error creating tables. So uh. Not sure if the app will work.");
  }
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      create_note,
      read_note,
      read_notes,
      update_note,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
