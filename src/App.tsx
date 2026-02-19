import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { Navbar, Footer } from './components/Layout';
import { Home } from './pages/Home';
import { Products, ProductDetail } from './pages/Products';
import { Solutions, SolutionDetail } from './pages/Solutions';
import { Knowledge, ArticleDetail } from './pages/Knowledge';
import { Calculators } from './pages/Calculators';
import { Projects } from './pages/Projects';
import { LeadForm } from './pages/LeadForm';

function ProductDetailWrapper() {
  const { slug } = useParams();
  return <ProductDetail slug={slug || ''} />;
}

function ArticleDetailWrapper() {
  const { slug } = useParams();
  return <ArticleDetail slug={slug || ''} />;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/san-pham" element={<Products />} />
            <Route path="/san-pham/:slug" element={<ProductDetailWrapper />} />
            <Route path="/giai-phap" element={<Solutions />} />
            <Route path="/giai-phap/:slug" element={<SolutionDetail />} />
            <Route path="/kien-thuc" element={<Knowledge />} />
            <Route path="/kien-thuc/:slug" element={<ArticleDetailWrapper />} />
            <Route path="/cong-cu" element={<Calculators />} />
            <Route path="/du-an" element={<Projects />} />
            <Route path="/tai-lieu" element={<div className="p-20 text-center text-slate-500">Thư viện tài liệu đang được cập nhật...</div>} />
            <Route path="/gui-thong-so" element={<LeadForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
