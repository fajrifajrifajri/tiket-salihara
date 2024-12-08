import { Editor } from "@tiptap/react";
import { cva } from "class-variance-authority";
import {
    Undo2,
    Redo2,
    Quote,
    Bold,
    Underline as UnderlineIcon,
    Italic,
    Strikethrough,
    AlignLeft,
    AlignCenter,
    AlignRight,
    List,
    ListOrdered,
    Link,
    Code2,
    ImagePlus,
    Unlink,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Pilcrow,
    X,
} from "lucide-react";

const toolbarButton = cva(
    "px-2 py-1 text-sm rounded hover:bg-gray-200 focus:outline-none",
    {
        variants: {
            active: {
                true: "bg-gray-300 text-gray-800",
                false: "bg-gray-100 text-gray-600",
            },
        },
    }
);

const Toolbar = ({ editor }: { editor: Editor }) => {
    if (!editor) return null;

    return (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 bg-gray-100 p-2">
            <button
                onClick={() => editor.chain().focus().undo().run()}
                className={toolbarButton({ active: false })}
            >
                <Undo2 className="h-4 w-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                className={toolbarButton({ active: false })}
            >
                <Redo2 className="h-4 w-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={toolbarButton({
                    active: editor.isActive("blockquote"),
                })}
            >
                <Quote className="h-4 w-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={toolbarButton({ active: editor.isActive("bold") })}
            >
                <Bold className="h-4 w-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={toolbarButton({
                    active: editor.isActive("underline"),
                })}
            >
                <UnderlineIcon className="h-4 w-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={toolbarButton({ active: editor.isActive("italic") })}
            >
                <Italic className="h-4 w-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={toolbarButton({ active: editor.isActive("strike") })}
            >
                <Strikethrough className="h-4 w-4" />
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                }
                className={toolbarButton({
                    active: editor.isActive({ textAlign: "left" }),
                })}
            >
                <AlignLeft className="h-4 w-4" />
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                }
                className={toolbarButton({
                    active: editor.isActive({ textAlign: "center" }),
                })}
            >
                <AlignCenter className="h-4 w-4" />
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                }
                className={toolbarButton({
                    active: editor.isActive({ textAlign: "right" }),
                })}
            >
                <AlignRight className="h-4 w-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={toolbarButton({
                    active: editor.isActive("bulletList"),
                })}
            >
                <List className="h-4 w-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={toolbarButton({
                    active: editor.isActive("orderedList"),
                })}
            >
                <ListOrdered className="h-4 w-4" />
            </button>
            <button
                onClick={() =>
                    editor
                        .chain()
                        .focus()
                        .toggleLink({ href: prompt("Enter URL") || "" })
                        .run()
                }
                className={toolbarButton({ active: editor.isActive("link") })}
            >
                <Link className="h-4 w-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().unsetLink().run()}
                className={toolbarButton({ active: false })}
            >
                <Unlink className="h-4 w-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={toolbarButton({
                    active: editor.isActive("codeBlock"),
                })}
            >
                <Code2 className="h-4 w-4" />
            </button>
            <button
                onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = async () => {
                        const file = input.files?.[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = () => {
                                const result = reader.result as string;
                                editor
                                    .chain()
                                    .focus()
                                    .setImage({ src: result })
                                    .run();
                            };
                            reader.readAsDataURL(file);
                        }
                    };
                    input.click();
                }}
                className={toolbarButton({ active: false })}
            >
                <ImagePlus className="h-4 w-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={toolbarButton({
                    active: editor.isActive("paragraph"),
                })}
            >
                <Pilcrow className="h-4 w-4" />
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                className={toolbarButton({
                    active: editor.isActive("heading", { level: 1 }),
                })}
            >
                <Heading1 className="h-4 w-4" />
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={toolbarButton({
                    active: editor.isActive("heading", { level: 2 }),
                })}
            >
                <Heading2 className="h-4 w-4" />
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                className={toolbarButton({
                    active: editor.isActive("heading", { level: 3 }),
                })}
            >
                <Heading3 className="h-4 w-4" />
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
                className={toolbarButton({
                    active: editor.isActive("heading", { level: 4 }),
                })}
            >
                <Heading4 className="h-4 w-4" />
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 5 }).run()
                }
                className={toolbarButton({
                    active: editor.isActive("heading", { level: 5 }),
                })}
            >
                <Heading5 className="h-4 w-4" />
            </button>
            <button
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 6 }).run()
                }
                className={toolbarButton({
                    active: editor.isActive("heading", { level: 6 }),
                })}
            >
                <Heading6 className="h-4 w-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().clearNodes().run()}
                className={toolbarButton({ active: false })}
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
};

export default Toolbar;
