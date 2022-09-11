use models::NoteResponse;

pub async fn get_notes_title(notes: Vec<NoteResponse>) -> Vec<NoteResponse> {
    notes
}

async fn parse_note_title(note: NoteResponse) -> NoteResponse {
    note
}
