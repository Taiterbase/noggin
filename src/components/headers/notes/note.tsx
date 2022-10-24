import TimeSince from "components/time-since";
import { useRouter } from "next/router";

export default function NoteCard({ noteCard, selected, setSelected }) {
    const router = useRouter();
    const { id } = noteCard;
    const diff = TimeSince(noteCard.modified);
    let title = noteCard.preview.title;
    const content = noteCard.preview.content;
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
        <div className="flex flex-col w-full h-full border-b-[1px] border-b-slate-100">
            <div className=""
            // title
            >
                <h3 className="before:content-['']">{title}</h3>
            </div>
            <div className=""
            // content
            >
                <p>{content}</p>
            </div>
        </div>
    </div>
}