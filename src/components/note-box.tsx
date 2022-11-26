import { useEditor, EditorContent } from '@tiptap/react'
import { EditorState, TextSelection } from 'prosemirror-state';
import { useEffect } from 'react';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import History from "@tiptap/extension-history";
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Code from '@tiptap/extension-code';
import ListItem from '@tiptap/extension-list-item';
import Strike from '@tiptap/extension-strike';
import HardBreak from '@tiptap/extension-hard-break';
import Typography from '@tiptap/extension-typography';
import OrderedList from '@tiptap/extension-ordered-list';
import BulletList from '@tiptap/extension-bullet-list';
import BlockQuote from "@tiptap/extension-blockquote";
import { lowlight } from 'lowlight/lib/all.js'
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Underline from '@tiptap/extension-underline';
import TaskList from "@tiptap/extension-task-list";
import TaskItem from '@tiptap/extension-task-item'
import Link from '@tiptap/extension-link';


const NoteBox = (props: any) => {
    const { id, content, processUpdate } = props;
    const extensions = [
        Document,
        Heading.configure({
            levels: [1, 2, 3, 4, 5]
        }),
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
        Link,
        Typography,
        Strike,
        Code,
        CodeBlockLowlight.configure({
            lowlight,
            exitOnArrowDown: true,
            defaultLanguage: "javascript",
            exitOnTripleEnter: true,
            languageClassPrefix: "language-"
        }),
        HardBreak,
        OrderedList,
        BulletList,
        ListItem,
    ];

    const editor = useEditor({
        extensions: extensions,
        editorProps: {
            attributes: {
                class: 'prose mx-auto p-7 pt-0 px-12 pb-[40vh] mt-10 min-h-[calc(100vh-4.75rem)] min-w-[300px] text-sm focus:outline-none',
            },
        },
        autofocus: true,
        content: content,
        injectCSS: false,
    });


    useEffect(() => {
        if (!editor) return;
        try {
            const doc = editor.schema.nodeFromJSON({
                type: "doc",
                content: content.content,
            });
            const state = EditorState.create({
                doc: doc,
                plugins: editor.extensionManager.plugins,
            });
            editor.commands.setContent(content);
            editor.view.updateState(state);
            editor.off("update");
            editor.on("update", ({ editor }) => {
                processUpdate(id, editor.getJSON());
            });
            editor.view.focus();
        } catch (e) {
            console.error("Could not parse note JSON", e);
        }
    }, [id]);

    return (
        <EditorContent id={id} className="w-full h-full overflow-y-auto" editor={editor} />
    )
}

export default NoteBox;