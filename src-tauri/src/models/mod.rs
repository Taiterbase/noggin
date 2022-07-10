use serde::Deserialize;
use serde::Serialize;

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct NoteResponse {
    pub id: i64,
    pub content: String,
    pub modified: i64,
    pub created: i64,
    pub archived: i64,
}

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct NoteRequest {
    pub id: i64,
    pub content: String,
    pub modified: i64,
    pub created: i64,
    pub archived: i64,
}

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct Tag {
    pub id: i64,
    pub tag: String,
}
