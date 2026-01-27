import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  FiType,
  FiList,
  FiBold,
  FiItalic,
  FiUnderline,
  FiLink,
  FiImage,
  FiGrid,
  FiPlusSquare,
  FiMinusSquare,
  FiTrash2,
  FiCornerDownLeft,
  FiRotateCcw,
  FiRotateCw,
  FiAlignLeft,
  FiAlignCenter,
  FiCode,
  FiMinus,
  FiUpload,
  FiBox,
} from 'react-icons/fi';
import { FaListOl } from 'react-icons/fa';
import { TbH1, TbH2, TbH3 } from 'react-icons/tb';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const EditorMenuBar = ({ editor }) => {
  const [wordCount, setWordCount] = useState(0);
  const fileInputRef = useRef(null);

   const insertVisualizationEmbed = useCallback(() => {
    const type = window.prompt(
      'Visualization type (e.g. web-stack, html-layers-1)',
      'web-stack'
    );
    if (!type) return;

    editor
      .chain()
      .focus()
      .insertContent({
        type: 'visualizationEmbed',
        attrs: { type, class: 'visualization-embed' },
      })
      .run();
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    const updateCount = () => {
      setWordCount(editor.storage.characterCount?.characters() ?? 0);
    };

    // initial value
    updateCount();

    // update on every change
    editor.on('update', updateCount);

    return () => {
      editor.off('update', updateCount);
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  // ---- link stays same ----
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  // add by URL
  const addImageByUrl = useCallback(() => {
    const url = window.prompt('Image URL');
    if (!url) return;
    editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt('Image URL');

    if (!url) {
      return;
    }

    editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  // upload from file
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    const filePath = `lesson-images/${Date.now()}-${file.name}`;
    const storageRef = ref(storage, filePath);
    // upload to Firebase Storage
    await uploadBytes(storageRef, file);

    // get public download URL
    const imageUrl = await getDownloadURL(storageRef);

    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
    }

    if (!file) return;

    try {
      // TODO: replace with your real upload endpoint
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      const imageUrl = data.url; // adjust to your API response

      if (imageUrl) {
        editor.chain().focus().setImage({ src: imageUrl }).run();
      }
    } catch (e) {
      console.error('Image upload failed', e);
    } finally {
      event.target.value = ''; // allow re‑selecting same file
    }
  };

  const insertTable = useCallback(() => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  }, [editor]);

  const addColumnAfter = useCallback(() => {
    editor.chain().focus().addColumnAfter().run();
  }, [editor]);

  const addRowAfter = useCallback(() => {
    editor.chain().focus().addRowAfter().run();
  }, [editor]);

  const deleteColumn = useCallback(() => {
    editor.chain().focus().deleteColumn().run();
  }, [editor]);

  const deleteRow = useCallback(() => {
    editor.chain().focus().deleteRow().run();
  }, [editor]);

  const deleteTable = useCallback(() => {
    editor.chain().focus().deleteTable().run();
  }, [editor]);

  return (
    <div style={styles.menuBar} className="editor-menu-bar">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {/* Headings */}
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''} title="Heading 1"> <TbH1 /></button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''} title="Heading 2"> <TbH2 /></button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''} title="Heading 3"> <TbH3 /></button>

      {/* Lists */}
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''} title="Bullet List"><FiList /></button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'is-active' : ''}><FaListOl /></button>
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''} title="Bold"><FiBold /></button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''} title="Italic"> <FiItalic /></button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active' : ''} title="Strike-through"><FiUnderline /></button>
      {/* Alignment */}
      <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''} title="Align Left"><FiAlignLeft /></button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''} title="Align Center"><FiAlignCenter /></button>
      <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active' : ''} title="Code Block"> <FiCode /></button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider"><FiMinus /></button>
      {/* New Link Button */}
      <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''} title="Set Link"><FiLink /></button>
      <button onClick={() => editor.chain().focus().unsetLink().run()} disabled={!editor.isActive('link')} title="Unset Link"><FiLink /></button>

      {/* Images */}
      <button onClick={addImage} title="Image"><FiImage /></button>
      <button onClick={handleUploadClick} title="Upload Image"><FiUpload /></button>

      {/* Tables */}
      <button onClick={insertTable} title="Insert Table">
        <FiGrid />
      </button>
      <button onClick={addColumnAfter} title="Add Column">
        <FiPlusSquare /> Column
      </button>
      <button onClick={deleteColumn} title="Delete Column">
        <FiMinusSquare /> Column
      </button>
      <button onClick={addRowAfter} title="Add Row">
        <FiPlusSquare /> Row
      </button>
      <button onClick={deleteRow} title="Delete Row">
        <FiMinusSquare /> Row
      </button>


      <button onClick={deleteTable} title="Delete Table">
        <FiTrash2 /> Table
      </button>
      <button onClick={insertVisualizationEmbed} title="Insert Visualization Embed">
        <FiBox /> Visual
      </button>

      {/* More existing buttons */}
      <button onClick={() => editor.chain().focus().setHardBreak().run()} title="Hard Break"><FiCornerDownLeft /></button>
      <button onClick={() => editor.chain().focus().undo().run()} title="Undo"><FiRotateCcw /></button>
      <button onClick={() => editor.chain().focus().redo().run()} title="Redo"><FiRotateCw /></button>
      {editor.storage.characterCount && (
        <div style={styles.wordCount}>
          {editor.storage.characterCount.words()} words
        </div>
      )}
      {/* Word count that updates while typing */}
      {/* <div style={styles.wordCount}>{wordCount} words</div> */}
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
