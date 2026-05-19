import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const COLLECTION = "siteContent";

// ── Default content ───────────────────────────────────────────────────────────
export const DEFAULT_CONTENT = {

  global: {
    phone:   "(555) 123-4567",
    email:   "Info@Yourmail.com",
    address: "123 Serenity Lane, Blissfield, CA 90210, US.",
    hours:   "Mon - Fri 8:00 - 6:30",
  },

  hero: {
    eyebrow:     "You don't have to navigate life alone.",
    heading1:    "Support, guidance,",
    heading2:    "and growth",
    heading3:    "all in one place",
    body:        "Interwoven connects individuals with the support they need to grow, heal, and thrive.",
    rating:      "4.9 /5",
    ratingLabel: "Review on Google",
  },

  features: {
    card1Title: "Personalized\nWellness Plans",
    card1Desc:  "Tailored guidance crafted to meet your unique needs and goals effectively.",
    card2Title: "Expert-Led\nCounseling Sessions",
    card2Desc:  "Professional support designed to guide emotional well-being every single day.",
    card3Title: "24/7 Support\nCommunity",
    card3Desc:  "Always-connected space offering care, encouragement, and shared growth.",
    card4Title: "Interactive\nSelf-Care Tools",
    card4Desc:  "Empowering digital resources to build healthy habits independently.",
  },

  about: {
    eyebrow:    "About Us",
    heading:    "Your Journey To Mental Wellness Starts Here",
    body:       "Every small step toward better mental health is a significant achievement in our lives. With the right support, each individual can find the strength to face challenges, manage stress, and build positive habits. We believe that everyone deserves the opportunity to grow, thrive, and experience inner peace.",
    check1:     "Free Consultation",
    check2:     "Mental Satisfaction",
    check3:     "Emergency Service",
    check4:     "Psychologists Services",
    quote:      "Healing doesn't mean the damage never existed; it means the strength to rise is greater than the pain",
    experience: "10+ Years",
  },

  howWeHelp: {
    eyebrow:    "How We Work ?",
    heading:    "Here For Your Health, Here For Your Heart",
    body:       "We offer compassionate care, combining physical and emotional support to help you thrive in every aspect.",
    btnLabel:   "Get Consult Now",
    step1Title: "Listen & Understand",
    step1Desc:  "Your wellness journey matters. We're dedicated to supporting both your mental clarity and emotional strength every step forward.",
    step2Title: "Create A Tailored Plan",
    step2Desc:  "From everyday stress to life's hardest moments, our team stands ready to support your healing and overall well-being.",
    step3Title: "Support & Empower",
    step3Desc:  "Empowering you to live well with care that nurtures your body, mind, and emotional peace every single day.",
  },

  services: {
    eyebrow:   "Our Services",
    heading:   "Breaking Stigmas, Building Strength",
    svc1Title: "Individual Therapy",
    svc1Desc:  "Tailored guidance crafted to meet your unique needs and goals effectively.",
    svc2Title: "Group Counseling",
    svc2Desc:  "Professional support designed to guide emotional well-being every single day.",
    svc3Title: "Stress Management",
    svc3Desc:  "Empowering digital resources to build healthy habits independently.",
  },

  whyChooseUs: {
    eyebrow:    "Why Choose Us ?",
    heading:    "Restoring Hope, One Day At A Time",
    body:       "Through consistent care and compassionate guidance, we help individuals rediscover strength, build resilience, and move forward toward a brighter, healthier future at their own pace.",
    check1:     "Compassionate & Experienced Professionals",
    check2:     "Holistic Approach To Well-Being",
    check3:     "Safe & Supportive Environment",
    check4:     "Personalized support",
    btnLabel:   "Make An Appointment",
    stat1Val:   "100%",  stat1Label: "Satisfaction",
    stat2Val:   "257+",  stat2Label: "Happy Patient",
    stat3Val:   "10+",   stat3Label: "Expert Therapist",
  },

  testimonials: {
    eyebrow:  "Client Feedbacks",
    heading:  "Healing Begins with a Conversation",
    body:     "Healing isn't rushed—it's supported. Our team walks beside you, offering understanding and tailored support to help you rebuild confidence and emotional peace day by day.",
    t1Name:   "Jessica M",    t1Role: "Digital Agency",
    t1Quote:  "Thanks to the supportive team, I've learned how to manage my anxiety and feel more in control of my life. I'm truly grateful for the care and guidance they provided.",
    t2Name:   "David L.",     t2Role: "Product Manager",
    t2Quote:  "The counseling sessions were a game-changer for me. The therapist was so understanding, and I finally felt heard. I highly recommend their services to anyone struggling.",
    t3Name:   "Emily R.",     t3Role: "Content Creator",
    t3Quote:  "I joined one of their mindfulness workshops, and it helped me find a sense of calm I didn't know I could achieve. Their approach is practical and easy to follow.",
  },

  contact: {
    eyebrow:      "Get A Quote",
    heading:      "Take The first step toward a healthier mind.",
    subheading:   "Join us today and start your journey to well-being!",
    rightHeading: "Need Any Help? Get In Touch With Us",
    rightBody:    "Every small step counts. We're committed to walking with you through difficult moments, encouraging progress, and nurturing your journey toward lasting mental and emotional recovery.",
  },

  aboutPage: {
    heroTitle:  "About Us",
    eyebrow:    "About Us",
    specialistEyebrow: "Our Specialist",
    specialistHeading: "Meet Our Senior Therapist",
    heading:    "Because Your Mental Health Matters",
    bullet1:    "Prioritizing well-being helps you thrive emotionally, socially, and personally every day.",
    bullet2:    "Strong minds build strong lives; support and care create lasting peace.",
    bullet3:    "Inner peace starts with awareness, acceptance, and support when it's needed most.",
    bullet4:    "Emotional strength shapes how we live, connect, and move forward confidently.",
    blueCardTitle: "Together, We overcome",
    blueService1:  "Free Consultation",
    blueService2:  "Mental Satisfaction",
    blueService3:  "Emergency Service",
    specialistEyebrow: "Our Specialist",
    specialistHeading:  "Meet Our Senior Therapist",
    therapist1Name: "Ubeid Una",      therapist1Role: "Psychologist",
    therapist2Name: "Hafsha Jasmine", therapist2Role: "Psychologist",
    therapist3Name: "Farina Amira",   therapist3Role: "Psychologist",
    therapist4Name: "Idayati Ilyas",  therapist4Role: "Psychologist",
  },

  howWeHelpAbout: {
  eyebrow:    "How We Work ?",
  heading:    "Here For Your Health, Here For Your Heart",
  body:       "We connect individuals with experienced professionals through a seamless digital experience designed for convenience, privacy, and impact.",
  btnLabel:   "Get Consult Now",
  step1Title: "Listen & Understand",
  step1Desc:  "Your wellness journey matters. We're dedicated to supporting both your mental clarity and emotional strength every step forward.",
  step2Title: "Create A Tailored Plan",
  step2Desc:  "From everyday stress to life's hardest moments, our team stands ready to support your healing and overall well-being.",
  step3Title: "Support & Empower",
  step3Desc:  "Empowering you to live well with care that nurtures your body, mind, and emotional peace every single day.",
    },

    mentalHealthMatters: {
  eyebrow:      "About Us",
  heading:      "Because Your Mental\nHealth Matters",
  body:         "At Interwoven, we believe every individual deserves access to guidance, support, and growth opportunities.",
  bullet1Label: "Our Mission",
  bullet1Text:  "To make support accessible, break stigma, and empower individuals to live better lives.",
  bullet2Label: "Our Vision",
  bullet2Text:  "A world where support is normalized, growth is continuous, and no one feels alone.",
  bullet3Label: "Why 'Interwoven'",
  bullet3Text:  "Life is interconnected — our emotions, experiences, and growth are all woven together. Interwoven represents this journey of connection and support.",
  blueCardTitle:  "Together, We Overcome",
  blueService1:   "Free Consultation",
  blueService2:   "Mental Satisfaction",
  blueService3:   "Emergency Service",
},

extendedServices: {
  eyebrow:   "Our Services",
  heading:   "Breaking Stigmas, Building Strength",
  svc1Title: "1:1 Sessions",           svc1Desc: "Personalized support tailored to individual needs",
  svc2Title: "Personal Development",   svc2Desc: "Growth-focused programs to improve mindset and performance",
  svc3Title: "Mental Wellness Support",svc3Desc: "Guidance for emotional and mental well-being",
  svc4Title: "Coaching & Guidance",    svc4Desc: "Expert advice for life, career, and personal challenges",
  svc5Title: "Workshops & Programs",   svc5Desc: "Group-based learning and development sessions",
},

blogPageExtended: {
  eyebrow: "Our Blogs",
  heading: "Read Our Articles",
  post1Title: "The Role of Self-Care in Reducing Stress Levels",    post1Cat: "Depression", post1Excerpt: "This group provides...",
  post2Title: "Simple Steps to Build Emotional Resilience Daily",   post2Cat: "Anxiety",    post2Excerpt: "Through guided conversations...",
  post3Title: "Signs You Might Need Professional Mental Health Support", post3Cat: "Wellness", post3Excerpt: "Participants learn...",
  post4Title: "Mindfulness Practices to Improve Mental Well-Being", post4Cat: "Mindfulness", post4Excerpt: "Designed to help individuals...",
  post5Title: "Effective Strategies to Overcome Negative Thinking", post5Cat: "Depression",  post5Excerpt: "Focusing on personal empowerment...",
  post6Title: "How to Manage Anxiety in Everyday Life",             post6Cat: "Anxiety",     post6Excerpt: "Guided by trauma-informed professionals...",
},

  contactPage: {
    heroTitle: "Contact Us",
    eyebrow:   "Get In Touch",
    heading:   "Contact Details",
  },

  pricingPage: {
    heroTitle:  "Pricing",
    eyebrow:    "Pricing Plan",
    heading:    "Affordable Plans for a Healthier Mind",
    plan1Name:  "Basic Plan",    plan1Price: "$49",  plan1Period: "/Month",
    plan1Desc:  "Creates a compassionate environment where healing begins with shared stories, emotional validation, and gentle guidance.",
    plan1f1:    "Access to group counseling sessions (twice a month)",
    plan1f2:    "Unlimited access to self-help resources",
    plan1f3:    "Weekly guided meditation and mindfulness exercises",
    plan1f4:    "24/7 support via chat and email",
    plan2Name:  "Standard Plan", plan2Price: "$99",  plan2Period: "/Month",
    plan2Desc:  "Strengthens inner stability by teaching coping skills, improving self-awareness, and fostering a supportive group dynamic.",
    plan2f1:    "Everything in Basic Plan",
    plan2f2:    "One-on-one counseling session (once a month)",
    plan2f3:    "Personalized mental wellness plan",
    plan2f4:    "Priority response from mental health professionals",
    plan3Name:  "Premium Plan",  plan3Price: "$149", plan3Period: "/Month",
    plan3Desc:  "Focuses on emotional recovery through trauma-informed care, building trust, and nurturing personal growth in a safe setting.",
    plan3f1:    "Everything in Standard Plan",
    plan3f2:    "Weekly one-on-one counseling sessions",
    plan3f3:    "Access to exclusive workshops and webinars",
    plan3f4:    "Direct access to expert therapists, anytime",
    plan3f5:    "Ongoing progress tracking and feedback",
  },

  blogPage: {
    heroTitle: "Blog",
    eyebrow:   "Our Blogs",
    heading:   "Read Our Articles",
    post1Title: "The Role of Self-Care in Reducing Stress Levels",
    post1Cat:   "Depression",
    post1Excerpt: "This group provides a compassionate and confidential environment where individuals can openly discuss their fears, learn healthy coping mechanisms, and understand that they are not alone in their struggles.",
    post2Title: "Simple Steps to Build Emotional Resilience Daily",
    post2Cat:   "Anxiety",
    post2Excerpt: "Through guided conversations and shared stories, members are encouraged to reconnect with themselves and others, gradually rebuilding emotional strength, motivation, and hope.",
    post3Title: "Signs You Might Need Professional Mental Health Support",
    post3Cat:   "Wellness",
    post3Excerpt: "Participants learn to identify stress triggers and replace negative responses with practical, mindful strategies, all while benefiting from the encouragement of a supportive community.",
    post4Title: "Mindfulness Practices to Improve Mental Well-Being",
    post4Cat:   "Mindfulness",
    post4Excerpt: "Designed to help individuals navigate the complex emotions that follow a loss, this group offers comfort, empathy, and guidance through meaningful dialogue and shared remembrance.",
    post5Title: "Effective Strategies to Overcome Negative Thinking Patterns",
    post5Cat:   "Depression",
    post5Excerpt: "Focusing on personal empowerment and mental flexibility, this group helps individuals develop inner strength, regulate emotions, and handle life's challenges with renewed confidence.",
    post6Title: "How to Manage Anxiety in Everyday Life",
    post6Cat:   "Anxiety",
    post6Excerpt: "Guided by trauma-informed professionals, this group creates a safe and empowering space where participants can process painful experiences and take meaningful steps toward long-term recovery.",
  },

  footer: {
    description: "Professional, responsive, and soothing design for therapists, counselors, and life coaches.",
    copyright:   "Copyright © 2025 Widagdos. All Rights Reserved.",
    newsletterLabel: "Get the latest news other tips.",
  },
};

// ── Fetch content ─────────────────────────────────────────────────────────────
export async function getContent(section) {
  try {
    const snap = await getDoc(doc(db, COLLECTION, section));
    if (snap.exists()) {
      return { ...DEFAULT_CONTENT[section], ...snap.data() };
    }
    return DEFAULT_CONTENT[section] || {};
  } catch (err) {
    console.error(`Error fetching content "${section}":`, err);
    return DEFAULT_CONTENT[section] || {};
  }
}

// ── Save content ──────────────────────────────────────────────────────────────
export async function saveContent(section, data) {
  try {
    await setDoc(doc(db, COLLECTION, section), data, { merge: true });
    return { success: true };
  } catch (err) {
    console.error(`Error saving content "${section}":`, err);
    return { success: false, error: err.message };
  }
}