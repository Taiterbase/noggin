//import NoteBox from "components/notebox";
import Notebox from "components/note-box";
import { getLayout as NotesLayout } from "layouts/notes"; // effectively getLayout from layouts/home
import { NoteUpdateRequest, NoteResponse, NoteReadRequest, QueryResponse } from "models/note";
import { useRouter } from "next/router";
import { useNote } from "providers/notes-provider";
import { useEffect, useState } from "react";

function HomePage(props: any) {
    const useNotes = useNote();
    const router = useRouter();
    const [note, setNote] = useState<NoteResponse>({
        id: -1,
        content: {},
    });

    useEffect(() => {
        try {
            let id = parseInt(router.query.id as string);
            const noteReq: NoteReadRequest = { id };
            useNotes.readNote(noteReq).then(res => {
                console.log("Here's the note!!!", res);
                setNote(res.note);
            }).catch(e => {
                console.log("couldn't load initial note", e);
                setNote({ id: -1, content: {} });
            });
        } catch (e) {
            console.log("error loading initial note", e);
        }
        console.log(document.documentElement.scrollTop);
    }, [router.query]);

    const processUpdate = (id: number, contentjson: object) => {
        const content = JSON.stringify(contentjson);
        console.log(`updating note ${note.id} ${content}}`);
        const noteReq: NoteUpdateRequest = {
            id,
            content,
        };
        useNotes.updateNote(noteReq).then(res => res.note).then(note => {
            console.log("note response after update", note);
            setNote(note);
        }).catch((e) => {
            console.error("Couldn't update note", e);
        });
    };

    return (
        <div className="mb-5 w-full h-full flex flex-row justify-center overflow-y-auto">
            <Notebox id={note.id} content={note.content} processUpdate={processUpdate} />
        </div>
    );
}

HomePage.getLayout = NotesLayout;
export default HomePage;