import TimeSince from "components/time-since";
import { useRouter } from "next/router";

export default function HeaderNote({ note, selected, setSelected }) {
    const router = useRouter();
    const { id } = note;
    const diff = TimeSince(note.modified);
    let title = note.content || "";
    const content = note.content ? note.content.substring(0, 27) : "A beautiful new note.";
    let noteStyle = "";
    if (selected) {
        noteStyle = "border-l-amber-400 bg-amber-100"
    }

    return <div onClick={e => {
        setSelected(id);
        router.push({ pathname: "/[id]", query: { id: id } })
    }} className={`h-16 pointer-events-auto w-full flex flex-row border-l-4 ${noteStyle} hover:border-l-amber-400`}>
        <div className="w-12 h-full p-1">
            <p className="text-sm">{`${diff.diff}${diff.unit}`}</p>
        </div>
        <div className="flex flex-row pl-2 w-full h-full border-b-[1px] border-b-slate-100">
            <p>{`${content}`}</p>
        </div>
    </div>
}