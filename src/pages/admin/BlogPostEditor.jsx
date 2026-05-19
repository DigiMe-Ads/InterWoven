import { useState, useEffect, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { DEFAULT_POSTS, getBlogPost, saveBlogPost } from "../../lib/blogService";

// ── Toolbar button ────────────────────────────────────────────────────────────
function ToolBtn({ onClick, active, title, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-1.5 rounded-lg text-sm transition-colors ${
        active ? "bg-[#2D8080] text-white" : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

// ── Rich text toolbar ─────────────────────────────────────────────────────────
function Toolbar({ editor }) {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Image URL:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const setLink = () => {
    const url = window.prompt("Link URL:");
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-gray-200 bg-gray-50">
      {/* Headings */}
      <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })} title="Heading 1">H1</ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} title="Heading 2">H2</ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} title="Heading 3">H3</ToolBtn>

      <div className="w-px h-5 bg-gray-200 mx-1" />

      {/* Text style */}
      <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()}      active={editor.isActive("bold")}      title="Bold"><strong>B</strong></ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()}    active={editor.isActive("italic")}    title="Italic"><em>I</em></ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline"><span className="underline">U</span></ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()}    active={editor.isActive("strike")}    title="Strikethrough"><span className="line-through">S</span></ToolBtn>

      <div className="w-px h-5 bg-gray-200 mx-1" />

      {/* Lists */}
      <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()}  active={editor.isActive("bulletList")}  title="Bullet list">• List</ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered list">1. List</ToolBtn>

      <div className="w-px h-5 bg-gray-200 mx-1" />

      {/* Align */}
      <ToolBtn onClick={() => editor.chain().focus().setTextAlign("left").run()}    active={editor.isActive({ textAlign: "left" })}    title="Align left">⬅</ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().setTextAlign("center").run()}  active={editor.isActive({ textAlign: "center" })}  title="Center">⬛</ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().setTextAlign("right").run()}   active={editor.isActive({ textAlign: "right" })}   title="Align right">➡</ToolBtn>

      <div className="w-px h-5 bg-gray-200 mx-1" />

      {/* Quote + rule */}
      <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote">" "</ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider">—</ToolBtn>

      <div className="w-px h-5 bg-gray-200 mx-1" />

      {/* Link + Image */}
      <ToolBtn onClick={setLink}  active={editor.isActive("link")} title="Add link">🔗</ToolBtn>
      <ToolBtn onClick={addImage} title="Add image (URL)">🖼</ToolBtn>

      <div className="w-px h-5 bg-gray-200 mx-1" />

      {/* Undo / Redo */}
      <ToolBtn onClick={() => editor.chain().focus().undo().run()} title="Undo">↩</ToolBtn>
      <ToolBtn onClick={() => editor.chain().focus().redo().run()} title="Redo">↪</ToolBtn>
    </div>
  );
}

// ── Single post editor ────────────────────────────────────────────────────────
function PostEditor({ postId, onBack }) {
  const [post,    setPost]    = useState(null);
  const [meta,    setMeta]    = useState({ title: "", category: "", excerpt: "" });
  const [saving,  setSaving]  = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [loading, setLoading] = useState(true);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "outline-none min-h-[400px] px-6 py-5 text-sm text-gray-600 leading-relaxed",
      },
    },
  });

  useEffect(() => {
    getBlogPost(postId).then(data => {
      setPost(data);
      setMeta({ title: data.title || "", category: data.category || "", excerpt: data.excerpt || "" });
      if (editor && data.body) editor.commands.setContent(data.body);
      setLoading(false);
    });
  }, [postId]);

  // Set content once editor is ready
  useEffect(() => {
    if (editor && post?.body) editor.commands.setContent(post.body);
  }, [editor, post]);

  const handleSave = async () => {
    if (!editor) return;
    setSaving(true);
    const body = editor.getHTML();
    await saveBlogPost(postId, { ...post, ...meta, body });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-6 h-6 border-2 border-[#2D8080] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Back + Save bar */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 font-semibold transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          All Posts
        </button>
        <button onClick={handleSave} disabled={saving}
          className={`flex items-center gap-2 text-xs font-semibold px-5 py-2 rounded-full transition-colors disabled:opacity-60 ${
            saved ? "bg-green-100 text-green-700" : "bg-[#2D8080] text-white hover:bg-[#236B6B]"
          }`}
        >
          {saving ? <><div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving...</> : saved ? "✓ Saved!" : "Save Post"}
        </button>
      </div>

      {/* Meta fields */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-gray-700 mb-2">Post Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Title</label>
            <input value={meta.title} onChange={e => setMeta(m => ({ ...m, title: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2D8080] bg-gray-50 focus:bg-white transition-colors" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Category</label>
            <input value={meta.category} onChange={e => setMeta(m => ({ ...m, category: e.target.value }))}
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2D8080] bg-gray-50 focus:bg-white transition-colors" />
          </div>
        </div>
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Excerpt (shown on blog listing)</label>
          <textarea value={meta.excerpt} rows={2} onChange={e => setMeta(m => ({ ...m, excerpt: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#2D8080] bg-gray-50 focus:bg-white transition-colors resize-none" />
        </div>
      </div>

      {/* Rich text editor */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-gray-700">Post Body</h3>
          <span className="text-[10px] text-gray-400">Use the toolbar to format your content</span>
        </div>
        <Toolbar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

// ── Post list (picker) ────────────────────────────────────────────────────────
export default function BlogPostEditor() {
  const [selectedId, setSelectedId] = useState(null);

  if (selectedId) {
    return <PostEditor postId={selectedId} onBack={() => setSelectedId(null)} />;
  }

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h3 className="text-sm font-extrabold text-gray-700">Blog Posts</h3>
          <p className="text-xs text-gray-400 mt-0.5">Click a post to edit its content</p>
        </div>
        <div className="divide-y divide-gray-50">
          {DEFAULT_POSTS.map(post => (
            <button key={post.id} onClick={() => setSelectedId(post.id)}
              className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors text-left"
            >
              <img src={post.image} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-700 truncate">{post.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{post.day} {post.month} · {post.category}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#2D8080] font-semibold flex-shrink-0">
                Edit
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}