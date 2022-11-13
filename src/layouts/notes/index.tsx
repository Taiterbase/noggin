import NotesHeader from "components/note-header";
import NoteInfobar from "components/note-infobar";

import { getLayout as TagsLayout } from "layouts/tags";
import { NoteCardResponse } from "models/note";
import { useRouter } from "next/router";
import { useNote } from "providers/notes-provider";
import { ReactNode, useEffect, useState } from "react";
export function NotesLayout(props: { children: ReactNode; }) {
    const { children } = props;
    const router = useRouter();
    const note = useNote();
    const [noteCard, setNoteCard] = useState<NoteCardResponse>(null);

    useEffect(() => {
        let id = parseInt(router.query.id as string);
        note.getNoteCard({ id }).then((notecard) => {
            setNoteCard(notecard);
        });
    }, []);

    return (
        <>
            <NotesHeader />
            <div className="flex flex-grow flex-col">
                <main className="bg-slate-50 h-screen flex flex-col justify-start">
                    {children}
                </main>
            </div>
            <NoteInfobar noteCard={noteCard} />
        </>
    )
}

export function getLayout(page: ReactNode) {
    return TagsLayout(<NotesLayout>{page}</NotesLayout>)
}