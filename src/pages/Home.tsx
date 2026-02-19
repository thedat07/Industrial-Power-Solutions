import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, AlertTriangle, Calculator, Settings, ArrowRight, CheckCircle2, Factory, Activity } from 'lucide-react';
import { motion } from 'motion/react';

const problems = [
  { title: 'Điện yếu', desc: 'Máy không đủ áp để khởi động hoặc chạy đúng công suất.' },
  { title: 'Nhảy CB', desc: 'CB nhảy ngẫu nhiên vào giờ cao điểm dù không quá tải.' },
  { title: 'Máy Reset', desc: 'Máy CNC tự khởi động lại khi đang gia công.' },
  { title: 'Motor Nóng', desc: 'Động cơ nóng bất thường, giảm tuổi thọ cách điện.' },
  { title: 'Lệch Pha', desc: 'Điện áp giữa các pha không đều gây rung motor.' },
  { title: 'Sụt Áp', desc: 'Áp tụt sâu khi các máy lớn trong xưởng khởi động.' },
];

const industries = [
  { name: 'Máy CNC', slug: 'cho-cnc', icon: Settings },
  { name: 'Thang máy', slug: 'cho-thang-may', icon: Activity },
  { name: 'Nhà xưởng', slug: 'cho-nha-xuong', icon: Factory },
  { name: 'Phòng sơn', slug: 'cho-phong-son', icon: Zap },
];

export function Home() {
  const [projects, setProjects] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/projects').then(res => res.json()).then(setProjects);
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative bg-slate-50 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
                Giải pháp ổn định nguồn điện cho <span className="text-emerald-600">hệ thống công nghiệp</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg">
                Nguồn điện không ổn định gây dừng dây chuyền, lỗi PLC, hỏng Inverter và cháy Motor. Chúng tôi phân tích và xử lý tận gốc nguyên nhân điện.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/giai-phap" className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
                  Tôi đang gặp sự cố <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/cong-cu" className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-900 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-all">
                  Tính công suất <Calculator className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-emerald-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <img
                  src="https://picsum.photos/seed/elec/800/600"
                  alt="Industrial Electrical System"
                  className="relative rounded-2xl shadow-2xl border border-white/20"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-slate-100">
          {[
            { label: 'Năm hoạt động', value: '15+' },
            { label: 'Tổng kVA đã lắp', value: '500k+' },
            { label: 'Nhà máy phục vụ', value: '1200+' },
            { label: 'Ngành tiêu biểu', value: '25+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problems Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Các sự cố thường gặp</h2>
          <p className="text-slate-600">Nhấp vào sự cố để xem phân tích nguyên nhân kỹ thuật</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((prob, i) => (
            <Link
              key={i}
              to={`/kien-thuc?q=${prob.title}`}
              className="group p-6 bg-white border border-slate-200 rounded-2xl hover:border-emerald-500 hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-emerald-50 transition-colors">
                  <AlertTriangle className="h-6 w-6 text-slate-400 group-hover:text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">{prob.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{prob.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Industry Solutions */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold mb-4">Giải pháp theo ứng dụng</h2>
              <p className="text-slate-400 max-w-xl">Mỗi loại máy móc có đặc thù về dòng khởi động và độ nhạy áp khác nhau. Chúng tôi thiết kế giải pháp riêng biệt.</p>
            </div>
            <Link to="/giai-phap" className="text-emerald-400 font-semibold flex items-center gap-2 hover:text-emerald-300">
              Xem tất cả giải pháp <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {industries.map((ind, i) => (
              <Link
                key={i}
                to={`/giai-phap/${ind.slug}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] bg-slate-800"
              >
                <img
                  src={`https://picsum.photos/seed/${ind.slug}/400/500`}
                  alt={ind.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <ind.icon className="h-8 w-8 text-emerald-500 mb-4" />
                  <h3 className="text-xl font-bold">{ind.name}</h3>
                  <p className="text-sm text-slate-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Xem chi tiết giải pháp</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Dự án thực tế</h2>
          <p className="text-slate-600">Dữ liệu thật từ các công trình đã triển khai</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div key={i} className="flex flex-col md:flex-row bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="md:w-1/3 h-48 md:h-auto">
                <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="p-6 md:w-2/3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">
                  <CheckCircle2 className="h-4 w-4" /> {project.industry} - {project.kva}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{project.title}</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <p><strong>Vấn đề:</strong> {project.problem}</p>
                  <p><strong>Kết quả:</strong> {project.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Bạn cần tư vấn cấu hình thiết bị?</h2>
            <p className="text-emerald-50 mb-10 text-lg max-w-2xl mx-auto">
              Gửi thông số tải hoặc ảnh tem máy, kỹ sư của chúng tôi sẽ tính toán và đề xuất giải pháp tối ưu nhất cho hệ thống của bạn.
            </p>
            <Link to="/gui-thong-so" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all shadow-xl">
              Gửi thông số ngay <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Mail(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
