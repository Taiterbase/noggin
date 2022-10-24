// Connect to the notes database
use crate::commands::database::get_db_path;
use crate::models::{note_intake::*, note_query::*};
use crate::utils::notes::generate_preview;
use rusqlite::{Connection, Result};

// Create a note
#[tauri::command]
pub async fn create_note(note: NoteInsertRequest) -> (NoteCardResponse, NoteQueryResponse) {
    match send_insert_note_request(note).await {
        Ok(res) => {
            return res;
        }
        Err(_e) => {
            return (
                NoteCardResponse::default(),
                NoteQueryResponse {
                    id: -1,
                    content: "Couldn't create a new note.".to_owned(),
                },
            )
        }
    }
}

pub async fn send_insert_note_request(
    note: NoteInsertRequest,
) -> Result<(NoteCardResponse, NoteQueryResponse)> {
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
    stmt = conn.prepare(
        "
            SELECT id, content, modified, created, archived
            FROM notes 
            WHERE id = ?
            ORDER BY created DESC
            LIMIT 1;
        ",
    )?;
    let noteres = stmt.query_row([id], |row| {
        let content: String = match row.get(1) {
            Ok(str) => str,
            Err(e) => format!("{}", e),
        };
        // generate preview
        let preview: NotePreview = generate_preview(content);
        Ok((
            NoteCardResponse {
                id: row.get(0)?,
                preview,
                modified: row.get(2)?,
                created: row.get(3)?,
                archived: row.get(4)?,
            },
            NoteQueryResponse {
                id: row.get(0)?,
                content: row.get(1)?,
            },
        ))
    });
    return noteres;
}

#[tauri::command]
pub async fn update_note(note: NoteContentUpdateRequest) -> (NoteCardResponse, NoteQueryResponse) {
    println!("Received update request!");
    match send_note_update_request(note).await {
        Ok(n) => {
            return n;
        }
        Err(e) => {
            println!("Error! {:?}", e);
            return (
                NoteCardResponse::default(),
                NoteQueryResponse {
                    id: -1,
                    content: "Couldn't update note.".to_owned(),
                },
            );
        }
    }
}

async fn send_note_update_request(
    note: NoteContentUpdateRequest,
) -> Result<(NoteCardResponse, NoteQueryResponse)> {
    let dbconstr = get_db_path();
    let conn = Connection::open(dbconstr)?;
    let mut stmt = conn.prepare(
        "
            UPDATE notes 
            SET content=(?1), modified=strftime('%s', 'now') 
            WHERE id = (?2);
        ",
    )?;
    let _updateres = stmt.execute([note.content, note.id.to_string()]);
    stmt = conn.prepare(
        "
            SELECT id, content, modified, created, archived
            FROM notes 
            WHERE id = (?1);
        ",
    )?;
    let noteres = stmt.query_row([note.id], |row| {
        let content: String = match row.get(1) {
            Ok(str) => str,
            Err(e) => format!("{}", e),
        };
        // generate preview
        let preview: NotePreview = generate_preview(content);
        Ok((
            NoteCardResponse {
                id: row.get(0)?,
                preview,
                modified: row.get(2)?,
                created: row.get(3)?,
                archived: row.get(4)?,
            },
            NoteQueryResponse {
                id: row.get(0)?,
                content: row.get(1)?,
            },
        ))
    });
    return noteres;
}

#[tauri::command]
pub async fn read_note_list() -> Vec<NoteCardResponse> {
    match send_note_read_all_request().await {
        Ok(n) => {
            return n;
        }
        Err(_e) => {
            return Vec::new();
        }
    }
}

async fn send_note_read_all_request() -> Result<Vec<NoteCardResponse>> {
    let dbconstr = get_db_path();
    let conn = Connection::open(dbconstr)?;
    let mut notes: Vec<NoteCardResponse> = Vec::new();
    let mut stmt = conn.prepare(
        "SELECT id, content, modified, created, archived FROM notes WHERE deleted <> 1 ORDER BY modified DESC;",
    )?;
    let res = stmt.query_map([], |row| {
        let content: String = match row.get(1) {
            Ok(str) => str,
            Err(e) => format!("{}", e),
        };
        // generate preview
        let preview: NotePreview = generate_preview(content);
        Ok(NoteCardResponse {
            id: row.get(0)?,
            preview,
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
pub async fn read_note(note: NoteQuery) -> (NoteCardResponse, NoteQueryResponse) {
    match send_note_read_request(note).await {
        Ok(n) => {
            return n;
        }
        Err(e) => {
            println!("Error! {:?}", e);
            return (
                NoteCardResponse::default(),
                NoteQueryResponse {
                    id: -1,
                    content: format!("couldn't fetch note"),
                },
            );
        }
    }
}

async fn send_note_read_request(note: NoteQuery) -> Result<(NoteCardResponse, NoteQueryResponse)> {
    let dbconstr = get_db_path();
    let conn = Connection::open(dbconstr)?;
    let mut stmt = conn.prepare(
        "
        SELECT id, content, modified, created, archived
        FROM notes 
        WHERE id = (?1);
        ",
    )?;
    let noteres = stmt.query_row([note.id], |row| {
        let content: String = match row.get(1) {
            Ok(str) => str,
            Err(e) => format!("{}", e),
        };
        // generate preview
        let preview: NotePreview = generate_preview(content);
        Ok((
            NoteCardResponse {
                id: row.get(0)?,
                preview,
                modified: row.get(2)?,
                created: row.get(3)?,
                archived: row.get(4)?,
            },
            NoteQueryResponse {
                id: row.get(0)?,
                content: row.get(1)?,
            },
        ))
    });
    return noteres;
}
