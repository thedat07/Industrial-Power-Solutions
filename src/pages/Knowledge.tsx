import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BookOpen, Search, ArrowRight, Clock, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export function Knowledge() {
  const [articles, setArticles] = React.useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  React.useEffect(() => {
    fetch('/api/articles').then(res => res.json()).then(setArticles);
  }, []);

  const filteredArticles = articles.filter(art => 
    art.title.toLowerCase().includes(query.toLowerCase()) || 
    art.summary.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Kiến thức kỹ thuật</h1>
          <p className="text-slate-600">Thư viện chuyên sâu về chất lượng điện công nghiệp.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm vấn đề kỹ thuật..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            defaultValue={query}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3 space-y-8">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((art) => (
              <Link
                key={art.id}
                to={`/kien-thuc/${art.slug}`}
                className="group flex flex-col md:flex-row bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-emerald-500 hover:shadow-xl transition-all"
              >
                <div className="md:w-1/3 h-48 md:h-auto">
                  <img src={art.image_url} alt={art.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="p-8 md:w-2/3">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                    <span className="text-emerald-600">{art.category}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 5 phút đọc</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">{art.title}</h2>
                  <p className="text-slate-600 mb-6 leading-relaxed">{art.summary}</p>
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                    Đọc bài viết <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">Không tìm thấy bài viết phù hợp với từ khóa của bạn.</p>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 mb-6">Chủ đề phổ biến</h3>
            <div className="flex flex-wrap gap-2">
              {['Nguyên lý điện', 'Sự cố thực tế', 'Hướng dẫn chọn', 'So sánh công nghệ'].map(tag => (
                <button key={tag} className="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-emerald-600 rounded-2xl p-6 text-white">
            <h3 className="font-bold mb-4">Bạn đang gặp sự cố?</h3>
            <p className="text-sm text-emerald-50 mb-6">Gửi mô tả tình trạng điện, kỹ sư của chúng tôi sẽ phân tích nguyên nhân giúp bạn.</p>
            <Link to="/gui-thong-so" className="block w-full py-3 bg-white text-emerald-600 text-center rounded-xl font-bold hover:bg-emerald-50 transition-all">
              Gửi yêu cầu tư vấn
            </Link>
          </div>
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <Link to="/kien-thuc" className="text-emerald-600 font-bold text-sm flex items-center gap-2 mb-8">
          <ArrowRight className="h-4 w-4 rotate-180" /> Quay lại thư viện
        </Link>
        <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
          <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded">{article.category}</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 19/02/2026</span>
          <span className="flex items-center gap-1"><User className="h-3 w-3" /> Kỹ sư IPS</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-8">{article.title}</h1>
        <img src={article.image_url} alt={article.title} className="w-full h-96 object-cover rounded-3xl mb-12 shadow-xl" referrerPolicy="no-referrer" />
        
        <div className="prose prose-slate prose-lg max-w-none markdown-body">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-12 mt-20">
        <h3 className="text-2xl font-bold text-slate-900 mb-8">Bài viết liên quan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mock related articles */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2">Cách chọn công suất ổn áp cho máy CNC</h4>
            <p className="text-sm text-slate-600 mb-4">Hướng dẫn tính toán dòng khởi động và biên độ an toàn...</p>
            <Link to="#" className="text-emerald-600 font-bold text-xs flex items-center gap-1">Đọc tiếp <ArrowRight className="h-3 w-3" /></Link>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2">Sụt áp đường dây dài và cách xử lý</h4>
            <p className="text-sm text-slate-600 mb-4">Phân tích nguyên nhân và giải pháp bù áp cho nhà xưởng xa trạm...</p>
            <Link to="#" className="text-emerald-600 font-bold text-xs flex items-center gap-1">Đọc tiếp <ArrowRight className="h-3 w-3" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
