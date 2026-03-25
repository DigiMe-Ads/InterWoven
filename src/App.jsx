import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ui/ScrollToTop";
import Navbar from "./components/common/NavBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactUsPage";
import PricingPage from "./pages/PricingPage";
import ServicesPage from "./pages/ServicesPage";
import Footer from "./components/common/Footer";


export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}