import NoteBox from "components/notebox";
import { getLayout as NotesLayout } from "layouts/notes"; // effectively getLayout from layouts/home
import { NoteRequest, NoteResponse } from "models/note";
import { useRouter } from "next/router";
import { useNote } from "providers/notes-provider";
import { useEffect, useState } from "react";

function HomePage(props: any) {
    const useNotes = useNote();
    const router = useRouter()
    let notereq: NoteRequest = {
        id: -1,
        archived: 0,
        content: "",
        created: 0,
        modified: 0
    }
    const [note, setNote] = useState<NoteResponse>(notereq);

    useEffect(() => {
        try {
            let id = parseInt(router.query.id as string);
            notereq.id = id;
            useNotes.readNote(notereq).then(res => {
                setNote(res);
            }).catch(e => {
                console.log("couldn't load initial note", e);
                setNote(notereq);
            })
        } catch (e) {
            console.log("error loading initial note", e);
        }
    }, [router.query])

    const processUpdate = (id: number, content: string) => {
        console.log(`updating note ${note.id} with content ${content}`);
        let noteReq: NoteRequest = {
            ...note,
            id,
            content,
        };
        useNotes.updateNote(noteReq).then((res) => {
            setNote(res);
            console.log("Update complete:", res);
        }).catch((e) => {
            console.error("Couldn't update note", e);
        })
    }

    return (
        <div className="mx-auto w-full h-full flex flex-col overflow-auto ">
            <div className="p-7 pb-0 max-w-[600px] h-full w-full overflow-auto flex-grow-0 m-auto">
                {note.id <= 0 ? <div>error</div> :
                    <NoteBox id={note.id} content={note.content} processUpdate={processUpdate} />
                }
            </div>
            <div className="h-7 bg-amber-100"></div>
        </div>
    )
}

HomePage.getLayout = NotesLayout;
export default HomePage;