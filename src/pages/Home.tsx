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
                <AlertTriangle className="h-3 w-3" />
                Xưởng sản xuất biến áp âm ly 70V / 100V
              </div>

              {/* H1 */}
              <h1 className="text-4xl md:text-7xl font-black text-white leading-[1.1] mb-8 uppercase tracking-tighter">
                Sản xuất biến áp truyền thanh
                <span className="text-accent block">
                  70V • 100V Line • Phân vùng loa
                </span>
              </h1>

              {/* TECHNICAL DESCRIPTION */}
              <p className="text-lg md:text-xl text-white font-bold mb-4 leading-tight max-w-3xl">
                Chuyên quấn biến áp âm ly cho hệ thống truyền thanh xã, thôn, trường học
                và khu dân cư. Đảm bảo đủ công suất, hạn chế méo tiếng và vận hành ổn định 24/7.
              </p>

              {/* EXPLANATION */}
              <p className="text-lg text-slate-400 mb-12 leading-relaxed max-w-2xl font-medium">
                Tính toán theo tổng công suất loa, chiều dài dây và cấu hình phân vùng 70V / 100V.
                Giúp giảm sụt áp, hạn chế nhiễu và bảo vệ loa khi phát thông báo liên tục ngoài trời.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

                <div className="space-y-3">
                  <Link
                    to="/gui-thong-so"
                    className="inline-flex px-10 py-6 bg-accent text-white rounded-xl font-black text-xl hover:brightness-110 transition-all shadow-2xl shadow-orange-900/40 uppercase tracking-tight"
                  >
                    Gửi thông số hệ thống loa
                  </Link>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center sm:text-left">
                    Tính công suất biến áp miễn phí
                  </p>
                </div>

                <Link
                  to="/kien-thuc"
                  className="px-10 py-6 bg-white/5 backdrop-blur-md text-white border border-white/20 rounded-xl font-black text-xl hover:bg-white/10 transition-all uppercase tracking-tight"
                >
                  Hướng dẫn chọn biến áp 70V / 100V
                </Link>

              </div>

              {/* SOCIAL PROOF */}
              <section className="py-10 border-y border-white/10 bg-white/[0.02] mt-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                  <p className="text-sm md:text-base font-semibold text-slate-300 tracking-wide">
                    Phục vụ hệ thống truyền thanh cơ sở • chương trình nông thôn mới • trường học • khu dân cư
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
              Vì sao hệ thống loa truyền thanh bị rè, nhỏ hoặc chập chờn?
            </h2>

            <p className="text-slate-600 font-medium max-w-3xl mx-auto text-lg leading-relaxed">
              Nguyên nhân thường đến từ quá tải công suất, sụt áp đường dây dài,
              mất cân bằng phân vùng 70V/100V hoặc biến áp không đúng thông số thiết kế.
            </p>

            <p className="text-slate-400 font-medium max-w-3xl mx-auto text-base mt-4">
              Chúng tôi phân tích tổng công suất loa, chiều dài dây dẫn và cấu hình phân vùng
              trước khi đề xuất thay biến áp hoặc amply – tránh thay sai, tốn chi phí.
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
              Nguyên lý hệ thống loa truyền thanh 70V / 100V
            </h3>

            <p className="text-slate-700 leading-relaxed mb-4">
              Phần lớn tình trạng loa bị rè, nhỏ hoặc chập chờn không xuất phát từ hỏng loa,
              mà do tính toán sai tổng công suất và lựa chọn biến áp không phù hợp.
            </p>

            <p className="text-slate-700 leading-relaxed">
              Hệ thống 70V/100V line yêu cầu ghép đúng tổng công suất loa với điện áp đường truyền.
              Nếu tổng tải quá thấp, amply sẽ quá dòng, nóng và méo tiếng.
              Nếu tổng tải quá cao hoặc dây quá dài, hệ thống sẽ sụt áp khiến âm thanh nhỏ dần hoặc mất tiếng ở cuối tuyến.
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
                <h2
                  id="vi-sao-khong-thay-loa-ngay"
                  className="text-4xl font-black text-slate-900 uppercase tracking-tighter"
                >
                  Đừng thay loa hoặc amply khi chưa kiểm tra biến áp
                </h2>
              </header>

              <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">

                <p>
                  Khoảng <strong>70% hệ thống loa truyền thanh bị rè hoặc nhỏ không phải do hỏng loa</strong>.
                  Nguyên nhân chính là <strong>biến áp không đủ công suất</strong>,
                  <strong> chọn sai điện áp 70V / 100V</strong> hoặc
                  <strong> tổng tải vượt thiết kế ban đầu</strong>.
                </p>

                <section className="p-8 bg-slate-50 rounded-3xl border-2 border-slate-100">
                  <h3 className="font-black text-slate-900 uppercase text-xs tracking-widest mb-4">
                    Hậu quả khi dùng sai biến áp
                  </h3>

                  <ul className="space-y-3 list-disc pl-5 marker:text-red-600">
                    <li className="text-red-600 font-bold">
                      Amply quá tải, nóng và nhanh hỏng
                    </li>
                    <li className="text-red-600 font-bold">
                      Loa rè, méo tiếng hoặc cháy khi mở công suất lớn
                    </li>
                    <li className="text-red-600 font-bold">
                      Thay thiết bị nhiều lần nhưng hệ thống vẫn không ổn định
                    </li>
                  </ul>
                </section>

                <p className="font-bold text-slate-900">
                  Giải pháp đúng là tính lại tổng công suất loa và quấn biến áp phù hợp với cấu hình thực tế,
                  thay vì thay loa hoặc amply một cách cảm tính.
                </p>

              </div>

              <aside className="grid grid-cols-1 sm:grid-cols-3 gap-4" aria-label="Cam kết kỹ thuật">

                <div className="flex gap-3 p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                  <p className="text-xs font-bold uppercase leading-tight">
                    Thiết kế biến áp theo tổng tải thực tế
                  </p>
                </div>

                <div className="flex gap-3 p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                  <p className="text-xs font-bold uppercase leading-tight">
                    Tùy chọn 70V / 100V / phân vùng nhiều nhánh
                  </p>
                </div>

                <div className="flex gap-3 p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
                  <p className="text-xs font-bold uppercase leading-tight">
                    Quấn theo yêu cầu – bảo hành trọn đời
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
              <h2
                id="kien-thuc-loa-phuong"
                className="text-4xl font-black mb-6 uppercase tracking-tighter"
              >
                Lỗi hệ thống loa truyền thanh thường gặp
              </h2>

              <p className="text-slate-500 font-medium text-lg max-w-2xl leading-relaxed">
                Tổng hợp lỗi thực tế khi sử dụng <strong>amply truyền thanh 70V / 100V</strong>
                và <strong>biến áp loa</strong>: loa bị rè, âm thanh nhỏ,
                ù nền 50Hz hoặc sụt áp đường dây cuối tuyến.
              </p>

              <p className="text-slate-400 font-medium text-base max-w-2xl mt-4 leading-relaxed">
                Phân tích dựa trên kinh nghiệm sản xuất amply và quấn biến áp
                cho hệ thống loa xã, trường học và khu dân cư.
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
      <section className="py-32 bg-white" aria-labelledby="giai-phap-he-thong-loa">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* HEADER */}
          <header className="text-center mb-20">
            <h2
              id="giai-phap-he-thong-loa"
              className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter"
            >
              Giải pháp đồng bộ amply và biến áp cho hệ thống loa truyền thanh
            </h2>

            <p className="text-slate-600 font-medium max-w-3xl mx-auto text-lg leading-relaxed">
              Khi <strong>loa bị rè</strong>, <strong>âm thanh nhỏ</strong>,
              <strong>ù nền</strong> hoặc <strong>mất tiếng cuối tuyến</strong>,
              nguyên nhân thường nằm ở cấu hình <strong>amply và biến áp 70V / 100V</strong>
              chưa phù hợp với tổng công suất thực tế.
            </p>

            <p className="text-slate-500 font-medium max-w-3xl mx-auto text-base mt-4 leading-relaxed">
              Giải pháp có thể là tính lại công suất, đổi amply đủ tải,
              quấn lại biến áp đúng thông số hoặc phân vùng loa hợp lý —
              thay vì thay loa một cách cảm tính.
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
      {/* 6. FINAL CTA */}
      <section
        className="py-32 bg-white"
        aria-labelledby="tu-van-he-thong-truyen-thanh"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <article className="bg-slate-950 rounded-[3rem] p-12 md:p-24 text-white relative overflow-hidden shadow-2xl text-center">

            <header className="relative z-10">

              <h2
                id="tu-van-he-thong-truyen-thanh"
                className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter leading-tight"
              >
                Loa rè? Amply nóng? Âm thanh nhỏ dần cuối tuyến?
              </h2>

              <p className="text-xl text-slate-300 mb-6 max-w-2xl mx-auto font-medium leading-relaxed">
                Gửi tổng công suất loa, số lượng loa và chiều dài dây.
                Chúng tôi sẽ kiểm tra và đề xuất <strong>amply hoặc biến áp phù hợp</strong>
                với hệ thống 70V / 100V của bạn.
              </p>

              <p className="text-sm text-slate-400 mb-12 max-w-xl mx-auto">
                Tránh thay sai thiết bị – tối ưu đồng bộ amply và biến áp ngay từ đầu.
              </p>

              {/* SEO CONTEXT (Ẩn giao diện) */}
              <div className="sr-only">
                Nhà sản xuất amply truyền thanh 70V 100V và biến áp loa.
                Thiết kế theo tổng công suất hệ thống, phân vùng loa, chiều dài dây dẫn.
                Phân tích lỗi hệ thống truyền thanh gồm sụt áp, quá tải công suất,
                méo tiếng và quá nhiệt amply.
              </div>

            </header>

            {/* CTA BUTTON */}
            <div className="relative z-10 space-y-6">

              <Link
                to="/gui-thong-so"
                className="inline-flex px-12 py-6 bg-accent text-white rounded-xl font-black text-xl hover:brightness-110 transition-all shadow-2xl shadow-orange-900/40 uppercase tracking-tight"
                aria-label="Gửi thông số hệ thống truyền thanh để tư vấn amply và biến áp"
              >
                GỬI CẤU HÌNH HỆ THỐNG
              </Link>

              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                Tư vấn miễn phí • Phản hồi nhanh • Đề xuất đúng công suất
              </p>

              {/* CAM KẾT BÁN HÀNG */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10">

                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-xs font-bold uppercase">
                    Sản xuất amply 70V / 100V
                  </p>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-xs font-bold uppercase">
                    Quấn biến áp theo công suất thực tế
                  </p>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-xs font-bold uppercase">
                    Bảo hành trọn đời – hỗ trợ sửa chữa
                  </p>
                </div>

              </div>



            </div>

            <Zap
              className="absolute -right-20 -bottom-20 h-96 w-96 text-white/5 rotate-12"
              aria-hidden="true"
            />

          </article>
        </div>
      </section>
    </div>
  );
}
