import { invoke } from "@tauri-apps/api/tauri";
import { NoteProviderValues, NoteCardResponse, NoteInsertRequest, QueryResponse, NoteReadRequest, NoteUpdateRequest, NoteDeleteRequest, NoteArchiveRequest, NoteArchiveResponse } from "models/note";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

export const NotesContext = createContext<NoteProviderValues>(null);

export function NotesProvider(props: { children: ReactNode }) {
    const [notes, setNotes] = useState<NoteCardResponse[]>([])
    const { children } = props;

    useEffect(() => {
        invoke("read_note_list").then((res: NoteCardResponse[]) => {
            setNotes(res);
        }).catch(e => {
            console.log("hello big error")
            console.error(e);
        })
    }, []);

    const createNote = (note: NoteInsertRequest): Promise<QueryResponse> => {
        return new Promise((res, err) => {
            invoke("create_note", { note: note }).then(r => {
                return {
                    noteCard: r[0],
                    note: r[1],
                }
            }).then((r: QueryResponse) => {
                setNotes(n => {
                    return [r.noteCard, ...n];
                });
                res(r);
            }).catch(e => {
                console.error(e);
                err(e);
            })
        })
    }

    const readNoteCards = (): Promise<NoteCardResponse[]> => {
        return new Promise(async (res, err) => {
            return invoke("read_note_list", null).then((r: NoteCardResponse[]) => {
                setNotes(r);
                return res(r);
            }).catch(e => {
                console.log("error in readNoteCards");
                console.error(e);
                return err(e);
            })
        });
    }

    const getNoteCard = (note: NoteReadRequest): Promise<NoteCardResponse> => {
        return new Promise((res, err) => {
            return res(notes ? notes.find(n => n.id === note.id) : null);
        });
    }

    const readNote = (note: NoteReadRequest): Promise<QueryResponse> => {
        return new Promise((res, err) => {
            invoke("read_note", { note: note }).then(r => {
                return {
                    noteCard: r[0],
                    note: r[1],
                }
            }).then((r: QueryResponse) => {
                if (typeof r.note?.content === "string") {
                    try {
                        r.note.content = JSON.parse(r.note.content);
                    } catch (e) {
                        console.error(e);
                        r.note.content = {};
                    }
                }
                res(r);
            }).catch(e => {
                console.log("error in readNote");
                console.error(e);
                err(e);
            })
        });
    }

    const updateNote = (note: NoteUpdateRequest): Promise<QueryResponse> => {
        return new Promise((res, err) => {
            console.log("updating note in provider", note);
            invoke("update_note", { note: note }).then((r: QueryResponse) => {
                console.log(r);
                return {
                    noteCard: r[0],
                    note: r[1],
                }
            }).then((r: QueryResponse) => {
                if (r.noteCard.id <= 0) throw new Error(`Couldn't update note ${JSON.stringify(note)}`);
                if (typeof r.note?.content === "string") {
                    try {
                        r.note.content = JSON.parse(r.note.content);
                    } catch (e) {
                        console.error(e);
                        r.note.content = {};
                    }
                }
                res(r);
                setNotes(notes => {
                    return [r.noteCard, ...notes.filter((n) => n.id != r.noteCard.id)]
                })
            }).catch(error => {
                err(error);
            })
        });
    }

    const archiveNote = (note: NoteArchiveRequest): Promise<NoteArchiveResponse> => {
        return new Promise((res, err) => {
            console.log("archiving note in provider", note);
            invoke("archive_note", { note: note }).then((r: NoteArchiveResponse) => {
                console.log(
                    "archived note", r
                )
                if (r.id === -1) throw new Error("DB error, unable to archive note.");
                setNotes(notes => {
                    return notes.filter((n) => n.id !== r.id);
                });
            }).catch(error => {
                err(error);
            })
        });
    }

    const deleteNote = (note: NoteDeleteRequest): Promise<QueryResponse> => {
        return new Promise((res, err) => { res(null) });
    }


    // list of values associated with the provider. like an interface..
    const values: NoteProviderValues = {
        notes,
        createNote,
        readNote,
        readNoteCards,
        getNoteCard,
        updateNote,
        deleteNote,
        archiveNote,
    };

    return (
        <NotesContext.Provider value={values}>{children}</NotesContext.Provider>
    );
}

// useMap is the context hook
export const useNote = () => {
    const context = useContext(NotesContext);
    if (context === undefined) {
        throw new Error("`useNote` hook must be used within a `NotesContext` component.");
    }
    return context;
};