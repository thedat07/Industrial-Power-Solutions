import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { Navbar, Footer } from './components/Layout';
import { Home } from './pages/Home';
import { AboutUs } from './pages/AboutUs';
import { Products, ProductDetail } from './pages/Products';
import { Manufacturing } from './pages/Manufacturing';
import { Applications, ApplicationDetail } from './pages/Applications';
import { Knowledge, ArticleDetail } from './pages/Knowledge';
import { Calculators } from './pages/Calculators';
import { Projects, ProjectDetail } from './pages/Projects';
import { LeadForm } from './pages/LeadForm';
import { DocumentCenter } from './pages/DocumentCenter';

function ProductDetailWrapper() {
  const { slug } = useParams();
  return <ProductDetail slug={slug || ''} />;
}

function ApplicationDetailWrapper() {
  const { slug } = useParams();
  return <ApplicationDetail slug={slug || ''} />;
}

function ProjectDetailWrapper() {
  const { slug } = useParams();
  return <ProjectDetail slug={slug || ''} />;
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
            <Route path="/gioi-thieu" element={<AboutUs />} />
            <Route path="/san-pham" element={<Products />} />
            <Route path="/san-pham/:slug" element={<ProductDetailWrapper />} />
            <Route path="/nang-luc" element={<Manufacturing />} />
            <Route path="/ung-dung" element={<Applications />} />
            <Route path="/ung-dung/:slug" element={<ApplicationDetailWrapper />} />
            <Route path="/kien-thuc" element={<Knowledge />} />
            <Route path="/kien-thuc/:slug" element={<ArticleDetailWrapper />} />
            <Route path="/cong-cu" element={<Calculators />} />
            <Route path="/cong-trinh" element={<Projects />} />
            <Route path="/cong-trinh/:slug" element={<ProjectDetailWrapper />} />
            <Route path="/tai-lieu" element={<DocumentCenter />} />
            <Route path="/gui-thong-so" element={<LeadForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
