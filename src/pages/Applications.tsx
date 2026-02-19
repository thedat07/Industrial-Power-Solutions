import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Activity, AlertTriangle } from 'lucide-react';
import { JsonLd } from '@/src/components/SEO';

export function Applications() {
  const [apps, setApps] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/applications').then(res => res.json()).then(setApps);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <section className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Giải pháp điện công nghiệp theo ngành</h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            IPS cung cấp các giải pháp ổn định nguồn điện chuyên sâu, được thiết kế riêng cho từng đặc thù ngành nghề sản xuất và hạ tầng.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {apps.map((app) => (
            <Link key={app.id} to={`/ung-dung/${app.slug}`} className="group bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-2xl transition-all flex flex-col">
              <div className="aspect-video overflow-hidden">
                <img src={app.image_url} alt={app.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="p-10 flex-grow">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">{app.title}</h2>
                <p className="text-slate-600 mb-8 line-clamp-2">{app.problem}</p>
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  Xem giải pháp chi tiết <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ApplicationDetail({ slug }: { slug: string }) {
  const [app, setApp] = React.useState<any>(null);

  React.useEffect(() => {
    fetch(`/api/applications/${slug}`).then(res => res.json()).then(setApp);
  }, [slug]);

  if (!app) return <div className="p-20 text-center">Đang tải...</div>;

  return (
    <div className="bg-white min-h-screen pb-24">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": app.title,
        "description": app.problem,
        "step": [
          {
            "@type": "HowToStep",
            "text": app.solution
          }
        ]
      }} />

      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-8">{app.title}</h1>
            <p className="text-xl text-slate-400 leading-relaxed">{app.problem}</p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            {/* Problem Section */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-red-500" /> Vấn đề thường gặp
              </h2>
              <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-r-2xl">
                <p className="text-lg text-red-900 leading-relaxed">{app.problem}</p>
              </div>
            </section>

            {/* Solution Section */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-emerald-600" /> Giải pháp đề xuất từ IPS
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                <p className="text-lg">{app.solution}</p>
                <div className="mt-8 p-8 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-4">Sản phẩm đề xuất:</h4>
                  <Link to="/san-pham?cat=may-bien-ap-3-pha" className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:underline">
                    Máy biến áp 3 pha IPS <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Diagram */}
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <Activity className="h-8 w-8 text-slate-400" /> Sơ đồ lắp đặt tiêu chuẩn
              </h2>
              <div className="bg-slate-100 rounded-3xl overflow-hidden border border-slate-200">
                <img src={app.diagram_url} alt="Sơ đồ kỹ thuật" className="w-full" referrerPolicy="no-referrer" />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl shadow-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Nhận tư vấn giải pháp</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Tên của bạn" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500" />
                <input type="tel" placeholder="Số điện thoại" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500" />
                <textarea placeholder="Mô tả hiện trạng điện..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-emerald-500" rows={4}></textarea>
                <button className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all">Gửi yêu cầu ngay</button>
              </form>
            </div>

            <div className="bg-slate-900 rounded-3xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">Dự án tương tự</h3>
              <div className="space-y-4">
                <Link to="/cong-trinh" className="block p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                  <div className="text-xs text-emerald-400 font-bold mb-1">Nhà máy nhựa</div>
                  <div className="text-sm font-bold">Trạm biến áp 1000kVA Hưng Yên</div>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
