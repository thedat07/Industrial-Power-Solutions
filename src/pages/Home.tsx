import React from 'react';
import { supabase } from "@/src/lib/supabase";
import { Link } from 'react-router-dom';
import { Zap, Factory, ArrowRight, AlertTriangle, CheckCircle2, Activity, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { BASE_URL, buildGraph, JsonLd, pageSchema, NAME_INFO } from '../components/SEO';

export function Home() {
  const [articles, setArticles] = React.useState<any[]>([]);

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
    { title: "Loa phường bị rè và méo tiếng", slug: "loa-phuong-bi-re" },
    { title: "Loa phát rất nhỏ dù mở hết âm lượng", slug: "loa-nghe-nho" },
    { title: "Loa lúc kêu lúc không", slug: "loa-luc-co-luc-khong" },
    { title: "Amply nóng nhanh khi phát thông báo", slug: "amply-nong" },
    { title: "Hệ thống bị ù nền 50Hz", slug: "phat-xa-bi-u" },
    { title: "Kéo dây xa thì mất tiếng", slug: "day-dai-mat-tieng" },
    { title: "Hay cháy loa khi mở to", slug: "chay-loa" },
    { title: "Một số cột loa không phát", slug: "mot-so-cot-khong-keu" },
    { title: "Âm thanh bị vang và đục", slug: "mo-am-thanh-bi-vang" }
  ];

  type SymptomSlug =
    | "loa-phuong-bi-re"
    | "loa-nghe-nho"
    | "loa-luc-co-luc-khong"
    | "amply-nong"
    | "phat-xa-bi-u"
    | "day-dai-mat-tieng"
    | "chay-loa"
    | "mot-so-cot-khong-keu"
    | "mo-am-thanh-bi-vang";

  function getPreviewExplanation(slug: SymptomSlug): string {
    const map: Record<SymptomSlug, string> = {
      "loa-phuong-bi-re":
        "Thường do biến áp xuất âm không phù hợp hoặc tổng công suất loa vượt thiết kế.",

      "loa-nghe-nho":
        "Sai điện áp 70V/100V line hoặc sụt áp do đường dây dài.",

      "loa-luc-co-luc-khong":
        "Tiếp xúc dây kém hoặc biến áp phân vùng quá nhiệt.",

      "amply-nong":
        "Tải loa thấp hơn thiết kế khiến amply hoạt động quá dòng.",

      "phat-xa-bi-u":
        "Nhiễu nguồn điện hoặc loop mass trong hệ thống truyền thanh.",

      "day-dai-mat-tieng":
        "Sụt áp đường truyền – cần tăng điện áp line hoặc đổi biến áp phù hợp.",

      "chay-loa":
        "Chọn sai nấc công suất loa hoặc biến áp quá lớn.",

      "mot-so-cot-khong-keu":
        "Đứt nhánh phân vùng hoặc đấu sai cực tính.",

      "mo-am-thanh-bi-vang":
        "Sai dải tần biến áp hoặc loa nén không phù hợp khoảng cách."
    };

    return map[slug];
  }

  const solutions = [
    {
      slug: "tinh-cong-suat-loa",
      title: "Tính công suất hệ thống loa truyền thanh",
      desc: "Xác định tổng tải loa và chọn biến áp phù hợp tránh rè và cháy loa",
      keywords: ["tính công suất loa phường", "bao nhiêu loa dùng được", "chọn biến áp amply"],
      icon: Activity
    },
    {
      slug: "thiet-ke-duong-day",
      title: "Thiết kế đường dây 70V/100V line",
      desc: "Giảm sụt áp khi kéo dây xa nhiều cột loa",
      keywords: ["dây loa phường dài", "100v line bị nhỏ", "loa xa không kêu"],
      icon: Zap
    },
    {
      slug: "bien-ap-cho-amply",
      title: "Quấn biến áp cho amply truyền thanh",
      desc: "Phù hợp công suất và điện áp hệ thống loa ngoài trời",
      keywords: ["quấn biến áp amply", "biến áp loa phường", "output transformer pa"],
      icon: Settings
    },
    {
      slug: "bien-ap-doi-nguon",
      title: "Biến áp đổi nguồn 110V/220V/380V",
      desc: "Dùng cho thiết bị nhập khẩu trong hệ thống truyền thanh",
      keywords: ["biến áp đổi nguồn", "đổi điện 220 sang 110", "nguồn amply nhập khẩu"],
      icon: Factory
    }
  ];

  const url = `${BASE_URL}/chan-doan-dien-nha-xuong`;

  /* ================= PAGE ================= */

  const pageNode = pageSchema(
    url,
    "Chẩn đoán điện nhà xưởng | " + { NAME_INFO }
  );

  const enhancedPageNode = {
    ...pageNode,
    "description":
      "Phân tích sụt áp, quá tải nguồn, motor nóng, lỗi biến tần và PLC reset trong nhà xưởng công nghiệp."
  };

  /* ================= FINAL GRAPH ================= */

  const structuredData = buildGraph(
    enhancedPageNode
  );

  return (
    <div className="space-y-0 pb-0 bg-white">
      <JsonLd data={structuredData} />
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[800px] flex items-center bg-slate-950 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://rbyjreoslnnhqcuyoptq.supabase.co/storage/v1/object/sign/image/BienApXuyen_2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YjZkYTZiMi1mYjE1LTRlYWItYTZlNS0zYTUyZTc2ZmM5NGYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZS9CaWVuQXBYdXllbl8yLmpwZyIsImlhdCI6MTc3MTc1NTI1OSwiZXhwIjoxODAzMjkxMjU5fQ.Qs4t7ALYvMvzASmQMGc4fvlX261FPgQv2mCVBhmou2Q"
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
                <AlertTriangle className="h-3 w-3" /> Biến áp amply truyền thanh
              </div>

              {/* H1 - SEO INTENT */}
              <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.1] mb-8 uppercase tracking-tighter">
                Sản xuất biến áp loa phường
                <span className="text-accent block">
                  70V • 100V Line • Phân vùng loa
                </span>
              </h1>

              {/* TECHNICAL DESCRIPTION - cực quan trọng cho SEO */}
              <p className="text-lg md:text-xl text-white font-bold mb-4 leading-tight max-w-3xl">
                Quấn biến áp amply cho hệ thống truyền thanh xã, thôn, trường học và khu dân cư.
                Đảm bảo đủ công suất, không méo tiếng và hoạt động ổn định ngoài trời 24/7.
              </p>

              {/* EXPLANATION - AI & GOOGLE */}
              <p className="text-lg text-slate-400 mb-12 leading-relaxed max-w-2xl font-medium">
                Thiết kế theo tổng công suất loa, chiều dài dây và điện áp đường truyền 70V/100V.
                Hạn chế sụt áp, rè nhiễu và cháy loa khi phát thông báo liên tục.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="space-y-3">
                  <Link
                    to="/gui-thong-so"
                    className="inline-flex px-10 py-6 bg-accent text-white rounded-xl font-black text-xl hover:brightness-110 transition-all shadow-2xl shadow-orange-900/40 uppercase tracking-tight"
                  >
                    Gửi cấu hình hệ thống loa
                  </Link>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center sm:text-left">
                    Tính công suất & số lượng biến áp miễn phí
                  </p>
                </div>

                <Link
                  to="/kien-thuc"
                  className="px-10 py-6 bg-white/5 backdrop-blur-md text-white border border-white/20 rounded-xl font-black text-xl hover:bg-white/10 transition-all uppercase tracking-tight"
                >
                  Hướng dẫn lắp đặt loa phường
                </Link>
              </div>

              <section className="py-10 border-y border-white/10 bg-white/[0.02]">
                <div className="max-w-6xl mx-auto px-6 text-center">
                  <p className="text-sm md:text-base font-semibold text-slate-300 tracking-wide">
                    Phục vụ các hệ thống truyền thanh cơ sở – chương trình nông thôn mới – trường học – khu dân cư
                  </p>
                </div>
              </section>

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
              Vì sao loa phường bị rè, nhỏ hoặc chập chờn?
            </h2>
            <p className="text-slate-500 font-medium max-w-3xl mx-auto text-lg">
              Phân tích theo công suất loa, chiều dài dây và điện áp đường truyền 70V/100V
              để xác định đúng nguyên nhân trước khi thay biến áp hoặc amply.
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
          {/* TECHNICAL NOTE */}
          <div className="mt-20 max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-10 shadow-sm">
            <h3 className="font-black text-slate-900 mb-4 uppercase text-sm tracking-widest">
              Nguyên lý hệ thống loa truyền thanh
            </h3>
            <p className="text-slate-700 leading-relaxed">
              Hầu hết lỗi loa phường không phải do hỏng loa mà do chọn sai biến áp hoặc điện áp đường truyền.
              Hệ thống 70V/100V line cần ghép đúng tổng công suất loa và trở kháng tải.
              Nếu tải quá thấp amply sẽ nóng và méo tiếng, nếu tải quá cao âm thanh sẽ nhỏ và mất tiếng khi kéo dây xa.
            </p>
          </div>

        </div>
      </section>

      {/* 3. TRUST SECTION */}
      <section className="py-32 bg-white" aria-labelledby="vi-sao-khong-thay-loa-ngay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* IMAGE */}
            <figure className="relative">
              <img
                src="https://rbyjreoslnnhqcuyoptq.supabase.co/storage/v1/object/sign/image/BienAp_1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YjZkYTZiMi1mYjE1LTRlYWItYTZlNS0zYTUyZTc2ZmM5NGYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZS9CaWVuQXBfMS5qcGciLCJpYXQiOjE3NzE3NTYxNDcsImV4cCI6MTgwMzI5MjE0N30.suywRaY5NQEg97aOuw9iZ4nUTV-jsLnTFkk4FA8nJCc"
                alt="Kỹ thuật viên kiểm tra hệ thống loa truyền thanh và biến áp amply"
                className="rounded-[3rem] shadow-2xl border-8 border-slate-50"
                loading="lazy"
              />

              <figcaption className="sr-only">
                Kiểm tra công suất loa và điện áp 100V line trước khi thay biến áp
              </figcaption>

              <div className="absolute -bottom-10 -right-10 bg-primary text-white p-12 rounded-[2.5rem] shadow-2xl border-4 border-white/10">
                <strong className="block text-5xl font-black mb-2 text-accent">70%</strong>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  hệ thống lỗi do chọn sai biến áp
                </span>
              </div>
            </figure>

            {/* CONTENT */}
            <article className="space-y-10">
              <header>
                <h2 id="vi-sao-khong-thay-loa-ngay" className="text-4xl font-black text-slate-900 uppercase tracking-tighter">
                  Vì sao không nên thay loa hoặc amply ngay?
                </h2>
              </header>

              <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
                <p>
                  Khoảng <strong>70% hệ thống loa phường bị rè hoặc nhỏ không phải do hỏng loa</strong>.
                  Nguyên nhân thường là <strong>chọn sai biến áp</strong>,
                  <strong> tổng công suất loa vượt thiết kế</strong> hoặc
                  <strong>sụt áp trên đường dây 100V line</strong>.
                </p>

                <section className="p-8 bg-slate-50 rounded-3xl border-2 border-slate-100">
                  <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-4">
                    Hậu quả khi xác định sai nguyên nhân
                  </h3>

                  <ul className="space-y-3 list-disc pl-5 marker:text-red-600">
                    <li className="text-red-600 font-bold">
                      Amply nóng và giảm tuổi thọ
                    </li>
                    <li className="text-red-600 font-bold">
                      Loa tiếp tục rè hoặc cháy khi mở to
                    </li>
                    <li className="text-red-600 font-bold">
                      Tốn chi phí thay thiết bị nhưng lỗi vẫn lặp lại
                    </li>
                  </ul>
                </section>

                <p className="font-bold text-slate-900">
                  Cần tính tổng công suất loa, chiều dài dây và điện áp đường truyền trước khi quyết định quấn hoặc thay biến áp.
                </p>
              </div>

              <aside className="grid grid-cols-1 sm:grid-cols-3 gap-4" aria-label="Cam kết tư vấn">

                <div className="flex gap-3 p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                  <p className="text-xs font-bold uppercase leading-tight">
                    Không quấn biến áp khi chưa rõ cấu hình hệ thống
                  </p>
                </div>

                <div className="flex gap-3 p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                  <p className="text-xs font-bold uppercase leading-tight">
                    Ưu tiên tối ưu lại đấu nối trước khi thay thiết bị
                  </p>
                </div>

                <div className="flex gap-3 p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                  <p className="text-xs font-bold uppercase leading-tight">
                    Tư vấn miễn phí cho hệ thống truyền thanh xã, thôn
                  </p>
                </div>

              </aside>

            </article>
          </div>
        </div>
      </section>

      {/* 4. KNOWLEDGE SECTION */}
      <section className="py-32 bg-slate-950 text-white" aria-labelledby="kien-thuc-loa-phuong">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* HEADER */}
          <header className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <h2 id="kien-thuc-loa-phuong" className="text-4xl font-black mb-6 uppercase tracking-tighter">
                Các lỗi hệ thống loa truyền thanh thường gặp
              </h2>

              <p className="text-slate-400 font-medium text-lg max-w-2xl">
                Tổng hợp kinh nghiệm xử lý <strong>loa bị rè</strong>, <strong>âm thanh nhỏ</strong>,
                <strong>ù nền 50Hz</strong> và <strong>sụt áp đường dây 100V line</strong>
                trong hệ thống loa phường, trường học và khu dân cư.
              </p>
            </div>

            <nav aria-label="Thư viện kiến thức hệ thống truyền thanh">
              <Link
                to="/kien-thuc"
                className="inline-flex items-center gap-3 text-accent font-black uppercase text-xs tracking-widest hover:gap-5 transition-all"
              >
                Xem toàn bộ hướng dẫn <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </header>

          {/* ARTICLES */}
          <section aria-label="Danh sách bài viết hệ thống loa truyền thanh">
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
                        Xem cách xử lý <ArrowRight className="h-3 w-3" />
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
      {/* 5. SOLUTIONS SECTION */}
      <section className="py-32 bg-white" aria-labelledby="giai-phap-he-thong-loa">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* HEADER */}
          <header className="text-center mb-20">
            <h2 id="giai-phap-he-thong-loa" className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">
              Các hướng xử lý hệ thống loa truyền thanh
            </h2>

            <p className="text-slate-600 font-medium max-w-3xl mx-auto text-lg leading-relaxed">
              Tùy theo nguyên nhân <strong>loa bị rè</strong>, <strong>âm thanh nhỏ</strong>,
              <strong>ù nền</strong> hoặc <strong>mất tiếng khi kéo dây xa</strong>,
              giải pháp có thể là tính lại công suất loa, đổi biến áp amply,
              chia vùng loa hoặc chỉnh điện áp đường truyền — không phải lúc nào cũng cần thay loa.
            </p>
          </header>

          {/* SOLUTION LIST */}
          <section aria-label="Danh sách giải pháp hệ thống loa truyền thanh">
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
                          Xem chi tiết cách xử lý
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
                Máy chạy yếu? Motor nóng? Nhảy aptomat?
              </h2>

              <p className="text-xl text-slate-300 mb-6 max-w-2xl mx-auto font-medium leading-relaxed">
                Chỉ cần gửi hình đồng hồ đo điện hoặc mô tả hiện tượng máy đang gặp
                kỹ sư sẽ xác định có phải do sụt áp, lệch pha hay thiếu nguồn hay không.
              </p>

              <p className="text-sm text-slate-400 mb-12 max-w-xl mx-auto">
                Không cần mua thiết bị. Phân tích giúp bạn trước khi sửa chữa hoặc thay máy.
              </p>

              {/* ====== TECHNICAL CONTEXT (SEO GOLD - invisible UI) ====== */}
              <div className="sr-only" aria-hidden="false">
                Công cụ phân tích điện áp nhà xưởng dựa trên công thức sụt áp 3 pha:

                ΔU = √3 × I × (R cosφ + X sinφ) × L

                Áp dụng cho động cơ công nghiệp, máy CNC, máy ép nhựa và hệ thống sản xuất.
                Phân tích nguyên nhân điện yếu gồm:
                - Sụt áp đường dây do tiết diện dây nhỏ
                - Quá dòng khởi động motor
                - Nguồn cấp không đủ công suất
                - Mất cân bằng pha
              </div>

            </header>

            {/* CTA */}
            <div className="relative z-10 space-y-4">

              <Link
                to="/gui-thong-so"
                className="inline-flex px-12 py-6 bg-accent text-white rounded-xl font-black text-xl hover:brightness-110 transition-all shadow-2xl shadow-orange-900/40 uppercase tracking-tight"
                aria-label="Gửi thông số điện nhà xưởng để kỹ sư kiểm tra"
              >
                GỬI HIỆN TƯỢNG MÁY ĐANG GẶP
              </Link>

              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                Không cần mua thiết bị • Không tính phí tư vấn • Phản hồi 5–15 phút
              </p>

              {/* ===== INTERNAL KNOWLEDGE LINKS (TOPICAL AUTHORITY) ===== */}
              <nav
                aria-label="Kiến thức liên quan điện yếu nhà xưởng"
                className="text-xs text-slate-400 pt-8 border-t border-white/10"
              >
                <span className="block mb-2 text-white/60 uppercase tracking-widest">
                  Kiến thức liên quan
                </span>

                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                  <Link to="/kien-thuc/sut-ap-la-gi">Sụt áp đường dây là gì</Link>
                  <Link to="/kien-thuc/dong-khoi-dong-dong-co">Dòng khởi động động cơ</Link>
                  <Link to="/kien-thuc/chon-cong-suat-bien-ap">Cách chọn công suất biến áp</Link>
                  <Link to="/kien-thuc/mat-can-bang-pha">Điện 3 pha bị lệch dòng (mất cân bằng pha)</Link>
                </div>
              </nav>

            </div>

            <Zap className="absolute -right-20 -bottom-20 h-96 w-96 text-white/5 rotate-12" aria-hidden="true" />

          </article>
        </div>
      </section>
    </div>
  );
}
