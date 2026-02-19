import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Briefcase, MapPin, CheckCircle2, ArrowRight, Zap, ShieldCheck, Factory } from 'lucide-react';
import { JsonLd } from '@/src/components/SEO';

export function Projects() {
  const [projects, setProjects] = React.useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const industry = searchParams.get('industry') || '';
  const province = searchParams.get('province') || '';

  React.useEffect(() => {
    const params = new URLSearchParams();
    if (industry) params.append('industry', industry);
    if (province) params.append('province', province);
    fetch(`/api/projects?${params.toString()}`).then(res => res.json()).then(setProjects);
  }, [industry, province]);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <section className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Dự án & Công trình tiêu biểu</h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Minh chứng cho năng lực triển khai thực tế của IPS qua các công trình trạm biến áp, hệ thống ổn áp công nghiệp quy mô lớn trên toàn quốc.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-12">
          <select 
            value={industry} 
            onChange={e => setSearchParams({ industry: e.target.value, province })}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none focus:border-emerald-500"
          >
            <option value="">Tất cả ngành</option>
            <option value="nha-may">Nhà máy sản xuất</option>
            <option value="co-khi">Cơ khí</option>
            <option value="solar">Solar</option>
          </select>
          <select 
            value={province} 
            onChange={e => setSearchParams({ industry, province: e.target.value })}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none focus:border-emerald-500"
          >
            <option value="">Tất cả tỉnh thành</option>
            <option value="Bắc Ninh">Bắc Ninh</option>
            <option value="Hưng Yên">Hưng Yên</option>
            <option value="Hải Phòng">Hải Phòng</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {projects.map((project) => (
            <div key={project.id} className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-80 lg:h-auto overflow-hidden">
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="p-10 lg:p-16">
                  <div className="flex flex-wrap gap-4 mb-8">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full uppercase tracking-widest flex items-center gap-1">
                      <Briefcase className="h-3 w-3" /> {project.industry}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded-full uppercase tracking-widest flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {project.province}
                    </span>
                    <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                      {project.kva} kVA
                    </span>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-slate-900 mb-8 leading-tight">{project.title}</h2>
                  
                  <div className="space-y-8 mb-12">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Vấn đề ban đầu</h4>
                      <p className="text-slate-600 leading-relaxed line-clamp-2">{project.problem}</p>
                    </div>
                    <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" /> Kết quả vận hành
                      </h4>
                      <p className="text-emerald-900 font-bold leading-relaxed">{project.result}</p>
                    </div>
                  </div>

                  <Link to={`/cong-trinh/${project.slug}`} className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200">
                    Xem chi tiết Case Study <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectDetail({ slug }: { slug: string }) {
  const [project, setProject] = React.useState<any>(null);

  React.useEffect(() => {
    fetch(`/api/projects/${slug}`).then(res => res.json()).then(setProject);
  }, [slug]);

  if (!project) return <div className="p-20 text-center">Đang tải...</div>;

  return (
    <div className="bg-white min-h-screen pb-24">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": project.title,
        "description": project.problem,
        "image": project.image_url,
        "author": { "@type": "Organization", "name": "IPS Projects" }
      }} />

      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap gap-4 mb-8">
            <span className="px-3 py-1 bg-accent text-white text-[10px] font-black rounded-full uppercase tracking-widest">{project.industry}</span>
            <span className="px-3 py-1 bg-white/10 text-white text-[10px] font-black rounded-full uppercase tracking-widest">{project.year}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight uppercase tracking-tighter">{project.title}</h1>
          <div className="flex items-center gap-8 text-slate-400 font-bold text-sm uppercase tracking-widest">
            <div className="flex items-center gap-2"><MapPin className="h-5 w-5 text-accent" /> {project.location}, {project.province}</div>
            <div className="flex items-center gap-2"><Zap className="h-5 w-5 text-accent" /> {project.kva} kVA</div>
          </div>
        </div>
        <Zap className="absolute -right-20 -bottom-20 h-96 w-96 text-white/5 rotate-12" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-20">
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tighter flex items-center gap-3">
                <div className="w-2 h-8 bg-accent"></div> Bài toán khách hàng
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">{project.problem}</p>
            </section>

            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tighter flex items-center gap-3">
                <div className="w-2 h-8 bg-accent"></div> Giải pháp kỹ thuật từ IPS
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed font-medium mb-12">{project.solution}</p>
              <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50">
                <img src={project.image_url} alt="Thi công dự án" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </section>

            <section className="p-12 bg-slate-950 rounded-[3rem] text-white relative overflow-hidden">
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3 uppercase tracking-tighter">
                <ShieldCheck className="h-8 w-8 text-accent" /> Kết quả thực tế
              </h2>
              <p className="text-2xl text-slate-300 font-bold leading-relaxed relative z-10">{project.result}</p>
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <CheckCircle2 className="h-32 w-32" />
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] border-2 border-slate-100 shadow-2xl shadow-slate-200/50">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Thiết bị triển khai</h3>
              {project.related_products?.map((p: any) => (
                <Link key={p.id} to={`/san-pham/${p.slug}`} className="group flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-accent transition-all mb-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white">
                    <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 group-hover:text-accent transition-colors text-xs uppercase tracking-tight">{p.name}</h4>
                    <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">{p.power_kva} kVA</div>
                  </div>
                </Link>
              ))}
              <Link to="/gui-thong-so" className="block w-full py-5 bg-accent text-white text-center rounded-xl font-black text-sm uppercase tracking-widest hover:brightness-110 transition-all mt-8">
                Nhận tư vấn dự án tương tự
              </Link>
            </div>

            <div className="bg-primary p-10 rounded-[2.5rem] text-white">
              <h3 className="text-xl font-black mb-8 uppercase tracking-tight">Năng lực triển khai</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-sm font-bold">
                  <Factory className="h-6 w-6 text-accent" /> Sản xuất trực tiếp 100%
                </div>
                <div className="flex items-center gap-4 text-sm font-bold">
                  <ShieldCheck className="h-6 w-6 text-accent" /> Bảo hành tận nơi 24/7
                </div>
                <div className="flex items-center gap-4 text-sm font-bold">
                  <Zap className="h-6 w-6 text-accent" /> Đội ngũ kỹ sư hiện trường
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
