import { NoteCardResponse } from "models/note";

export default function NoteInfobar(props: { noteCard: NoteCardResponse }) {
    if (props?.noteCard === null) {
        return <div className="fixed bottom-0 h-5 w-full flex flex-row flex-grow-0 bg-slate-300 z-30">
            {/* word count, spacing, styling drop-downs, line|column navigator, created date, history drop-down*/}
            <p className="text-sm">It's empty baby!</p>
        </div>
    } else {
        return (
            <div className="fixed bottom-0 h-5 w-full flex flex-row flex-grow-0 bg-slate-300 z-30">
                {/* word count, spacing, styling drop-downs, line|column navigator, created date, history drop-down*/}
                <p className="text-sm">{`${null}`}</p>
            </div>
        )
    }
}