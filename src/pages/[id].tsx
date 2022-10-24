//import NoteBox from "components/notebox";
import Notebox from "components/notebox";
import { getLayout as NotesLayout } from "layouts/notes"; // effectively getLayout from layouts/home
import { NoteUpdateRequest, NoteResponse } from "models/note";
import { useRouter } from "next/router";
import { useNote } from "providers/notes-provider";
import { useEffect, useState } from "react";

function HomePage(props: any) {
    const useNotes = useNote();
    const router = useRouter();
    let notereq: NoteUpdateRequest = {
        id: -1,
        content: "",
    };
    const [note, setNote] = useState<NoteResponse>({ ...notereq });

    useEffect(() => {
        try {
            let id = parseInt(router.query.id as string);
            notereq.id = id;
            useNotes.readNote({ ...notereq }).then(res => {
                console.log("Here's the note!!!", res[1]);
                setNote(res.note);
            }).catch(e => {
                console.log("couldn't load initial note", e);
                setNote({ ...notereq });
            })
        } catch (e) {
            console.log("error loading initial note", e);
        }
    }, [router.query]);

    const processUpdate = (id: number, content: string) => {
        console.log(`updating note ${note.id} ${content}`);
        let noteReq: NoteUpdateRequest = {
            id,
            content,
        };
        useNotes.updateNote(noteReq).then(res => res.note).then(note => {
            console.log("note response after update", note);
            setNote(note);
        }).catch((e) => {
            console.error("Couldn't update note", e);
        })
    };

    return (
        <div className="mx-auto mb-5 w-full h-full flex flex-col overflow-auto">
            {note.id <= 0 ? null :
                <Notebox id={note.id} content={note.content} processUpdate={processUpdate} />
            }
            <div className="absolute bottom-0 h-5 w-full flex flex-row flex-grow-0 bg-amber-100">
                <div className="h-full flex flex-row justify-center flex-grow-0">
                    <p className="text-sm"> Bottom toolbar</p>
                </div>
                {/* word count, spacing, styling drop-downs, line|column navigator, date, history drop-down*/}
            </div>
        </div>
    );
}

HomePage.getLayout = NotesLayout;
export default HomePage;