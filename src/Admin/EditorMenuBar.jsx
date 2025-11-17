import React, { useCallback } from 'react';

const EditorMenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // If prompt was cancelled
    if (url === null) {
      return;
    }

    // If URL is empty, unset the link
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // Set the link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="editor-menu-bar">
      {/* Existing buttons */}
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>Bold</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>Italic</button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active' : ''}>Strike</button>
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active' : ''}>Code Block</button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        Divider
      </button>
      {/* New Link Button */}
      <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
        Set Link
      </button>
      <button onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive('link')}>
        Unset Link
      </button>

      {/* More existing buttons */}
      <button onClick={() => editor.chain().focus().setHardBreak().run()}>Hard Break</button>
      <button onClick={() => editor.chain().focus().undo().run()}>Undo</button>
      <button onClick={() => editor.chain().focus().redo().run()}>Redo</button>
    </div>
  );
};

export default EditorMenuBar;
