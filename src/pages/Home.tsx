import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Factory, ArrowRight, AlertTriangle, CheckCircle2, Activity, Settings } from 'lucide-react';
import { motion } from 'motion/react';

export function Home() {
  const [articles, setArticles] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/articles').then(res => res.json()).then(data => setArticles(data.slice(0, 6)));
  }, []);

  const symptoms = [
    { title: "Máy chạy yếu khi ở cuối xưởng", slug: "may-chay-yeu-khi-o-cuoi-xuong" },
    { title: "Motor nóng nhanh dù không quá tải", slug: "motor-nong-nhanh-du-khong-qua-tai" },
    { title: "Máy CNC hoặc biến tần báo lỗi điện áp", slug: "may-cnc-hoac-bien-tan-bao-loi-dien-ap" },
    { title: "Nhảy aptomat khi khởi động máy lớn", slug: "nhay-aptomat-khi-khoi-dong-may-lon" },
    { title: "Bật máy hàn thì đèn nhấp nháy, PLC reset", slug: "bat-may-han-thi-den-nhap-nhay-plc-reset" },
    { title: "Điện áp lúc cao lúc thấp theo giờ", slug: "dien-ap-luc-cao-luc-thap-theo-gio" },
    { title: "Không rõ nhưng máy hoạt động không ổn định", slug: "khong-ro-nhung-may-hoat-dong-khong-on-dinh" }
  ];

  const solutions = [
    {
      title: "Ổn định điện cho máy CNC",
      desc: "Tránh lỗi undervoltage và reset driver",
      icon: Settings
    },
    {
      title: "Cải thiện điện cuối xưởng",
      desc: "Giảm sụt áp khi tải tăng",
      icon: Activity
    },
    {
      title: "Nguồn riêng cho máy công suất lớn",
      desc: "Tránh ảnh hưởng toàn hệ thống",
      icon: Zap
    },
    {
      title: "Biến áp cho máy nhập khẩu",
      desc: "Đúng điện áp – đúng công suất – không quá tải",
      icon: Factory
    }
  ];

  return (
    <div className="space-y-0 pb-0 bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[800px] flex items-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/factory-technical/1920/1080"
            alt="Technical Factory Context"
            className="w-full h-full object-cover opacity-30 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/30 rounded-lg text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                <AlertTriangle className="h-3 w-3" /> Chẩn đoán sự cố điện công nghiệp
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.1] mb-8 uppercase tracking-tighter">
                Xưởng bị yếu điện, máy hay lỗi <br />
                <span className="text-accent">nhưng không rõ nguyên nhân?</span>
              </h1>
              <p className="text-xl md:text-2xl text-white font-bold mb-4 leading-tight">
                Đừng thay thiết bị trước khi biết chính xác vấn đề. <br />
                Nhập vài thông số — kỹ sư sẽ phân tích giúp bạn trong 15 phút.
              </p>
              <p className="text-lg text-slate-400 mb-12 leading-relaxed max-w-2xl font-medium">
                Phần lớn nhà xưởng gặp sự cố không phải do máy hỏng mà do điện áp sụt, lệch pha hoặc nguồn không đủ khi tải tăng. 
                Chúng tôi hỗ trợ kiểm tra miễn phí trước khi bạn phải tốn chi phí sửa chữa.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="space-y-3">
                  <Link to="/gui-thong-so" className="inline-flex px-10 py-6 bg-accent text-white rounded-xl font-black text-xl hover:brightness-110 transition-all shadow-2xl shadow-orange-900/40 uppercase tracking-tight">
                    Bắt đầu kiểm tra sự cố
                  </Link>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center sm:text-left">
                    Không cần mua — vẫn hỗ trợ xác định nguyên nhân
                  </p>
                </div>
                <Link to="/kien-thuc" className="px-10 py-6 bg-white/5 backdrop-blur-md text-white border border-white/20 rounded-xl font-black text-xl hover:bg-white/10 transition-all uppercase tracking-tight">
                  Xem các lỗi thường gặp
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SYMPTOMS SECTION */}
      <section className="py-32 bg-slate-50 industrial-grid border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Bạn đang gặp tình trạng nào trong xưởng?</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">Chọn đúng hiện tượng bạn thấy — hệ thống sẽ gợi ý nguyên nhân phổ biến nhất.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {symptoms.map((symptom, i) => (
              <Link key={i} to={`/kien-thuc/${symptom.slug}`} className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-accent hover:shadow-xl transition-all group flex items-start gap-4">
                <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:text-accent group-hover:bg-orange-50 transition-colors">
                  <Activity className="h-5 w-5" />
                </div>
                <span className="font-bold text-slate-900 leading-tight">{symptom.title}</span>
              </Link>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <AlertTriangle className="h-6 w-6 text-accent" />
              <p className="text-sm text-slate-600 font-bold italic">
                Những dấu hiệu trên thường liên quan đến sụt áp hoặc mất cân bằng tải, không phải do thiết bị.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUST SECTION */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/engineer-check/800/1000" 
                alt="Engineer Checking" 
                className="rounded-[3rem] shadow-2xl border-8 border-slate-50"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -right-10 bg-primary text-white p-12 rounded-[2.5rem] shadow-2xl border-4 border-white/10">
                <div className="text-5xl font-black mb-2 text-accent">70%</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Lỗi lặp lại do sai nguyên nhân</div>
              </div>
            </div>
            <div className="space-y-10">
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Vì sao không nên mua thiết bị ngay?</h2>
              <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
                <p>
                  Khoảng 70% trường hợp xưởng thay ổn áp hoặc biến áp nhưng lỗi vẫn lặp lại. 
                  Nguyên nhân thực tế là sụt áp trên đường dây, cấp nguồn sai vị trí hoặc dòng khởi động quá lớn.
                </p>
                <div className="p-8 bg-slate-50 rounded-3xl border-2 border-slate-100">
                  <p className="font-black text-slate-900 uppercase text-xs tracking-widest mb-4">Nếu không xác định đúng nguyên nhân:</p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-red-600 font-bold">
                      <AlertTriangle className="h-4 w-4" /> Motor sẽ tiếp tục nóng
                    </li>
                    <li className="flex items-center gap-3 text-red-600 font-bold">
                      <AlertTriangle className="h-4 w-4" /> Biến tần tiếp tục lỗi
                    </li>
                    <li className="flex items-center gap-3 text-red-600 font-bold">
                      <AlertTriangle className="h-4 w-4" /> Hao điện nhưng không cải thiện
                    </li>
                  </ul>
                </div>
                <p className="font-bold text-slate-900">
                  Vì vậy chúng tôi luôn kiểm tra thông số vận hành trước, sau đó mới đề xuất giải pháp phù hợp.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Không bán thiết bị khi chưa rõ nguyên nhân",
                  "Ưu tiên giải pháp ít tốn kém trước",
                  "Có thể chỉ cần thay đổi cách cấp nguồn"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-900 font-black text-xs uppercase tracking-tight">
                    <CheckCircle2 className="h-5 w-5 text-accent" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KNOWLEDGE SECTION */}
      <section className="py-32 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">Các vấn đề điện nhà xưởng thường gặp</h2>
              <p className="text-slate-500 font-medium text-lg">Tài liệu thực tế từ các hệ thống đã xử lý — giúp bạn hiểu đúng trước khi quyết định.</p>
            </div>
            <Link to="/kien-thuc" className="inline-flex items-center gap-3 text-accent font-black uppercase text-xs tracking-widest hover:gap-5 transition-all">
              Xem toàn bộ hướng dẫn kỹ thuật <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((art, i) => (
              <Link key={i} to={`/kien-thuc/${art.slug}`} className="group bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all flex flex-col h-full">
                <div className="text-accent font-black text-[10px] uppercase tracking-widest mb-4">{art.category}</div>
                <h3 className="text-xl font-black mb-6 group-hover:text-accent transition-colors uppercase tracking-tight leading-tight flex-grow">
                  {art.title}
                </h3>
                <div className="flex items-center gap-2 text-white/40 font-black text-[10px] uppercase tracking-widest">
                  Đọc bài viết <ArrowRight className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SOLUTIONS SECTION */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Các hướng xử lý phổ biến</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">Sau khi xác định nguyên nhân, giải pháp có thể không giống bạn nghĩ.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((sol, i) => (
              <div key={i} className="p-10 bg-slate-50 border border-slate-200 rounded-[2.5rem] flex gap-8 group hover:border-accent transition-all">
                <div className="p-5 bg-white rounded-2xl text-accent shadow-sm group-hover:shadow-xl transition-all shrink-0 h-fit">
                  <sol.icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">{sol.title}</h3>
                  <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">{sol.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-950 rounded-[3rem] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl text-center">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter">Bạn có thể gửi thông số để kiểm tra trước</h2>
              <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
                Chỉ cần công suất máy lớn nhất và khoảng cách dây, chúng tôi có thể xác định nguyên nhân chính xác tới 80%.
              </p>
              <div className="space-y-4">
                <Link to="/gui-thong-so" className="inline-flex px-12 py-6 bg-accent text-white rounded-xl font-black text-xl hover:brightness-110 transition-all shadow-2xl shadow-orange-900/40 uppercase tracking-tight">
                  Gửi thông số xưởng
                </Link>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Phản hồi trong giờ làm việc: 5–15 phút
                </p>
              </div>
            </div>
            <Zap className="absolute -right-20 -bottom-20 h-96 w-96 text-white/5 rotate-12" />
          </div>
        </div>
      </section>
    </div>
  );
}
