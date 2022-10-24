use serde::Deserialize;
use serde::Serialize;

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct NoteContentUpdateRequest {
    pub id: i64,
    pub content: String,
}

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct NoteInsertRequest {
    pub content: String,
}

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct NoteArchiveRequest {
    pub id: i64,
}

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct NoteDeletedRequest {
    pub id: i64,
}
