import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, Factory, ArrowRight, Users, Award } from 'lucide-react';
import { motion } from 'motion/react';

export function Home() {
  const [projects, setProjects] = React.useState<any[]>([]);
  const [capacity, setCapacity] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/projects').then(res => res.json()).then(setProjects);
    fetch('/api/manufacturing').then(res => res.json()).then(setCapacity);
  }, []);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section - Industrial Trust */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/factory-hero/1920/1080"
            alt="Industrial Transformer Factory"
            className="w-full h-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-600/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Factory className="h-3 w-3" /> Nhà sản xuất trực tiếp
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Nhà sản xuất máy biến áp & <span className="text-emerald-500">ổn áp công nghiệp</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Thiết kế theo yêu cầu kỹ thuật | OEM cho đối tác | Cung cấp toàn quốc. Đảm bảo chất lượng điện năng cho mọi dây chuyền sản xuất.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/gui-thong-so" className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-900/20">
                Nhận báo giá ngay
              </Link>
              <Link to="/san-pham" className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
                Xem danh mục sản phẩm
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Sản phẩm chủ lực</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Thiết bị điện công nghiệp đạt chuẩn IEC, TCVN với độ bền vượt trội.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Máy Biến Áp 3 Pha', slug: 'may-bien-ap-3-pha', desc: 'Hạ thế, cách ly, tự ngẫu từ 10kVA - 2500kVA.' },
            { name: 'Ổn Áp Công Nghiệp', slug: 'on-ap-cong-nghiep', desc: 'Ổn định điện áp dải rộng cho máy CNC, Laser.' },
            { name: 'Trạm Biến Áp Trung Thế', slug: 'bien-ap-trung-the', desc: 'Hệ thống trạm treo, trạm kios từ 6kV - 35kV.' },
          ].map((cat, i) => (
            <Link key={i} to={`/san-pham?cat=${cat.slug}`} className="group bg-white border border-slate-200 rounded-2xl p-8 hover:border-emerald-500 hover:shadow-2xl transition-all">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-50 transition-colors">
                <Zap className="h-8 w-8 text-slate-400 group-hover:text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">{cat.name}</h3>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">{cat.desc}</p>
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                Xem chi tiết <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Proof Section */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Factory, title: 'Sản xuất trực tiếp', desc: 'Làm chủ quy trình từ lõi thép đến vỏ tủ.' },
              { icon: ShieldCheck, title: 'Bảo hành 24-48 tháng', desc: 'Cam kết hỗ trợ kỹ thuật tận nơi nhanh chóng.' },
              { icon: Award, title: 'Kiểm định Quatest', desc: '100% sản phẩm đạt chuẩn đo lường chất lượng.' },
              { icon: Users, title: 'Kỹ sư chuyên môn', desc: 'Tư vấn giải pháp dựa trên thông số tải thực.' },
            ].map((item, i) => (
              <div key={i} className="text-center p-6">
                <div className="inline-flex p-4 bg-white rounded-2xl shadow-sm mb-6">
                  <item.icon className="h-8 w-8 text-emerald-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Capacity */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">Năng lực sản xuất thực tế</h2>
            <div className="space-y-8">
              {capacity.map((cap, i) => (
                <div key={i} className="flex gap-6">
                  <div className="text-2xl font-black text-slate-200">0{cap.sort_order}</div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{cap.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{cap.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/nang-luc" className="inline-flex items-center gap-2 mt-10 px-6 py-3 border-2 border-slate-900 text-slate-900 rounded-xl font-bold hover:bg-slate-900 hover:text-white transition-all">
              Tham quan nhà xưởng <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://picsum.photos/seed/m1/400/400" alt="Process 1" className="rounded-2xl shadow-lg" referrerPolicy="no-referrer" />
            <img src="https://picsum.photos/seed/m2/400/400" alt="Process 2" className="rounded-2xl shadow-lg mt-8" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Công trình tiêu biểu</h2>
              <p className="text-slate-400">Minh chứng cho năng lực triển khai thực tế.</p>
            </div>
            <Link to="/cong-trinh" className="text-emerald-400 font-bold flex items-center gap-2">
              Tất cả dự án <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((p, i) => (
              <div key={i} className="group relative overflow-hidden rounded-3xl aspect-video">
                <img src={p.image_url} alt={p.title} className="absolute inset-0 w-full h-full object-cover brightness-50 group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">{p.industry} | {p.kva}</div>
                  <h3 className="text-2xl font-bold mb-4">{p.title}</h3>
                  <Link to={`/cong-trinh/${p.slug}`} className="inline-flex items-center gap-2 text-sm font-bold border-b border-white/30 pb-1 hover:border-emerald-400 transition-colors">
                    Xem Case Study
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Lead Form */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-16 shadow-2xl shadow-slate-200/50">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Yêu cầu báo giá kỹ thuật</h2>
            <p className="text-slate-600">Gửi thông số máy hoặc bản vẽ, kỹ sư của chúng tôi sẽ phản hồi trong 2 giờ.</p>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="Tên công ty" className="px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            <input type="tel" placeholder="Số điện thoại" className="px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            <input type="text" placeholder="Công suất yêu cầu (kVA)" className="px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            <input type="text" placeholder="Ứng dụng (CNC, Solar, Nhà máy...)" className="px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" />
            <textarea placeholder="Mô tả yêu cầu kỹ thuật..." className="md:col-span-2 px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" rows={4}></textarea>
            <div className="md:col-span-2">
              <Link to="/gui-thong-so" className="w-full py-5 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-3">
                Gửi yêu cầu & Nhận báo giá <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
