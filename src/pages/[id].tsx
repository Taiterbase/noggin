import { ContentEditable } from "components/notebox";
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
                console.log("here's the res", res)
                setNote(res);
            }).catch(e => {
                console.log("couldn't load initial note", e);
                setNote(notereq);
            })
        } catch (e) {
            console.log("error loading initial note", e);
        }
    }, [router.query])

    const processUpdate = (e) => {
        console.log(e.currentTarget.innerText);
        let note_req: NoteRequest = {
            ...note,
            content: e.currentTarget.innerText
        };
        useNotes.updateNote(note_req).then(res => {
            console.log("result of update", res);
            setNote(res);
        }).catch(e => {
            console.log("update fialed", e);
        })
    }

    return (
        <div className="p-7 mx-auto w-full h-full overflow-auto">
            <div className="max-w-[600px] h-auto overflow-auto flex-grow-0 m-auto">
                <ContentEditable className="inline-block whitespace-pre-wrap bg-transparent w-full h-auto resize-none outline-none flex-grow-0"
                    html={note.content} onBlur={null} onChange={e => processUpdate(e)} />
            </div>
        </div>
    )
}

HomePage.getLayout = NotesLayout;
export default HomePage;