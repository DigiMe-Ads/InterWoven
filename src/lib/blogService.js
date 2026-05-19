import { db } from "./firebase";
import { doc, getDoc, setDoc, collection, getDocs } from "firebase/firestore";

const COLLECTION = "blogPosts";

// Default metadata for the 6 posts — body content starts empty
export const DEFAULT_POSTS = [
  { id: "1", title: "The Role of Self-Care in Reducing Stress Levels",         category: "Depression",  day: "27", month: "Mar", image: "/images/home/service-stress.jpg", excerpt: "This group provides a compassionate and confidential environment where individuals can openly discuss their fears, learn healthy coping mechanisms, and understand that they are not alone in their struggles.", body: "" },
  { id: "2", title: "Simple Steps to Build Emotional Resilience Daily",         category: "Anxiety",     day: "17", month: "Feb", image: "/images/home/service-stress.jpg", excerpt: "Through guided conversations and shared stories, members are encouraged to reconnect with themselves and others, gradually rebuilding emotional strength, motivation, and hope.", body: "" },
  { id: "3", title: "Signs You Might Need Professional Mental Health Support",  category: "Wellness",    day: "06", month: "Jan", image: "/images/home/service-stress.jpg", excerpt: "Participants learn to identify stress triggers and replace negative responses with practical, mindful strategies, all while benefiting from the encouragement of a supportive peer community.", body: "" },
  { id: "4", title: "Mindfulness Practices to Improve Mental Well-Being",       category: "Mindfulness", day: "12", month: "Dec", image: "/images/home/service-stress.jpg", excerpt: "Designed to help individuals navigate the complex emotions that follow a loss, this group offers comfort, empathy, and guidance through meaningful dialogue and shared remembrance.", body: "" },
  { id: "5", title: "Effective Strategies to Overcome Negative Thinking",       category: "Depression",  day: "10", month: "Nov", image: "/images/home/service-stress.jpg", excerpt: "Focusing on personal empowerment and mental flexibility, this group helps individuals develop inner strength, regulate emotions, and handle life's challenges with renewed confidence.", body: "" },
  { id: "6", title: "How to Manage Anxiety in Everyday Life",                   category: "Anxiety",     day: "30", month: "Oct", image: "/images/home/service-stress.jpg", excerpt: "Guided by trauma-informed professionals, this group creates a safe and empowering space where participants can process painful experiences and take meaningful steps toward long-term recovery.", body: "" },
];

export async function getBlogPost(id) {
  try {
    const snap = await getDoc(doc(db, COLLECTION, String(id)));
    const defaults = DEFAULT_POSTS.find(p => p.id === String(id)) || {};
    if (snap.exists()) return { ...defaults, ...snap.data() };
    return defaults;
  } catch (err) {
    console.error("Error fetching blog post:", err);
    return DEFAULT_POSTS.find(p => p.id === String(id)) || {};
  }
}

export async function saveBlogPost(id, data) {
  try {
    await setDoc(doc(db, COLLECTION, String(id)), data, { merge: true });
    return { success: true };
  } catch (err) {
    console.error("Error saving blog post:", err);
    return { success: false, error: err.message };
  }
}