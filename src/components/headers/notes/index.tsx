import { invoke } from '@tauri-apps/api/tauri';
import { useRouter } from 'next/router'
import { useNote } from 'providers/notes-provider';
import { useEffect, useState } from 'react';
import HeaderNote from './note';
import Image from "next/image";
import CreateNoteIcon from 'components/icons/create-note';
import { NoteRequest, NoteResponse } from 'models/note';
import NoteSearchBar from './search-bar';

export default function HomeHeader(props: { title?: string }) {
    const useNotes = useNote();
    const { title } = props;
    const router = useRouter();
    const [notes, setNotes] = useState<NoteResponse[]>([])
    const [selected, setSelected] = useState(-1);

    useEffect(() => {
        useNotes.readNotes().then(res => {
            console.debug(`Notes List:`, res);
            setNotes(res);
        }).catch(e => {
            console.error(e);
        })
    }, [])

    useEffect(() => {
        // readNotes with a filter parameter
        useNotes.readNotes().then(res => {
            setNotes(res);
        }).catch(e => {
            console.log("Couldn't refresh notes list.");
            console.error(e);
        })
    }, [useNotes.notes])

    return (
        <div key="notes-header" className="bg-amber-50 select-none z-30 min-w-[14rem] w-[14rem] max-w-[30rem] min-h-full border-r-[1px]">
            {/* notes search bar */}
            <NoteSearchBar />
            {/* notes list */}
            <div className="h-[calc(100vh-2.5rem)] w-full overflow-y-auto  hover:scrollbar-thumb-gray-300 scrollbar-thumb-black scrollbar-track-transparent">
                {notes.map((note, i) => {
                    return <HeaderNote key={note.id} note={note} selected={selected === note.id} setSelected={setSelected} />
                })}
            </div>
        </div >
    );
}