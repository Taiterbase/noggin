use rusqlite::{Connection, Result};

pub fn get_db_path() -> String {
    let dbstr = tauri::api::path::local_data_dir();
    match dbstr {
        Some(s) => {
            let pname = s.into_os_string().to_str().unwrap().to_owned() + "/noggin";
            let path_exists = std::fs::metadata(pname.clone()).is_ok();
            if !path_exists {
                let create_res = std::fs::create_dir(pname.to_owned());
                if create_res.is_err() {
                    println!("Couldn't create directory for Noggin!");
                }
            }
            return pname.clone() + "/noggin.db";
        }
        None => std::process::exit(1),
    }
}

pub fn create_tables() -> Result<usize> {
    let dbconstr = get_db_path();
    println!("path {:?}", dbconstr);

    let conn = Connection::open(dbconstr)?;

    let mut stmt = conn.prepare("
            CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, content TEXT, modified INTEGER, created INTEGER, archived INTEGER, deleted INTEGER);
            CREATE TABLE IF NOT EXISTS tags (id INTEGER PRIMARY KEY, tag TEXT);
            CREATE TABLE IF NOT EXISTS note_tag (tag_id TEXT, note_id INTEGER, FOREIGN KEY(note_id) REFERENCES note(id), FOREIGN KEY(tag_id) REFERENCES (tags.id), PRIMARY KEY (tag_id, note_id));
        "
    )?;
    let res = stmt.execute([]);
    println!("resolve {:?}", res);
    return res;
}
