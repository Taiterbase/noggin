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
        noteStyle = "border-l-red-500 bg-slate-200"
    }

    return <div
        onClick={e => {
            setSelected(id);
            router.push({ pathname: "/[id]", query: { id: id } })
        }}
        className={`py-2 max-h-24 max-w-56 flex flex-row justify-start border-l-4 border-b-[1px] whitespace-nowrap ${noteStyle} hover:border-l-red-500`}>
        <div className="pt-1 w-10">
            <p className=" px-2 text-sm">{`${diff.diff}${diff.unit}`}</p>
        </div>
        <div className="w-[10rem] h-full">
            <div className="h-8 w-full">
                <h2 className="text-lg overflow-hidden text-ellipsis font-normal before:content-none">{title}</h2>
            </div>
            <div className="h-8 min-w-[10rem] text-ellipsis">
                <p className="text-sm overflow-hidden text-ellipsis font-light">{content}</p>
            </div>
        </div>
    </div>
}