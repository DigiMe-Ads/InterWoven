import PageHero from "../components/common/Hero";
import BlogSection from "../components/blogs/BlogsSection";


export default function BlogPage() {
  return (
    <main>
      <PageHero
        title="Blogs"
        breadcrumbs={[
          { label: "Homepage", href: "/" },
          { label: "Blogs" },
        ]}
      />
      <BlogSection />
      
      {/* Add future sections below as you build them */}
    </main>
  );
}