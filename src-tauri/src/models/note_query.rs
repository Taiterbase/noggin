use serde::Deserialize;
use serde::Serialize;

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct NoteQuery {
    pub id: i64,
}

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct NoteQueryResponse {
    pub id: i64,
    pub content: String,
}

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct NoteCardResponse {
    pub id: i64,
    pub preview: NotePreview,
    pub modified: i64,
    pub created: i64,
    pub archived: i64,
}

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct NotePreview {
    pub title: String,
    pub content: String,
}

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct NoteArchiveResponse {
    pub id: i64,
    pub archived: i64,
}
