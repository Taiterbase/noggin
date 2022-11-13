import ArchiveNoteIcon from "components/icons/archive-note"
import TimeSince from "components/time-since";
import { useRouter } from "next/router";
import { useNote } from "providers/notes-provider";
import { useEffect } from "react";

export default function NoteCard({ noteCard, selected, setSelected }) {
    const router = useRouter();
    const notes = useNote();
    const { id } = noteCard;
    const diff = TimeSince(noteCard.modified);
    const title = noteCard.preview.title;
    const content = noteCard.preview.content;
    let noteStyle = "";
    if (selected) {
        noteStyle = "border-l-red-500 bg-slate-200"
    }

    return <div
        onClick={e => {
            setSelected(id);
            console.log(noteCard)
            router.push({ pathname: "/[id]", query: { id: id }, });
        }}
        className={`max-h-24 max-w-56 flex flex-row justify-start border-l-4 whitespace-nowrap ${noteStyle} hover:border-l-red-500`}>
        <div className="flex flex-col justify-between pr-1 align-middle">
            <div className="py-2 w-10">
                <p className=" px-2 text-sm">{`${diff.diff}${diff.unit}`}</p>
            </div>
            {
                // we should be able to delete a note just by right clicking the card
                selected &&
                <div className="flex-grow p-2 w-full h-4">
                    <div onClick={() => {
                        //delete the note
                        notes.archiveNote({ id: id }).then(() => {
                            router.push({ pathname: "/" })
                        });
                    }}
                    >
                        X
                    </div>
                </div>
            }
        </div>
        <div className="py-2 w-60 max-w-[20rem] h-full border-b-[1px] overflow-hidden ">
            <div className="h-8 w-full overflow-hidden">
                <h2 className="text-lg overflow-hidden text-ellipsis font-normal before:content-none">{title}</h2>
            </div>
            <div className="h-8 max-w-[20rem] overflow-hidden">
                <p className="text-sm overflow-hidden text-ellipsis font-light">{content}</p>
            </div>
        </div>
    </div>
}