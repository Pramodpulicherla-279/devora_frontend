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
    <div style={styles.menuBar} className="editor-menu-bar">
      {/* Headings */}
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>H1</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>H2</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}>H3</button>

      {/* Lists */}
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''}>List</button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'is-active' : ''}>Ordered List</button>
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
      {editor.storage.characterCount && (
        <div style={styles.wordCount}>
          {editor.storage.characterCount.words()} words
        </div>
      )}
    </div>
    
  );
};

const styles = {
  menuBar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
    wordCount: {
    fontSize: '0.8rem',
    color: '#888',
  }
}

export default EditorMenuBar;
