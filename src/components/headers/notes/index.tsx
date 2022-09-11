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
        setInterval(() => {
            useNotes.readNotes().then(res => {
                setNotes(res);
            }).catch(e => {
                console.error(e);
            });
        }, 5000);
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
            <div className="flex flex-col h-[calc(100vh-2.5rem)] overflow-y-auto">
                {notes.map((note, i) => {
                    return <HeaderNote key={note.id} note={note} selected={selected === note.id} setSelected={setSelected} />
                })}
            </div>
        </div >
    );
}