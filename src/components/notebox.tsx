import { useEditor, EditorContent } from '@tiptap/react'
import { useEffect } from 'react';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import History from "@tiptap/extension-history";
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Code from '@tiptap/extension-code';
import Color from '@tiptap/extension-color';
import Gapcursor from '@tiptap/extension-gapcursor';
import ListItem from '@tiptap/extension-list-item';
import Placeholder from '@tiptap/extension-placeholder';
import Strike from '@tiptap/extension-strike';
import HardBreak from '@tiptap/extension-hard-break';
import Typography from '@tiptap/extension-typography';
import Emoji, { emojis, gitHubEmojis, gitHubCustomEmojis } from '@tiptap-pro/extension-emoji'
import Link from '@tiptap/extension-link';
import OrderedList from '@tiptap/extension-ordered-list';
import BulletList from '@tiptap/extension-bullet-list';
import BlockQuote from "@tiptap/extension-blockquote";
import Highlight from "@tiptap/extension-highlight";
import Youtube from '@tiptap/extension-youtube';
import { lowlight } from 'lowlight/lib/all.js'
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Underline from '@tiptap/extension-underline';
import TaskList from "@tiptap/extension-task-list";
import TaskItem from '@tiptap/extension-task-item'


const NoteBox = (props: any) => {
    const { id, content, processUpdate } = props;
    const editor = useEditor({
        extensions: [
            Document,
            Heading,
            Paragraph,
            Text,
            BlockQuote,
            Bold,
            Italic,
            Subscript,
            Superscript,
            Underline,
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            History.configure({
                depth: 100,
            }),
            Typography,
            Highlight.configure({
                multicolor: true
            }),
            Strike,
            Placeholder,
            Gapcursor,
            Color,
            Code,
            CodeBlockLowlight.configure({
                lowlight
            }),
            HardBreak,
            Link.configure({
                protocols: ["ftp", "mailto"],
                autolink: true,
                openOnClick: true,
                linkOnPaste: true,
            }),
            OrderedList,
            BulletList,
            ListItem,
            Emoji.configure({
                emojis: [
                    ...emojis,
                    ...gitHubEmojis,
                    ...gitHubCustomEmojis
                ],
                enableEmoticons: true,
            }),
            Youtube,
        ],
        editorProps: {
            handleDOMEvents: {
                keypress: (view, event) => {
                    if (event.key === "Enter") {
                        console.log("enter pressed");
                    }
                }
            },
            attributes: {
                class: 'prose min-h-[calc(100vh-4.75rem)] min-w-[300px] mx-auto pb-[90vh] p-6 pt-10 text-sm focus:outline-none',
            },
        },
        autofocus: true,
        content: content,
    });

    useEffect(() => {
        if (!editor) return;
        editor.commands.setContent(content);
    }, [])

    useEffect(() => {
        console.log("here!", id);
        if (!editor) return;
        try {
            editor.off("update");
            editor.on("update", ({ editor }) => {
                let noteContent = editor.getJSON();
                processUpdate(id, noteContent);
            });
            let noteContent = content;
            editor.commands.clearContent();
            editor.commands.setContent(noteContent);
        } catch (e) {
            console.error("Could not parse note JSON", e);
        }
    }, [id])

    return (
        <EditorContent tabIndex={-1} className="pl-4" editor={editor} />
    )
}

export default NoteBox;