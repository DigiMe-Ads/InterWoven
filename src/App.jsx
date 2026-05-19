import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/NavBar";
import Footer from "./components/common/Footer"; 
import ScrollToTop from "./components/ui/ScrollToTop";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PricingPage from "./pages/PricingPage";
import BlogPage from "./pages/BlogPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactUsPage";
import AdminPage from "./pages/admin/AdminPage";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Admin — no Navbar */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Public site — with Navbar */}
        <Route path="/*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/"        element={<HomePage />} />
              <Route path="/about"   element={<AboutPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/blog"    element={<BlogPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}