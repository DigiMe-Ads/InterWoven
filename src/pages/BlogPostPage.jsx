import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getBlogPost } from "../lib/blogService";
import Navbar from "../components/common/NavBar";
import Footer from "../components/common/Footer";

export default function BlogPostPage() {
  const { id } = useParams();
  const [post,    setPost]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPost(id).then(data => {
      setPost(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#2D8080] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400">Post not found.</p>
    </div>
  );

  return (
    <>
      {/* Hero banner */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(30,42,74,0.5) 0%, rgba(30,42,74,0.75) 100%)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pt-16">
          <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="bg-[#3D4F8F] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4">
            {post.category}
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl md:text-4xl font-extrabold text-white leading-tight max-w-3xl">
            {post.title}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/70 text-sm mt-3">
            {post.day} {post.month} — {post.category}
          </motion.p>
        </div>
      </div>

      {/* Body content */}
      <div className="bg-white py-16 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Back link */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-[#425CA9] font-semibold mb-10 hover:underline">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          {post.body ? (
            // Render rich text HTML from admin editor
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-extrabold prose-headings:text-[#1E2A4A]
                prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                prose-p:text-gray-500 prose-p:leading-relaxed
                prose-a:text-[#425CA9] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[#1E2A4A]
                prose-ul:text-gray-500 prose-ol:text-gray-500
                prose-li:marker:text-[#425CA9]
                prose-blockquote:border-l-[#425CA9] prose-blockquote:text-gray-400 prose-blockquote:italic
                prose-img:rounded-2xl prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          ) : (
            // Fallback if no body written yet
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-400 text-sm">Content coming soon.</p>
              <p className="text-gray-300 text-xs mt-1">The admin can add content to this post from the dashboard.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}