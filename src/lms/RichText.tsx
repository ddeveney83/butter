import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

export default function RichText({
  html,
  onChange,
  label,
}: {
  html: string;
  onChange: (html: string) => void;
  label: string;
}) {
  const [insert, setInsert] = useState<"link" | "image" | null>(null),
    [url, setUrl] = useState(""),
    [alt, setAlt] = useState(""),
    [error, setError] = useState("");
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false },
      }),
      Image.configure({ allowBase64: false }),
    ],
    content: html,
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    editorProps: {
      attributes: {
        role: "textbox",
        "aria-label": label,
        "aria-multiline": "true",
        class: "studio-rich-content",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });
  useEffect(() => {
    if (editor && editor.getHTML() !== html)
      editor.commands.setContent(html, { emitUpdate: false });
  }, [editor, html]);
  if (!editor) return null;
  const tools = [
    {
      name: "Paragraph",
      text: "Text",
      active: editor.isActive("paragraph"),
      run: () => editor.chain().focus().setParagraph().run(),
    },
    {
      name: "Heading 2",
      text: "H2",
      active: editor.isActive("heading", { level: 2 }),
      run: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      name: "Heading 3",
      text: "H3",
      active: editor.isActive("heading", { level: 3 }),
      run: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      name: "Bold",
      text: "B",
      active: editor.isActive("bold"),
      run: () => editor.chain().focus().toggleBold().run(),
    },
    {
      name: "Italic",
      text: "I",
      active: editor.isActive("italic"),
      run: () => editor.chain().focus().toggleItalic().run(),
    },
    {
      name: "Underline",
      text: "U",
      active: editor.isActive("underline"),
      run: () => editor.chain().focus().toggleUnderline().run(),
    },
    {
      name: "Bullet list",
      text: "• List",
      active: editor.isActive("bulletList"),
      run: () => editor.chain().focus().toggleBulletList().run(),
    },
    {
      name: "Numbered list",
      text: "1. List",
      active: editor.isActive("orderedList"),
      run: () => editor.chain().focus().toggleOrderedList().run(),
    },
    {
      name: "Quote",
      text: "“ Quote",
      active: editor.isActive("blockquote"),
      run: () => editor.chain().focus().toggleBlockquote().run(),
    },
  ];
  return (
    <div className="studio-rich">
      <div
        className="studio-rich-toolbar"
        role="toolbar"
        aria-label={label + " formatting"}
      >
        {tools.map((tool) => (
          <button
            type="button"
            key={tool.name}
            aria-label={tool.name}
            title={tool.name}
            aria-pressed={tool.active}
            onMouseDown={(event) => event.preventDefault()}
            onClick={tool.run}
          >
            {tool.text}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            setInsert("link");
            setUrl(editor.getAttributes("link").href || "");
            setError("");
          }}
        >
          Link
        </button>
        <button
          type="button"
          onClick={() => {
            setInsert("image");
            setUrl("");
            setAlt("");
            setError("");
          }}
        >
          Image
        </button>
        <button
          type="button"
          aria-label="Undo"
          disabled={!editor.can().undo()}
          onClick={() => editor.chain().focus().undo().run()}
        >
          ↶
        </button>
        <button
          type="button"
          aria-label="Redo"
          disabled={!editor.can().redo()}
          onClick={() => editor.chain().focus().redo().run()}
        >
          ↷
        </button>
      </div>
      {insert && (
        <div className="studio-insert">
          <label>
            {insert === "link" ? "Link URL" : "Image URL"}
            <input
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://…"
            />
          </label>
          {insert === "image" && (
            <label>
              Image description
              <input
                value={alt}
                onChange={(event) => setAlt(event.target.value)}
                maxLength={300}
              />
            </label>
          )}
          <button
            type="button"
            className="lms-secondary"
            onClick={() => {
              try {
                if (new URL(url).protocol !== "https:") throw Error();
              } catch {
                setError("Use an HTTPS URL.");
                return;
              }
              if (insert === "link")
                editor
                  .chain()
                  .focus()
                  .extendMarkRange("link")
                  .setLink({ href: url })
                  .run();
              else editor.chain().focus().setImage({ src: url, alt }).run();
              setInsert(null);
            }}
          >
            Insert {insert}
          </button>
          <button type="button" onClick={() => setInsert(null)}>
            Cancel
          </button>
          {error && <p role="alert">{error}</p>}
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}
