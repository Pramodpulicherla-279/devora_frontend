export default function EditorMenuBar({ editor }) {
  if (!editor) return null;

  const languages = [
    "javascript",
    "html",
    "css",
    "json",
    "jsx",
    "bash",
    "markdown",
  ];

  return (
    <div className="flex flex-wrap gap-2 border-b pb-2 mb-3">
      {/* Basic formatting */}
      <button className="editor-btn" onClick={() => editor.chain().focus().toggleBold().run()}>
        Bold
      </button>
      <button className="editor-btn" onClick={() => editor.chain().focus().toggleItalic().run()}>
        Italic
      </button>
      <button className="editor-btn" onClick={() => editor.chain().focus().toggleBulletList().run()}>
        • List
      </button>
      <button className="editor-btn" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
        H2
      </button>

      {/* Insert Code Block */}
      <select
        className="editor-select"
        onChange={(e) =>
          editor
            .chain()
            .focus()
            .toggleCodeBlock({ language: e.target.value })
            .run()
        }
      >
        <option value="">Insert Code Block</option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>
            <button
        className="editor-btn"
        onClick={() => editor.chain().focus().deleteNode("codeBlock").run()}
        disabled={!editor.isActive("codeBlock")}
        title="Delete Code Block"
      >
        Delete Code
      </button>
      
    </div>
  );
}
