import { invoke } from "@tauri-apps/api/tauri";
import { NoteProviderValues, NoteRequest, NoteResponse } from "models/note";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

export const NotesContext = createContext<NoteProviderValues>(null);

export function NotesProvider(props: { children: ReactNode }) {
    const [notes, setNotes] = useState<NoteResponse[]>([])
    const { children } = props;

    useEffect(() => {
        invoke("read_notes").then((res: NoteResponse[]) => {
            setNotes(res);
        }).catch(e => {
            console.log("hello big error")
            console.error(e);
        })
    }, []);

    const createNote = (note: NoteRequest): Promise<NoteResponse> => {
        return new Promise((res, err) => {
            invoke("create_note", { note: note }).then((r: NoteResponse) => {
                res(r);
                setNotes(n => {
                    return [r, ...n];
                });
            }).catch(e => {
                console.error(e);
                err(e);
            })
        })
    }

    const readNotes = (): Promise<NoteResponse[]> => {
        return new Promise((res, err) => {
            invoke("read_notes", null).then((r: NoteResponse[]) => {
                res(r);
            }).catch(e => {
                console.log("error in readNotes");
                console.error(e);
                err(e);
            })
        });
    }

    const readNote = (note: NoteRequest): Promise<NoteResponse> => {
        return new Promise((res, err) => {
            invoke("read_note", { note: note }).then((r: NoteResponse) => {
                res(r);
            }).catch(e => {
                console.log("error in readNote");
                console.error(e);
                err(e);
            })
        });
    }

    const updateNote = (note: NoteRequest): Promise<NoteResponse> => {
        return new Promise((res, err) => {
            invoke("update_note", { note: note }).then((r: NoteResponse) => {
                if (r.id <= 0) throw new Error(`Couldn't update note ${JSON.stringify(note)}`);
                setNotes(notes => {
                    return [r, ...notes.filter((n) => n.id != r.id)]
                })
                res(r);
            }).catch(error => {
                err(error);
            })
        });
    }

    const deleteNote = (note: NoteRequest): Promise<NoteResponse> => {
        return new Promise((res, err) => {
            res(null);
        });
    }


    // list of values associated with the provider. like an interface..
    const values: NoteProviderValues = {
        notes,
        createNote,
        readNote,
        readNotes,
        updateNote,
        deleteNote
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