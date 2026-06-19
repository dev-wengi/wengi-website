import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<h1>Products Page</h1>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/team" element={<h1>Team Page</h1>} />
        <Route path="/contact" element={<h1>Contact Page</h1>} />
        <Route path="/services" element={<h1>Services Page</h1>} />
        <Route path="/blog" element={<h1>Blog Page</h1>} />
        <Route path="/faq" element={<h1>FAQ Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
