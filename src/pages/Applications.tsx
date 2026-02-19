import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Activity, AlertTriangle, Zap } from 'lucide-react';
import { JsonLd } from '@/src/components/SEO';

export function Applications() {
  const [apps, setApps] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/applications').then(res => res.json()).then(setApps);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <section className="bg-white border-b border-slate-200 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Giải pháp điện công nghiệp theo ngành</h1>
          <p className="text-xl text-slate-600 max-w-3xl font-medium leading-relaxed">
            IPS cung cấp các giải pháp ổn định nguồn điện chuyên sâu, được thiết kế riêng cho từng đặc thù ngành nghề sản xuất, từ nhà máy cơ khí đến hạ tầng trạm sạc xe điện.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {apps.map((app) => (
            <Link key={app.id} to={`/ung-dung/${app.slug}`} className="group bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all flex flex-col shadow-sm">
              <div className="aspect-video overflow-hidden">
                <img src={app.image_url} alt={app.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
              </div>
              <div className="p-12 flex-grow">
                <h2 className="text-3xl font-black text-slate-900 mb-6 group-hover:text-accent transition-colors uppercase tracking-tight">{app.title}</h2>
                <p className="text-slate-500 mb-10 line-clamp-2 font-medium leading-relaxed">{app.problem}</p>
                <div className="flex items-center gap-2 text-accent font-black text-xs uppercase tracking-widest">
                  Xem giải pháp kỹ thuật chi tiết <ArrowRight className="h-4 w-4" />
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

      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter">{app.title}</h1>
            <p className="text-xl text-slate-400 leading-relaxed font-medium">{app.problem}</p>
          </div>
        </div>
        <Zap className="absolute -right-20 -bottom-20 h-96 w-96 text-white/5 rotate-12" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-20">
            {/* Problem Section */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-3 uppercase tracking-tighter">
                <AlertTriangle className="h-8 w-8 text-accent" /> Vấn đề thường gặp
              </h2>
              <div className="bg-slate-50 border-l-8 border-accent p-10 rounded-r-[2.5rem]">
                <p className="text-xl text-slate-900 leading-relaxed font-bold italic">"{app.problem}"</p>
              </div>
            </section>

            {/* Solution Section */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-3 uppercase tracking-tighter">
                <ShieldCheck className="h-8 w-8 text-accent" /> Giải pháp đề xuất từ IPS
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-medium">
                <p className="text-xl mb-12">{app.solution}</p>
                <div className="p-10 bg-primary text-white rounded-[2.5rem] border border-white/10 shadow-2xl">
                  <h4 className="text-accent font-black uppercase text-xs tracking-widest mb-6">Thiết bị đề xuất:</h4>
                  <Link to="/san-pham?cat=may-bien-ap-3-pha" className="inline-flex items-center gap-3 text-2xl font-black hover:text-accent transition-colors uppercase tracking-tight">
                    Máy biến áp 3 pha IPS <ArrowRight className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Diagram */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-3 uppercase tracking-tighter">
                <Activity className="h-8 w-8 text-slate-400" /> Sơ đồ lắp đặt tiêu chuẩn
              </h2>
              <div className="bg-slate-50 rounded-[3rem] overflow-hidden border-2 border-slate-100 shadow-2xl">
                <img src={app.diagram_url} alt="Sơ đồ kỹ thuật" className="w-full" referrerPolicy="no-referrer" />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 sticky top-32">
              <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight">Tư vấn giải pháp</h3>
              <form className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tên của bạn</label>
                  <input type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-accent font-bold" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Số điện thoại</label>
                  <input type="tel" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-accent font-bold" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mô tả hiện trạng điện</label>
                  <textarea className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-accent font-bold" rows={4}></textarea>
                </div>
                <button className="w-full py-5 bg-accent text-white rounded-xl font-black text-sm uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-orange-900/20">Gửi yêu cầu ngay</button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
