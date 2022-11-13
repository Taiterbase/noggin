// Requests
export type NoteReadRequest = {
    id: number;
}

export type NoteCardsRequest = {
    // maybe user / auth stuff?
}

export type NoteInsertRequest = {
    content: string;
}

export type NoteUpdateRequest = {
    id: number;
    content: string;
}

export type NoteArchiveRequest = {
    id: number;
}

export type NoteDeleteRequest = {
    id: number;
}

export type Note = {
    id: number;
    content: object;
}

export type NoteCard = {
    id: number;
    preview: NotePreview;
    modified: number;
    created: number;
    archived: number;
}

export type NotePreview = {
    title: string;
    content: string;
}

// Responses

export type NoteResponse = {
    id: number;
    content: object;
    // word count, lines, time to read
    // other generated values from the card's content
    // done in rust and sent over to here
}

export type NoteCardResponse = {
    id: number;
    preview: NotePreview;
    title: string;
    modified: number;
    created: number;
    archived: number;
}

export type NoteArchiveResponse = {
    id: number;
    archived: number;
}

export type QueryResponse = {
    note: NoteResponse;
    noteCard: NoteCardResponse;
}

// Note Provider interface
export type NoteProviderValues = {
    notes: NoteCardResponse[];
    createNote: (note: NoteInsertRequest) => Promise<QueryResponse>;
    readNoteCards: () => Promise<NoteCardResponse[]>;
    getNoteCard: (note: NoteReadRequest) => Promise<NoteCardResponse>;
    readNote: (note: NoteReadRequest) => Promise<QueryResponse>;
    updateNote: (note: NoteUpdateRequest) => Promise<QueryResponse>;
    deleteNote: (note: NoteDeleteRequest) => Promise<QueryResponse>;
    archiveNote: (note: NoteArchiveRequest) => Promise<NoteArchiveResponse>;
}
