import { motion } from "framer-motion";

const posts = [
  {
    id: 1,
    category: "Depression",
    day: "27",
    month: "Mar",
    image: "/images/home/service-stress.jpg",
    title: "The Role of Self-Care in Reducing Stress Levels",
    excerpt:
      "This group provides a compassionate and confidential environment where individuals can openly discuss their fears, learn healthy coping mechanisms, and understand that they are not alone in their struggles with constant worry and unease...",
  },
  {
    id: 2,
    category: "Anxiety",
    day: "17",
    month: "Feb",
    image: "/images/home/service-stress.jpg",
    title: "Simple Steps to Build Emotional Resilience Daily",
    excerpt:
      "Through guided conversations and shared stories, members are encouraged to reconnect with themselves and others, gradually rebuilding emotional strength, motivation, and hope in a space that prioritizes healing and patience...",
  },
  {
    id: 3,
    category: "Wellness",
    day: "06",
    month: "Jan",
    image: "/images/home/service-stress.jpg",
    title: "Signs You Might Need Professional Mental Health Support",
    excerpt:
      "Participants learn to identify stress triggers and replace negative responses with practical, mindful strategies, all while benefiting from the encouragement and accountability of a supportive and understanding peer community...",
  },
  {
    id: 4,
    category: "Mindfulness",
    day: "12",
    month: "Dec",
    image: "/images/home/service-stress.jpg",
    title: "Mindfulness Practices to Improve Mental Well-Being",
    excerpt:
      "Designed to help individuals navigate the complex emotions that follow a loss, this group offers comfort, empathy, and guidance through meaningful dialogue, shared remembrance, and connection with others on a similar journey...",
  },
  {
    id: 5,
    category: "Depression",
    day: "10",
    month: "Nov",
    image: "/images/home/service-stress.jpg",
    title: "Effective Strategies to Overcome Negative Thinking Patterns",
    excerpt:
      "Focusing on personal empowerment and mental flexibility, this group helps individuals develop inner strength, regulate emotions, and handle life's challenges with a renewed sense of control and self confidence to a new chapter...",
  },
  {
    id: 6,
    category: "Anxiety",
    day: "30",
    month: "Oct",
    image: "/images/home/service-stress.jpg",
    title: "How to Manage Anxiety in Everyday Life",
    excerpt:
      "Guided by trauma-informed professionals, this group creates a safe and empowering space where participants can process painful experiences, rebuild trust in themselves and others, and take meaningful steps toward long-term recovery...",
  },
];

function BlogCard({ post, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group cursor-pointer hover:shadow-md transition-shadow"
    >
      {/* Image area */}
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category badge — top left */}
        <div className="absolute top-3 left-3">
          <span className="bg-[#3D4F8F] text-white text-[10px] font-bold px-3 py-1 rounded-md">
            {post.category}
          </span>
        </div>

        {/* Date badge — bottom left, overlapping image/content border */}
        <div
          className="absolute bottom-5 left-4 translate-y-1/2 bg-[#2D3D7A] text-white rounded-md px-3 py-1.5 text-center min-w-10 z-10"
        >
          <p className="text-base font-extrabold leading-none">{post.day}</p>
          <p className="text-[10px] opacity-80 mt-0.5">{post.month}</p>
        </div>
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-2 px-5 pt-8 pb-5 flex-1">
        <h3 className="text-base font-extrabold text-[#1E2A4A] leading-snug">
          {post.title}
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed flex-1">
          {post.excerpt}
        </p>
      </div>
    </motion.div>
  );
}

export default function BlogSection() {
  return (
    <section id="blog" className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#6B7FD4] mb-2">
            Our Blogs
          </p>
          <h2 className="text-4xl font-extrabold text-[#1E2A4A]">
            Read Our Articles
          </h2>
        </motion.div>

        {/* 3-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}