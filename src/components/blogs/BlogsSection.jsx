import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useContent } from "../../hooks/useContent";

const POST_META = [
  { id: "1", day: "27", month: "Mar", image: "/images/home/service-stress.jpg" },
  { id: "2", day: "17", month: "Feb", image: "/images/home/service-stress.jpg" },
  { id: "3", day: "06", month: "Jan", image: "/images/home/service-stress.jpg" },
  { id: "4", day: "12", month: "Dec", image: "/images/home/service-stress.jpg" },
  { id: "5", day: "10", month: "Nov", image: "/images/home/service-stress.jpg" },
  { id: "6", day: "30", month: "Oct", image: "/images/home/service-stress.jpg" },
];

function BlogCard({ post, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
    >
      <Link to={`/blog/${post.id}`}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow block"
      >
        <div className="relative overflow-hidden" style={{ height: 200 }}>
          <img src={post.image} alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute top-3 left-3">
            <span className="bg-[#3D4F8F] text-white text-[10px] font-bold px-3 py-1 rounded-md">{post.category}</span>
          </div>
          <div className="absolute bottom-5 left-4 translate-y-1/2 bg-[#2D3D7A] text-white rounded-md px-3 py-1.5 text-center min-w-10 z-10">
            <p className="text-base font-extrabold leading-none">{post.day}</p>
            <p className="text-[10px] opacity-80 mt-0.5">{post.month}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 px-5 pt-8 pb-5 flex-1">
          <h3 className="text-base font-extrabold text-[#1E2A4A] leading-snug group-hover:text-[#425CA9] transition-colors">{post.title}</h3>
          <p className="text-xs text-gray-400 leading-relaxed flex-1">{post.excerpt}</p>
          <span className="text-xs font-semibold text-[#425CA9] mt-1">Read more →</span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogSection() {
  const { content } = useContent("blogPageExtended");

  const posts = [
    { ...POST_META[0], title: content.post1Title, category: content.post1Cat, excerpt: content.post1Excerpt },
    { ...POST_META[1], title: content.post2Title, category: content.post2Cat, excerpt: content.post2Excerpt },
    { ...POST_META[2], title: content.post3Title, category: content.post3Cat, excerpt: content.post3Excerpt },
    { ...POST_META[3], title: content.post4Title, category: content.post4Cat, excerpt: content.post4Excerpt },
    { ...POST_META[4], title: content.post5Title, category: content.post5Cat, excerpt: content.post5Excerpt },
    { ...POST_META[5], title: content.post6Title, category: content.post6Cat, excerpt: content.post6Excerpt },
  ];

  return (
    <section id="blog" className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#6B7FD4] mb-2">{content.eyebrow}</p>
          <h2 className="text-4xl font-extrabold text-[#1E2A4A]">{content.heading}</h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => <BlogCard key={post.id} post={post} index={i} />)}
        </div>
      </div>
    </section>
  );
}