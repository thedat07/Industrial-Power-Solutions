import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Factory, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function Home() {
  const [projects, setProjects] = React.useState<any[]>([]);
  const [capacity, setCapacity] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/projects').then(res => res.json()).then(setProjects);
    fetch('/api/manufacturing').then(res => res.json()).then(setCapacity);
  }, []);

  return (
    <div className="space-y-0 pb-0">
      {/* Hero Section - Industrial Factory Focus */}
      <section className="relative min-h-[700px] flex items-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/factory-real/1920/1080"
            alt="Nhà máy sản xuất máy biến áp IPS"
            className="w-full h-full object-cover opacity-40 grayscale-[0.5]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/30 rounded-lg text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                <Factory className="h-3 w-3" /> Nhà sản xuất trực tiếp
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 uppercase tracking-tighter">
                Nhà sản xuất <br />
                <span className="text-accent">Máy biến áp</span> <br />
                Ổn áp công nghiệp
              </h1>
              <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-xl font-medium">
                Thiết kế theo yêu cầu kỹ thuật | OEM | Cung cấp toàn quốc. <br />
                Đảm bảo chất lượng điện năng cho mọi dây chuyền sản xuất.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/gui-thong-so" className="px-10 py-5 bg-accent text-white rounded-xl font-black text-lg hover:brightness-110 transition-all shadow-2xl shadow-orange-900/40 uppercase tracking-tight">
                  Nhận báo giá ngay
                </Link>
                <Link to="/san-pham" className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl font-black text-lg hover:bg-white/20 transition-all uppercase tracking-tight">
                  Xem danh mục sản phẩm
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <img 
                src="https://picsum.photos/seed/transformer-hero/800/800" 
                alt="Máy biến áp 2500kVA" 
                className="rounded-[3rem] shadow-2xl border-8 border-white/5"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-slate-100">
                <div className="text-4xl font-black text-primary mb-1">2500kVA</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Công suất tối đa</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-primary py-8 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Năm kinh nghiệm', value: '15+' },
              { label: 'Dự án lắp đặt', value: '2,500+' },
              { label: 'Công suất/tháng', value: '5,000kVA' },
              { label: 'Bảo hành tận nơi', value: '24-48T' },
            ].map((item, i) => (
              <div key={i} className="border-r border-white/10 last:border-0">
                <div className="text-2xl font-black text-accent">{item.value}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Products Grid - Industrial Style */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">Sản phẩm chủ lực</h2>
            <p className="text-slate-500 font-medium">Thiết bị điện công nghiệp đạt chuẩn IEC, TCVN.</p>
          </div>
          <Link to="/san-pham" className="hidden md:flex items-center gap-2 text-accent font-black uppercase text-xs tracking-widest hover:gap-4 transition-all">
            Tất cả sản phẩm <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Máy Biến Áp 3 Pha', slug: 'may-bien-ap-3-pha', range: '10kVA - 2500kVA', vin: '22kV/35kV/380V', img: 'https://picsum.photos/seed/p1/600/600' },
            { name: 'Ổn Áp Công Nghiệp', slug: 'on-ap-cong-nghiep', range: '50kVA - 1000kVA', vin: '160V - 430V', img: 'https://picsum.photos/seed/p2/600/600' },
            { name: 'Trạm Biến Áp Kios', slug: 'bien-ap-trung-the', range: '100kVA - 2000kVA', vin: '22kV/35kV', img: 'https://picsum.photos/seed/p3/600/600' },
          ].map((cat, i) => (
            <Link key={i} to={`/san-pham?cat=${cat.slug}`} className="group bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-accent hover:shadow-2xl transition-all flex flex-col">
              <div className="aspect-square overflow-hidden bg-slate-100">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-slate-900 mb-6 group-hover:text-accent transition-colors uppercase tracking-tighter">{cat.name}</h3>
                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest border-b border-slate-50 pb-2">
                    <span className="text-slate-400">Dải công suất</span>
                    <span className="text-slate-900">{cat.range}</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest border-b border-slate-50 pb-2">
                    <span className="text-slate-400">Điện áp phổ biến</span>
                    <span className="text-slate-900">{cat.vin}</span>
                  </div>
                </div>
                <div className="w-full py-4 bg-slate-950 text-white text-center rounded-xl font-black text-xs uppercase tracking-widest group-hover:bg-accent transition-colors">
                  Xem chi tiết catalogue
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Manufacturing Proof */}
      <section className="bg-slate-50 py-24 industrial-grid border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Năng lực sản xuất thực tế</h2>
              <div className="space-y-10">
                {capacity.map((cap, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="text-5xl font-black text-slate-200 group-hover:text-accent transition-colors leading-none">0{cap.sort_order}</div>
                    <div>
                      <h4 className="font-black text-slate-900 mb-2 uppercase tracking-tight text-lg">{cap.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">{cap.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/nang-luc" className="inline-flex items-center gap-3 mt-12 px-8 py-4 bg-primary text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-all">
                Tham quan nhà xưởng <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <img src="https://picsum.photos/seed/m1/500/700" alt="Quy trình 1" className="rounded-3xl shadow-2xl border-4 border-white" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/m2/500/700" alt="Quy trình 2" className="rounded-3xl shadow-2xl border-4 border-white mt-12" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-slate-950 py-24 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Công trình tiêu biểu</h2>
              <p className="text-slate-500 font-medium">Minh chứng cho năng lực triển khai thực tế trên toàn quốc.</p>
            </div>
            <Link to="/cong-trinh" className="text-accent font-black uppercase text-xs tracking-widest flex items-center gap-2 hover:gap-4 transition-all">
              Tất cả dự án <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((p, i) => (
              <div key={i} className="group relative overflow-hidden rounded-[2.5rem] aspect-[16/10] border border-white/5">
                <img src={p.image_url} alt={p.title} className="absolute inset-0 w-full h-full object-cover brightness-[0.3] group-hover:scale-105 transition-transform duration-1000" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-10 w-full">
                  <div className="flex gap-3 mb-4">
                    <span className="px-3 py-1 bg-accent text-white text-[10px] font-black uppercase tracking-widest rounded-full">{p.industry}</span>
                    <span className="px-3 py-1 bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-full">{p.kva} kVA</span>
                  </div>
                  <h3 className="text-3xl font-black mb-6 uppercase tracking-tight leading-tight">{p.title}</h3>
                  <Link to={`/cong-trinh/${p.slug}`} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-accent border-b-2 border-accent/30 pb-1 hover:border-accent transition-all">
                    Xem Case Study kỹ thuật <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Width Technical RFQ Form */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 border-2 border-slate-100 rounded-[3rem] p-10 md:p-20 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Yêu cầu báo giá kỹ thuật (RFQ)</h2>
                <p className="text-slate-500 font-medium">Gửi thông số máy hoặc bản vẽ, kỹ sư của chúng tôi sẽ phản hồi trong 2 giờ.</p>
              </div>
              
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tên công ty / Đơn vị</label>
                  <input type="text" className="w-full px-6 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent outline-none font-bold" placeholder="Cty TNHH..." />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Số điện thoại liên hệ</label>
                  <input type="tel" className="w-full px-6 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent outline-none font-bold" placeholder="09xx xxx xxx" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Công suất yêu cầu (kVA)</label>
                  <input type="text" className="w-full px-6 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent outline-none font-bold" placeholder="Ví dụ: 250kVA" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Ứng dụng thiết bị</label>
                  <input type="text" className="w-full px-6 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent outline-none font-bold" placeholder="CNC, Solar, Nhà máy..." />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mô tả yêu cầu kỹ thuật đặc biệt</label>
                  <textarea className="w-full px-6 py-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent outline-none font-bold" rows={4} placeholder="Ví dụ: Điện áp vào 22kV, ra 400V, làm mát ONAN..."></textarea>
                </div>
                <div className="md:col-span-2">
                  <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center group hover:border-accent transition-all relative bg-white">
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) alert(`Đã chọn tệp: ${file.name}`);
                      }}
                    />
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-accent transition-colors">Tải lên bản vẽ hoặc ảnh tem máy (PDF, JPG, PNG)</p>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="w-full py-6 bg-accent text-white rounded-2xl font-black text-xl uppercase tracking-tighter hover:brightness-110 transition-all shadow-2xl shadow-orange-900/20 flex items-center justify-center gap-4">
                    Gửi yêu cầu & Nhận báo giá <ArrowRight className="h-6 w-6" />
                  </button>
                </div>
              </form>
            </div>
            <Zap className="absolute -right-20 -bottom-20 h-80 w-80 text-slate-200/50 rotate-12" />
          </div>
        </div>
      </section>
    </div>
  );
}
