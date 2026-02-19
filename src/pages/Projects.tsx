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

      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 mb-8">
            <span className="px-3 py-1 bg-emerald-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest">{project.industry}</span>
            <span className="px-3 py-1 bg-white/10 text-white text-[10px] font-black rounded-full uppercase tracking-widest">{project.year}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">{project.title}</h1>
          <div className="flex items-center gap-8 text-slate-400">
            <div className="flex items-center gap-2"><MapPin className="h-5 w-5" /> {project.location}, {project.province}</div>
            <div className="flex items-center gap-2"><Zap className="h-5 w-5" /> {project.kva} kVA</div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Bài toán khách hàng</h2>
              <p className="text-lg text-slate-600 leading-relaxed">{project.problem}</p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Giải pháp kỹ thuật từ IPS</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">{project.solution}</p>
              <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
                <img src={project.image_url} alt="Thi công dự án" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            </section>

            <section className="p-10 bg-emerald-50 rounded-[2.5rem] border border-emerald-100">
              <h2 className="text-3xl font-bold text-emerald-900 mb-6 flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-emerald-600" /> Kết quả thực tế
              </h2>
              <p className="text-xl text-emerald-900 font-medium leading-relaxed">{project.result}</p>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Sản phẩm sử dụng</h3>
              {project.related_products?.map((p: any) => (
                <Link key={p.id} to={`/san-pham/${p.slug}`} className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all mb-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors text-sm">{p.name}</h4>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">{p.power_kva} kVA</div>
                  </div>
                </Link>
              ))}
              <Link to="/gui-thong-so" className="block w-full py-4 bg-emerald-600 text-white text-center rounded-xl font-bold hover:bg-emerald-700 transition-all mt-8">
                Nhận tư vấn dự án tương tự
              </Link>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl text-white">
              <h3 className="text-xl font-bold mb-6">Năng lực triển khai</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Factory className="h-5 w-5 text-emerald-400" /> Sản xuất trực tiếp 100%
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" /> Bảo hành tận nơi 24/7
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
