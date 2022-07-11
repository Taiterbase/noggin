import { useEditor, EditorContent } from '@tiptap/react'
import { NoteRequest } from 'models/note';
import { useNote } from 'providers/notes-provider';
import { useEffect } from 'react';
import StarterKit from '@tiptap/starter-kit';

const NoteBox = (props: any) => {
    const { note, processUpdate } = props;


    const editor = useEditor({
        extensions: [
            StarterKit
        ],
        editorProps: {
            attributes: {
                class: 'max-w-none text-xs  mx-auto focus:outline-none',
            },
        },
        autofocus: true,
        content: note.content,
        onUpdate({ editor }) {
            let content = JSON.stringify(editor.getJSON(), null, 0);
            processUpdate(content);
        },
    });


    useEffect(() => {
        if (!editor) return;
        let content = JSON.parse(note.content);
        editor.commands.setContent(content);
    }, [note.id])

    return <EditorContent editor={editor} onChange={props.onChange} />
}

export default NoteBox;