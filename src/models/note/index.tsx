export type NoteRequest = {
    id: number;
    content: string;
    modified: number;
    created: number;
    archived: number;
}

export type NoteResponse = {
    id: number;
    content: string;
    title: string;
    modified: number;
    created: number;
    archived: number;
}

export type Note = {
    id: number;
    content: string;
    title: string;
    preview: string;
    modified: number;
    created: number;
    archived: number;
}

export type NoteProviderValues = {
    notes: NoteResponse[];
    createNote: (note: NoteRequest) => Promise<NoteResponse>;
    readNotes: () => Promise<NoteResponse[]>;
    readNote: (note: NoteRequest) => Promise<NoteResponse>;
    updateNote: (note: NoteRequest) => Promise<NoteResponse>;
    deleteNote: (note: NoteRequest) => Promise<NoteResponse>;
}