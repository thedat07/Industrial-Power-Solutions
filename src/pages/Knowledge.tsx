import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ArrowRight, Clock, User, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { JsonLd } from '@/src/components/SEO';

export function Knowledge() {
  const [articles, setArticles] = React.useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCat = searchParams.get('cat') || '';
  const query = searchParams.get('q') || '';

  const categories = [
    { id: 'selection', name: 'Hướng dẫn chọn', slug: 'huong-dan-chon' },
    { id: 'comparison', name: 'So sánh', slug: 'so-sanh' },
    { id: 'error', name: 'Lỗi & Sự cố', slug: 'loi-su-co' },
    { id: 'standard', name: 'Tiêu chuẩn', slug: 'tieu-chuan' },
  ];

  React.useEffect(() => {
    const params = new URLSearchParams();
    if (activeCat) params.append('category', activeCat);
    fetch(`/api/articles?${params.toString()}`).then(res => res.json()).then(setArticles);
  }, [activeCat]);

  const filteredArticles = articles.filter(art => 
    art.title.toLowerCase().includes(query.toLowerCase()) || 
    art.summary.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Thư viện kỹ thuật IPS",
        "description": "Kiến thức chuyên sâu về máy biến áp, ổn áp và chất lượng điện năng."
      }} />

      <section className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Kiến thức kỹ thuật & Tiêu chuẩn điện năng</h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Thư viện chuyên sâu dành cho kỹ sư điện, cung cấp hướng dẫn lựa chọn thiết bị, phân tích sự cố và cập nhật các tiêu chuẩn điện công nghiệp mới nhất.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-1/4 space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Chuyên mục</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSearchParams({})}
                  className={cn(
                    "w-full text-left px-4 py-2 rounded-lg text-sm font-bold transition-all",
                    !activeCat ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  Tất cả bài viết
                </button>
                {categories.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setSearchParams({ cat: c.id })}
                    className={cn(
                      "w-full text-left px-4 py-2 rounded-lg text-sm font-bold transition-all",
                      activeCat === c.id ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-emerald-600 rounded-2xl p-8 text-white shadow-xl shadow-emerald-900/10">
              <h4 className="text-xl font-bold mb-4">Tư vấn kỹ thuật miễn phí</h4>
              <p className="text-sm text-emerald-50 mb-6">Kỹ sư IPS hỗ trợ tính toán công suất và bắt bệnh hệ thống điện 24/7.</p>
              <Link to="/gui-thong-so" className="block w-full py-3 bg-white text-emerald-600 text-center rounded-xl font-bold hover:bg-emerald-50 transition-all">
                Gửi yêu cầu ngay
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4 space-y-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết, tiêu chuẩn, lỗi kỹ thuật..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none shadow-sm"
                value={query}
                onChange={e => setSearchParams({ q: e.target.value, cat: activeCat })}
              />
            </div>

            <div className="grid grid-cols-1 gap-8">
              {filteredArticles.map((art) => (
                <Link
                  key={art.id}
                  to={`/kien-thuc/${art.slug}`}
                  className="group bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-emerald-500 hover:shadow-2xl transition-all flex flex-col md:flex-row"
                >
                  <div className="md:w-2/5 h-64 md:h-auto overflow-hidden">
                    <img src={art.image_url} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-10 md:w-3/5">
                    <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                      <span className="text-emerald-600">{art.category}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(art.published_at).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors leading-tight">{art.title}</h2>
                    <p className="text-slate-600 mb-8 line-clamp-3 leading-relaxed">{art.summary}</p>
                    <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                      Đọc chi tiết bài viết <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export function ArticleDetail({ slug }: { slug: string }) {
  const [article, setArticle] = React.useState<any>(null);

  React.useEffect(() => {
    fetch(`/api/articles/${slug}`).then(res => res.json()).then(setArticle);
  }, [slug]);

  if (!article) return <div className="p-20 text-center">Đang tải...</div>;

  return (
    <div className="bg-white min-h-screen pb-24">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.summary,
        "image": article.image_url,
        "author": { "@type": "Organization", "name": "Kỹ sư IPS" },
        "publisher": { "@type": "Organization", "name": "IPS" },
        "datePublished": article.published_at
      }} />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-12">
          <Link to="/kien-thuc" className="hover:text-emerald-600">Thư viện</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-900">{article.title}</span>
        </nav>

        <header className="mb-16">
          <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
            <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded">{article.category}</span>
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(article.published_at).toLocaleDateString('vi-VN')}</span>
            <span className="flex items-center gap-1"><User className="h-3 w-3" /> Kỹ sư IPS</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-8">{article.title}</h1>
          <p className="text-xl text-slate-600 leading-relaxed italic border-l-4 border-emerald-500 pl-6">{article.summary}</p>
        </header>

        <div className="aspect-video rounded-3xl overflow-hidden mb-16 shadow-2xl">
          <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>

        <div className="prose prose-slate prose-lg max-w-none markdown-body">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>

        {/* In-article CTA */}
        <div className="my-16 p-10 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">Bạn cần tính toán công suất cho nhà máy?</h3>
            <p className="text-slate-400 mb-8 max-w-xl">Để lại thông số tải, kỹ sư của chúng tôi sẽ gửi bản tính toán và báo giá tối ưu nhất cho bạn.</p>
            <Link to="/gui-thong-so" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all">
              Gửi thông số ngay <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <Zap className="absolute -right-8 -bottom-8 h-48 w-48 text-white/5 rotate-12" />
        </div>
      </section>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
