import React from 'react';
import { supabase } from "@/src/lib/supabase";
import { Link } from 'react-router-dom';
import { Zap, Factory, ArrowRight, AlertTriangle, CheckCircle2, Activity, Settings } from 'lucide-react';
import { motion } from 'motion/react';

export function Home() {
  const [articles, setArticles] = React.useState<any[]>([]);

  const webPageLd = {
    "@type": "WebPage",
    name: "Chẩn đoán điện nhà xưởng | IPS Power",
    url: "https://yourdomain.com",
    description:
      "Phân tích sụt áp, quá tải nguồn, motor nóng, lỗi biến tần và PLC reset trong nhà xưởng công nghiệp.",
    inLanguage: "vi"
  };

  const organizationLd = {
    "@type": "Organization",
    name: "IPS Power",
    url: "https://yourdomain.com",
    logo: "https://yourdomain.com/logo.png",
    sameAs: []
  };

  React.useEffect(() => {
    const loadArticles = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .limit(6);

      if (error) {
        console.error("Load articles error:", error);
        setArticles([]);
        return;
      }

      setArticles(data ?? []);
    };

    loadArticles();
  }, []);

  const symptoms: { title: string; slug: SymptomSlug }[] = [
    { title: "Máy chạy yếu khi ở cuối xưởng", slug: "may-chay-yeu-khi-o-cuoi-xuong" },
    { title: "Motor nóng nhanh dù không quá tải", slug: "motor-nong-nhanh-du-khong-qua-tai" },
    { title: "Máy CNC hoặc biến tần báo lỗi điện áp", slug: "may-cnc-hoac-bien-tan-bao-loi-dien-ap" },
    { title: "Nhảy aptomat khi khởi động máy lớn", slug: "nhay-aptomat-khi-khoi-dong-may-lon" },
    { title: "Bật máy hàn thì đèn nhấp nháy, PLC reset", slug: "bat-may-han-thi-den-nhap-nhay-plc-reset" },
    { title: "Điện áp lúc cao lúc thấp theo giờ", slug: "dien-ap-luc-cao-luc-thap-theo-gio" },
    { title: "Không rõ nhưng máy hoạt động không ổn định", slug: "khong-ro-nhung-may-hoat-dong-khong-on-dinh" }
  ];

  type SymptomSlug =
    | "may-chay-yeu-khi-o-cuoi-xuong"
    | "motor-nong-nhanh-du-khong-qua-tai"
    | "may-cnc-hoac-bien-tan-bao-loi-dien-ap"
    | "nhay-aptomat-khi-khoi-dong-may-lon"
    | "bat-may-han-thi-den-nhap-nhay-plc-reset"
    | "dien-ap-luc-cao-luc-thap-theo-gio"
    | "khong-ro-nhung-may-hoat-dong-khong-on-dinh";

  function getPreviewExplanation(slug: SymptomSlug): string {
    const map: Record<SymptomSlug, string> = {
      "may-chay-yeu-khi-o-cuoi-xuong":
        "Thường do sụt áp trên đường dây dài hoặc tiết diện dây không đủ khi tải tăng.",

      "motor-nong-nhanh-du-khong-qua-tai":
        "Điện áp thấp làm dòng tăng để bù moment khiến motor quá nhiệt.",

      "may-cnc-hoac-bien-tan-bao-loi-dien-ap":
        "Biến tần rất nhạy với undervoltage khi spindle tăng tốc.",

      "nhay-aptomat-khi-khoi-dong-may-lon":
        "Dòng khởi động có thể gấp 5–7 lần dòng định mức gây quá dòng tức thời.",

      "bat-may-han-thi-den-nhap-nhay-plc-reset":
        "Máy hàn tạo tải xung làm sụt áp tức thời toàn hệ thống.",

      "dien-ap-luc-cao-luc-thap-theo-gio":
        "Phụ thuộc tải khu vực hoặc giờ cao điểm điện lưới.",

      "khong-ro-nhung-may-hoat-dong-khong-on-dinh":
        "Thường do tổng hợp nhiều yếu tố: sụt áp, nhiễu nguồn hoặc lệch pha."
    };

    return map[slug];
  }

  const solutions = [
    {
      slug: "on-ap-cho-may-cnc",
      title: "Ổn áp cho máy CNC bị lỗi điện áp",
      desc: "Khắc phục undervoltage, alarm drive và reset controller do điện áp sụt khi máy tăng tốc",
      keywords: ["máy cnc lỗi điện áp", "undervoltage cnc", "driver cnc reset"],
      icon: Settings
    },
    {
      slug: "sut-ap-cuoi-xuong",
      title: "Xử lý sụt áp cuối đường dây nhà xưởng",
      desc: "Tăng điện áp tại vị trí máy xa nguồn, tránh motor yếu và khởi động không nổi",
      keywords: ["sụt áp cuối xưởng", "điện yếu cuối đường dây", "motor chạy yếu"],
      icon: Activity
    },
    {
      slug: "tach-nguon-may-cong-suat-lon",
      title: "Tách nguồn cho máy công suất lớn",
      desc: "Giảm nhảy aptomat và nhiễu điện khi máy hàn, máy ép hoặc máy nén khí khởi động",
      keywords: ["nhảy aptomat khi khởi động", "máy hàn làm sập điện", "inrush current"],
      icon: Zap
    },
    {
      slug: "bien-ap-cho-may-nhap-khau",
      title: "Biến áp cho máy nhập khẩu 200V/380V/440V",
      desc: "Cấp đúng điện áp cho thiết bị Nhật, Hàn, Châu Âu tránh quá nhiệt và hỏng driver",
      keywords: ["biến áp máy nhật", "máy 200v dùng điện 3 pha", "chọn biến áp công nghiệp"],
      icon: Factory
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      webPageLd,
      organizationLd
    ]
  };

  return (
    <div className="space-y-0 pb-0 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[800px] flex items-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/factory-technical/1920/1080"
            alt="Hệ thống điện nhà xưởng công nghiệp"
            className="w-full h-full object-cover opacity-30 grayscale"
            referrerPolicy="no-referrer"
          />
        
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >

              {/* TAG */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/30 rounded-lg text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                <AlertTriangle className="h-3 w-3" /> Phân tích sự cố điện nhà xưởng
              </div>

              {/* H1 - SEO INTENT */}
              <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.1] mb-8 uppercase tracking-tighter">
                Chẩn đoán điện nhà xưởng
                <span className="text-accent block">
                  Sụt áp • Lệch pha • Quá tải nguồn
                </span>
              </h1>

              {/* TECHNICAL DESCRIPTION - cực quan trọng cho SEO */}
              <p className="text-lg md:text-xl text-white font-bold mb-4 leading-tight max-w-3xl">
                Xác định nguyên nhân các lỗi: motor nóng, máy CNC báo undervoltage,
                nhảy aptomat khi khởi động, điện cuối xưởng yếu hoặc PLC reset.
              </p>

              {/* EXPLANATION - AI & GOOGLE */}
              <p className="text-lg text-slate-400 mb-12 leading-relaxed max-w-2xl font-medium">
                Phân tích dựa trên công suất tải, chiều dài dây và điện áp thực tế.
                Phần lớn sự cố không phải do máy hỏng mà do sụt áp hoặc nguồn không đủ khi tải tăng.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="space-y-3">
                  <Link
                    to="/gui-thong-so"
                    className="inline-flex px-10 py-6 bg-accent text-white rounded-xl font-black text-xl hover:brightness-110 transition-all shadow-2xl shadow-orange-900/40 uppercase tracking-tight"
                  >
                    Gửi thông số để kiểm tra
                  </Link>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center sm:text-left">
                    Không cần mua — chỉ xác định nguyên nhân trước
                  </p>
                </div>

                <Link
                  to="/kien-thuc"
                  className="px-10 py-6 bg-white/5 backdrop-blur-md text-white border border-white/20 rounded-xl font-black text-xl hover:bg-white/10 transition-all uppercase tracking-tight"
                >
                  Xem lỗi thường gặp
                </Link>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SYMPTOMS SECTION */}
      <section className="py-32 bg-slate-50 industrial-grid border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* TITLE */}
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">
              Chẩn đoán sự cố điện theo hiện tượng
            </h2>
            <p className="text-slate-500 font-medium max-w-3xl mx-auto text-lg">
              Mỗi dấu hiệu vận hành tương ứng với một vấn đề điện cụ thể như sụt áp,
              quá dòng khởi động hoặc mất cân bằng pha.
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {symptoms.map((symptom, i) => (
              <article
                key={i}
                className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-accent hover:shadow-xl transition-all group flex flex-col gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:text-accent group-hover:bg-orange-50 transition-colors">
                    <Activity className="h-5 w-5" />
                  </div>

                  <h3 className="font-black text-slate-900 leading-tight text-lg">
                    {symptom.title}
                  </h3>
                </div>

                {/* PREVIEW EXPLANATION - SEO CRITICAL */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {getPreviewExplanation(symptom.slug)}
                </p>

                {/* LINK */}
                <Link
                  to={`/kien-thuc/${symptom.slug}`}
                  className="text-accent font-black text-xs uppercase tracking-widest mt-auto"
                >
                  Xem phân tích nguyên nhân →
                </Link>
              </article>
            ))}

          </div>

          {/* TECHNICAL NOTE */}
          <div className="mt-20 max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-10 shadow-sm">
            <h3 className="font-black text-slate-900 mb-4 uppercase text-sm tracking-widest">
              Nguyên lý chung
            </h3>
            <p className="text-slate-700 leading-relaxed">
              Hầu hết sự cố điện nhà xưởng không xuất phát từ hỏng thiết bị mà do điện áp giảm khi tải tăng.
              Moment động cơ tỉ lệ với bình phương điện áp, vì vậy chỉ cần sụt 10% điện áp
              motor có thể mất gần 20% lực kéo dẫn đến nóng và dừng máy.
            </p>
          </div>

        </div>
      </section>

      {/* 3. TRUST SECTION */}
      <section className="py-32 bg-white" aria-labelledby="ly-do-khong-mua-ngay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* IMAGE */}
            <figure className="relative">
              <img
                src="https://picsum.photos/seed/engineer-check/800/1000"
                alt="Kỹ sư đo điện áp và kiểm tra nguồn điện tại nhà xưởng công nghiệp"
                className="rounded-[3rem] shadow-2xl border-8 border-slate-50"
                loading="lazy"
              />

              <figcaption className="sr-only">
                Kiểm tra điện áp trước khi quyết định lắp ổn áp hoặc máy biến áp
              </figcaption>

              <div className="absolute -bottom-10 -right-10 bg-primary text-white p-12 rounded-[2.5rem] shadow-2xl border-4 border-white/10">
                <strong className="block text-5xl font-black mb-2 text-accent">70%</strong>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  lỗi điện lặp lại do xác định sai nguyên nhân
                </span>
              </div>
            </figure>

            {/* CONTENT */}
            <article className="space-y-10">
              <header>
                <h2 id="ly-do-khong-mua-ngay" className="text-4xl font-black text-slate-900 uppercase tracking-tighter">
                  Vì sao không nên mua ổn áp hoặc biến áp ngay?
                </h2>
              </header>

              <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
                <p>
                  Khoảng <strong>70% nhà xưởng thay ổn áp hoặc máy biến áp nhưng lỗi vẫn lặp lại</strong>.
                  Nguyên nhân thực tế thường là <strong>sụt áp đường dây</strong>,
                  <strong>cấp nguồn sai vị trí</strong> hoặc <strong>dòng khởi động motor quá lớn</strong>.
                </p>

                <section className="p-8 bg-slate-50 rounded-3xl border-2 border-slate-100">
                  <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-4">
                    Hậu quả khi xác định sai nguyên nhân điện yếu
                  </h3>

                  <ul className="space-y-3 list-disc pl-5 marker:text-red-600">
                    <li className="text-red-600 font-bold">
                      Motor tiếp tục bị nóng và giảm tuổi thọ
                    </li>
                    <li className="text-red-600 font-bold">
                      Biến tần tiếp tục báo lỗi điện áp
                    </li>
                    <li className="text-red-600 font-bold">
                      Hao điện năng nhưng không cải thiện sản xuất
                    </li>
                  </ul>
                </section>

                <p className="font-bold text-slate-900">
                  Vì vậy cần <strong>đo kiểm thông số vận hành trước</strong> rồi mới quyết định lắp thiết bị điện phù hợp.
                </p>
              </div>

              <aside className="grid grid-cols-1 sm:grid-cols-2 gap-6" aria-label="Cam kết tư vấn">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 font-black text-xs uppercase tracking-tight">
                    Không bán thiết bị khi chưa rõ nguyên nhân
                  </li>
                  <li className="flex items-center gap-3 font-black text-xs uppercase tracking-tight">
                    Ưu tiên giải pháp tiết kiệm chi phí trước
                  </li>
                  <li className="flex items-center gap-3 font-black text-xs uppercase tracking-tight">
                    Có thể chỉ cần thay đổi cách cấp nguồn
                  </li>
                </ul>
              </aside>

            </article>
          </div>
        </div>
      </section>

      {/* 4. KNOWLEDGE SECTION */}
      <section className="py-32 bg-slate-950 text-white" aria-labelledby="kien-thuc-dien-nha-xuong">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* HEADER */}
          <header className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <h2 id="kien-thuc-dien-nha-xuong" className="text-4xl font-black mb-6 uppercase tracking-tighter">
                Các vấn đề điện nhà xưởng thường gặp
              </h2>

              <p className="text-slate-400 font-medium text-lg max-w-2xl">
                Tổng hợp kinh nghiệm xử lý <strong>sụt áp</strong>, <strong>mất cân bằng pha</strong>,
                <strong>motor quá nhiệt</strong> và <strong>lỗi biến tần</strong> từ các hệ thống công nghiệp thực tế.
              </p>
            </div>

            <nav aria-label="Thư viện kiến thức điện công nghiệp">
              <Link
                to="/kien-thuc"
                className="inline-flex items-center gap-3 text-accent font-black uppercase text-xs tracking-widest hover:gap-5 transition-all"
              >
                Xem toàn bộ tài liệu kỹ thuật <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </header>

          {/* ARTICLES */}
          <section aria-label="Danh sách bài viết kỹ thuật điện công nghiệp">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {articles.map((art, i) => (
                <li key={i}>
                  <article className="group bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all flex flex-col h-full">

                    <header>
                      <p className="text-accent font-black text-[10px] uppercase tracking-widest mb-4">
                        {art.category}
                      </p>

                      <h3 className="text-xl font-black mb-6 group-hover:text-accent transition-colors uppercase tracking-tight leading-tight">
                        <Link to={`/kien-thuc/${art.slug}`} className="hover:underline">
                          {art.title}
                        </Link>
                      </h3>
                    </header>

                    <footer className="mt-auto">
                      <Link
                        to={`/kien-thuc/${art.slug}`}
                        className="flex items-center gap-2 text-white/50 font-black text-[10px] uppercase tracking-widest"
                      >
                        Đọc hướng dẫn chi tiết <ArrowRight className="h-3 w-3" />
                      </Link>
                    </footer>

                  </article>
                </li>
              ))}

            </ul>
          </section>

        </div>
      </section>

      {/* 5. SOLUTIONS SECTION */}
      <section className="py-32 bg-white" aria-labelledby="giai-phap-dien-nha-xuong">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* HEADER */}
          <header className="text-center mb-20">
            <h2 id="giai-phap-dien-nha-xuong" className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">
              Các hướng xử lý sự cố điện nhà xưởng
            </h2>

            <p className="text-slate-600 font-medium max-w-3xl mx-auto text-lg leading-relaxed">
              Tùy theo nguyên nhân <strong>sụt áp</strong>, <strong>quá dòng khởi động</strong>,
              <strong>mất cân bằng pha</strong> hoặc <strong>nguồn cấp không đủ công suất</strong>,
              giải pháp có thể là thay đổi cấp nguồn, ổn áp, biến áp riêng hoặc tách tải — không phải lúc nào cũng cần thay thiết bị.
            </p>
          </header>

          {/* SOLUTION LIST */}
          <section aria-label="Danh sách giải pháp điện công nghiệp">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {solutions.map((sol, i) => (
                <li key={i}>
                  <article className="p-10 bg-slate-50 border border-slate-200 rounded-[2.5rem] flex gap-8 group hover:border-accent transition-all h-full">

                    {/* ICON */}
                    <div className="p-5 bg-white rounded-2xl text-accent shadow-sm group-hover:shadow-xl transition-all shrink-0 h-fit">
                      <sol.icon className="h-8 w-8" aria-hidden="true" />
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col">
                      <header>
                        <h3 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tight">
                          {sol.title}
                        </h3>
                      </header>

                      <p className="text-slate-600 font-medium leading-relaxed mb-6">
                        {sol.desc}
                      </p>

                      {/* INTERNAL LINK = VERY IMPORTANT FOR SEO */}
                      <footer className="mt-auto">
                        <a
                          href={`/giai-phap/${sol.slug}`}
                          className="text-accent font-black uppercase text-xs tracking-widest hover:underline"
                        >
                          Xem chi tiết giải pháp
                        </a>
                      </footer>

                    </div>

                  </article>
                </li>
              ))}

            </ul>
          </section>

        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section
        className="py-32 bg-white"
        aria-labelledby="kiem-tra-dien-nha-xuong"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <article className="bg-slate-950 rounded-[3rem] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl text-center">

            <header className="relative z-10">
              <h2
                id="kiem-tra-dien-nha-xuong"
                className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter"
              >
                Kiểm tra nguyên nhân điện yếu nhà xưởng
              </h2>

              <p className="text-xl text-slate-300 mb-6 max-w-2xl mx-auto font-medium leading-relaxed">
                Chỉ cần cung cấp <strong>công suất máy</strong>, <strong>điện áp đo được</strong> và
                <strong> chiều dài dây cấp nguồn</strong>, kỹ sư có thể xác định
                <strong> sụt áp</strong>, <strong>quá dòng khởi động</strong> hoặc
                <strong> thiếu công suất biến áp</strong>.
              </p>

              <p className="text-sm text-slate-400 mb-12 max-w-xl mx-auto">
                Không cần mua thiết bị. Phân tích giúp bạn trước khi sửa chữa hoặc thay máy.
              </p>
            </header>

            {/* CTA */}
            <div className="relative z-10 space-y-4">

              <Link
                to="/gui-thong-so"
                className="inline-flex px-12 py-6 bg-accent text-white rounded-xl font-black text-xl hover:brightness-110 transition-all shadow-2xl shadow-orange-900/40 uppercase tracking-tight"
                aria-label="Gửi thông số điện nhà xưởng để kỹ sư kiểm tra"
              >
                Gửi thông số điện nhà xưởng
              </Link>

              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                Phản hồi kỹ thuật trong giờ làm việc: 5–15 phút
              </p>

            </div>

            {/* semantic decoration */}
            <Zap className="absolute -right-20 -bottom-20 h-96 w-96 text-white/5 rotate-12" aria-hidden="true" />

          </article>
        </div>
      </section>
    </div>
  );
}
