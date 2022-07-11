// Connect to the notes database
use crate::commands::database::get_db_path;
use crate::models::{NoteRequest, NoteResponse};
use crate::parser::parser;
use rusqlite::{Connection, Result};

// Create a note
#[tauri::command]
pub async fn create_note(note: NoteRequest) -> NoteResponse {
    println!("content: {:?}", note.content);
    match send_insert_note_request(note).await {
        Ok(res) => {
            return res;
        }
        Err(_e) => {
            println!("Uh oh, something went wrong here!!");
            return NoteResponse {
                id: -1,
                content: "Couldn't create a new note.".to_owned(),
                modified: 0,
                created: 0,
                archived: 0,
            };
        }
    }
}

pub async fn send_insert_note_request(note: NoteRequest) -> Result<NoteResponse> {
    println!("Creating a note with content {:?}", note.content);
    let dbconstr = get_db_path();
    let conn = Connection::open(dbconstr)?;
    let mut stmt = conn.prepare(
        "INSERT INTO notes (
            content, 
            modified, 
            created, 
            archived, 
            deleted
        ) VALUES (
            (?1), 
            strftime('%s', 'now'), 
            strftime('%s', 'now'), 
            0, 
            0
        );",
    )?;
    let _createres = stmt.execute([note.content]);
    let id = conn.last_insert_rowid();
    println!("here's the id!!! {:?}", id);
    stmt = conn.prepare(
        "
            SELECT
                id, 
                content, 
                modified, 
                created,
                archived,
                deleted
            FROM notes 
            WHERE id = ?
            ORDER BY created DESC
            LIMIT 1;
        ",
    )?;
    let noteres = stmt.query_row([id], |row| {
        Ok(NoteResponse {
            id: row.get(0)?,
            content: row.get(1)?,
            modified: row.get(2)?,
            created: row.get(3)?,
            archived: row.get(4)?,
        })
    });
    return noteres;
}

#[tauri::command]
pub async fn update_note(note: NoteRequest) -> NoteResponse {
    match send_note_update_request(note).await {
        Ok(n) => {
            return n;
        }
        Err(e) => {
            println!("Error! {:?}", e);
            return NoteResponse {
                id: -1,
                content: "Couldn't update note.".to_owned(),
                modified: 0,
                created: 0,
                archived: 0,
            };
        }
    }
}

async fn send_note_update_request(note: NoteRequest) -> Result<NoteResponse> {
    println!("REQUEST CONTENT {:?}", note.content);
    let dbconstr = get_db_path();
    let conn = Connection::open(dbconstr)?;
    let mut stmt = conn.prepare(
        "UPDATE notes SET content=(?1), modified=strftime('%s', 'now'), archived=(?2) WHERE id = (?3);",
    )?;
    let _updateres = stmt.execute([note.content, note.archived.to_string(), note.id.to_string()]);
    stmt = conn
        .prepare("SELECT id, content, modified, created, archived FROM notes WHERE id = (?1);")?;
    let noteres = stmt.query_row([note.id], |row| {
        Ok(NoteResponse {
            id: row.get(0)?,
            content: row.get(1)?,
            modified: row.get(2)?,
            created: row.get(3)?,
            archived: row.get(4)?,
        })
    });
    return noteres;
}

#[tauri::command]
pub async fn read_notes() -> Vec<NoteResponse> {
    match send_note_read_all_request().await {
        Ok(n) => {
            return n;
        }
        Err(_e) => {
            return Vec::new();
        }
    }
}

async fn send_note_read_all_request() -> Result<Vec<NoteResponse>> {
    let dbconstr = get_db_path();
    let conn = Connection::open(dbconstr)?;
    let mut notes: Vec<NoteResponse> = Vec::new();
    let mut stmt = conn.prepare(
        "SELECT id, content, modified, created, archived FROM notes WHERE deleted <> 1 ORDER BY modified DESC;",
    )?;
    let res = stmt.query_map([], |row| {
        Ok(NoteResponse {
            id: row.get(0)?,
            content: row.get(1)?,
            modified: row.get(2)?,
            created: row.get(3)?,
            archived: row.get(4)?,
        })
    })?;
    for note in res {
        match note {
            Ok(n) => notes.push(n),
            Err(e) => println!("ERROR: {:?}", e),
        }
    }
    Ok(notes)
}

#[tauri::command]
pub async fn read_note(note: NoteRequest) -> NoteResponse {
    match send_note_read_request(note).await {
        Ok(n) => {
            return n;
        }
        Err(e) => {
            println!("Error! {:?}", e);
            return NoteResponse {
                id: -1,
                content: format!("couldn't fetch note"),
                archived: 0,
                created: 0,
                modified: 0,
            };
        }
    }
}

async fn send_note_read_request(note: NoteRequest) -> Result<NoteResponse> {
    let dbconstr = get_db_path();
    let conn = Connection::open(dbconstr)?;
    let mut stmt = conn
        .prepare("SELECT id, content, modified, created, archived FROM notes WHERE id = (?1);")?;
    let noteres = stmt.query_row([note.id], |row| {
        Ok(NoteResponse {
            id: row.get(0)?,
            content: row.get(1)?,
            modified: row.get(2)?,
            created: row.get(3)?,
            archived: row.get(4)?,
        })
    });
    return noteres;
}
