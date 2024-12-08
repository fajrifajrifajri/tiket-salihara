import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { cva } from "class-variance-authority";
import Toolbar from "./toolbar";
import "./styles.scss";

interface TipTapEditorProps {
    teks: string;
    setTeks: (teks: string) => void;
}

const editorWrapper = cva("p-4 border shadow-sm bg-white", {
    variants: {
        isFocused: {
            true: "border-black",
            false: "border-gray-300",
        },
    },
});

export default function TipTapEditor({ teks, setTeks }: TipTapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Link.configure({ openOnClick: false }),
            Image,
            Underline,
        ],
        content: teks,
        onUpdate: ({ editor }) => {
            setTeks(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose lg:prose-lg focus:outline-none",
            },
        },
    });

    return (
        <div className="space-y-2">
            {editor && <Toolbar editor={editor} />}

            {editor && (
                <BubbleMenu
                    className="bubble-menu"
                    tippyOptions={{ duration: 100 }}
                    editor={editor}
                >
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
                        className={editor.isActive("bold") ? "is-active" : ""}
                    >
                        Bold
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
                        className={editor.isActive("italic") ? "is-active" : ""}
                    >
                        Italic
                    </button>
                    <button
                        onClick={() =>
                            editor.chain().focus().toggleStrike().run()
                        }
                        className={editor.isActive("strike") ? "is-active" : ""}
                    >
                        Strike
                    </button>
                </BubbleMenu>
            )}
            <div
                className={`${editorWrapper({
                    isFocused: editor?.isFocused ?? false,
                })}`}
            >
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
