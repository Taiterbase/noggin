import CreateNoteIcon from "components/icons/create-note";
import { NoteInsertRequest, QueryResponse } from "models/note";
import { useRouter } from "next/router";
import { useNote } from "providers/notes-provider";
import { getSchema } from '@tiptap/core'
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";


export default function NoteSearchBar() {
    const useNotes = useNote();
    const router = useRouter();


    const createNote = (e) => {
        e.preventDefault();
        console.log(e);

        let content = "{\"type\":\"doc\",\"content\":[{\"type\":\"heading\",\"attrs\":{\"level\":1}}]}";

        let newNote: NoteInsertRequest = { content }
        useNotes.createNote(newNote).then((res: QueryResponse) => {
            if (res.noteCard.id >= 0) {
                router.push({ pathname: "/[id]", query: { id: res.noteCard.id, note: JSON.stringify(res) } });
            } else {
                throw new Error;
            }
        }).catch(e => {
            console.log("Couldn't create a new note.");
            console.error(e);
        });
    }

    return <div className="bg-slate-50 border-b-[1px] h-10">
        <div className="w-full h-full flex flex-row p-2 pr-0">
            <input placeholder="Search Notes" className="transition ease-in-out focus:outline-none focus:ring-amber-100 focus:text-left border-[1px] border-slate-200 p-1 bg-zinc-100 focus:bg-zinc-50 text-center text-sm rounded-sm h-6 justify-center z-[9999] m-auto placeholder-slate-500" />
            <div className='w-full h-full flex'>
                <CreateNoteIcon onClick={e => createNote(e)} />
            </div>
        </div>
    </div>
}