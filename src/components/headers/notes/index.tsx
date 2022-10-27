import { useRouter } from 'next/router'
import { useNote } from 'providers/notes-provider';
import { useEffect, useState } from 'react';
import { NoteCardResponse } from 'models/note';
import NoteSearchBar from './search-bar';
import NoteCard from './note-card';

export default function HomeHeader(props: { title?: string }) {
    const useNotes = useNote();
    const { title } = props;
    const router = useRouter();
    const [noteCards, setNoteCards] = useState<NoteCardResponse[]>([])
    const [selected, setSelected] = useState(-1);

    useEffect(() => {
        setInterval(() => {
            useNotes.readNoteCards().then(res => {
                setNoteCards(res);
            }).catch(e => {
                console.error(e);
            });
        }, 5000);
    }, [])

    useEffect(() => {
        // should add filter parameters to `readNoteCards`. Maybe `queryNoteCards`
        useNotes.readNoteCards().then(res => {
            setNoteCards(res);
        }).catch(e => {
            console.log("Couldn't refresh notes list.");
            console.error(e);
        })
    }, [useNotes.notes])

    return (
        <div key="notes-header" className="bg-slate-50 select-none z-30 min-w-[14rem] w-[14rem] max-w-[30rem] min-h-full border-r-[1px]">
            {/* notes search bar */}
            <NoteSearchBar />
            {/* notes list */}
            <div className="flex flex-col h-[calc(100vh-2.5rem)] overflow-y-auto">
                {noteCards.map((noteCard, i) => {
                    return <NoteCard key={noteCard.id} noteCard={noteCard} selected={selected === noteCard.id} setSelected={setSelected} />
                })}
            </div>
        </div >
    );
}