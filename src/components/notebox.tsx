import { useEditor, EditorContent } from '@tiptap/react'
import { useEffect } from 'react';
import StarterKit from '@tiptap/starter-kit';

const NoteBox = (props: any) => {
    const { id, content, processUpdate } = props;

    const editor = useEditor({
        extensions: [
            StarterKit
        ],
        editorProps: {
            attributes: {
                class: 'prose text-sm mx-auto focus:outline-none',
            },
        },
        autofocus: true,
        content: content
    });

    useEffect(() => {
        if (!editor) return
        try {
            editor.off("update");
            editor.on("update", ({ editor }) => {
                let noteContent = editor.getHTML();
                console.log(`processing update for note ${id}`)
                processUpdate(id, noteContent);
            })
            let noteContent = content;
            editor.commands.clearContent();
            editor.commands.setContent(noteContent);
        } catch (e) {
            console.error("Could not parse note JSON", e);
        }
    }, [id])

    return <EditorContent editor={editor} />
}

export default NoteBox;