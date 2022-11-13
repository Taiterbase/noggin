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
    let deleted = false;
    let noteStyle = "";
    if (selected) {
        noteStyle = "border-l-red-500 bg-slate-200"
    }

    return <div
        onClick={e => {
            e.preventDefault();
            let n = notes.notes.filter(n => n.id === id)[0];
            console.log(n);
            if (deleted) {
                console.log("note is archived");
                router.replace("/");
                return
            };
            setSelected(id);
            router.push({ pathname: "/[id]", query: { id: id }, });
        }}
        className={`max-h-24 max-w-56 flex flex-row justify-start border-l-4 whitespace-nowrap ${noteStyle} hover:border-l-red-500`}>
        <div className="flex flex-col justify-between pr-1 align-middle">
            <div className="flex-grow py-2 w-10">
                <p className=" px-2 text-sm">{`${diff.diff}${diff.unit}`}</p>
            </div>
            {
                selected &&
                <div
                    onClick={e => {
                        e.preventDefault();
                        deleted = true;
                        notes.archiveNote({ id: id });
                    }}
                    className="flex-shrink w-full py-2 cursor-pointer text-center">
                    X
                </div>
            }
        </div>
        <div className={`flex flex-col py-2 px-2 w-60 max-w-sm min-h-[5.5rem] border-b-[1px] overflow-hidden`}>
            <div className="flex-grow">
                <h2 className="truncate [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] whitespace-pre-wrap w-full text-lg font-semibold leading-5 before:content-none">{title}</h2>
            </div>
            <div className="flex-shrink">
                <p className="text-sm truncate font-light">{content}</p>
            </div>
        </div>
    </div>
}