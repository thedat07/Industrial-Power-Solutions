import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import { articleSchema, breadcrumbSchema, buildGraph, faqSchema, JsonLd, ORG_ID, pageSchema, productSchema, BASE_URL, WEBSITE_ID, NAME_INFO } from '@/src/components/SEO';
import { supabase } from "@/src/lib/supabase";

export function Applications() {
  const [apps, setApps] = React.useState<any[]>([]);

  React.useEffect(() => {
    const loadApps = async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*");

      if (error) {
        console.error("Load applications error:", error);
        setApps([]);
        return;
      }

      setApps(data ?? []);
    };

    loadApps();
  }, []);

  const url = `${BASE_URL}/ung-dung`;

  /* ================= COLLECTION PAGE ================= */

  const collectionNode = {
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    "url": url,
    "name": "Biến áp âm ly cho hệ thống truyền thanh & PA",
    "isPartOf": { "@id": WEBSITE_ID },
    "about": {
      "@type": "Thing",
      "name": "Biến áp âm ly 70V – 100V cho hệ thống âm thanh công cộng"
    },
    "inLanguage": "vi-VN"
  };

  /* ================= ITEM LIST ================= */

  const listNode = {
    "@type": "ItemList",
    "@id": `${url}#list`,
    "itemListElement": apps.map((app, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${BASE_URL}/ung-dung/${app.slug}`,
      "name": `Biến áp âm ly cho hệ thống ${app.title}`
    }))
  };

  /* ================= FINAL GRAPH ================= */

  const structuredData = buildGraph(
    pageSchema(url, "Biến áp âm ly 70V – 100V cho hệ thống truyền thanh"),
    breadcrumbSchema(url, [
      { name: "Trang chủ", url: BASE_URL },
      { name: "Ứng dụng hệ thống PA", url }
    ]),
    collectionNode,
    listNode
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <JsonLd data={structuredData} />
      {/* HERO */}
      <section className="bg-white border-b border-slate-200 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* PAGE TITLE */}
          <header className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 uppercase tracking-tighter">
              Biến áp âm ly 70V – 100V cho hệ thống truyền thanh & PA
            </h1>

            <p className="text-xl text-slate-600 font-medium leading-relaxed">
              Cung cấp và gia công biến áp âm thanh dùng cho loa phường, trường học, nhà xưởng và hệ thống thông báo công cộng.
              Hỗ trợ tính công suất tổng loa, chọn đúng 70V – 100V line và đảm bảo hệ thống hoạt động ổn định, bền bỉ lâu dài.
            </p>
          </header>
        </div>
      </section>

      {/* LISTING */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {apps.map((app) => (
            <article
              key={app.id}
              className="group bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all flex flex-col shadow-sm"
              itemScope
              itemType="https://schema.org/Service"
            >
              <Link to={`/ung-dung/${app.slug}`} className="flex flex-col h-full">

                {/* IMAGE */}
                <div className="aspect-video overflow-hidden">
                  <img
                    src={app.image_url}
                    alt={`Biến áp âm ly cho hệ thống ${app.title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                    itemProp="image"
                    loading="lazy"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-12 flex-grow">
                  <h2
                    className="text-3xl font-black text-slate-900 mb-6 group-hover:text-accent transition-colors uppercase tracking-tight"
                    itemProp="name"
                  >
                    {app.title}
                  </h2>

                  <p
                    className="text-slate-500 mb-10 line-clamp-2 font-medium leading-relaxed"
                    itemProp="description"
                  >
                    {app.problem}
                  </p>

                  <div className="flex items-center gap-2 text-accent font-black text-xs uppercase tracking-widest">
                    Xem hướng dẫn chọn công suất
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>

              {/* SERVICE SCHEMA */}
              <meta itemProp="provider" content={NAME_INFO} />
              <meta itemProp="areaServed" content="Vietnam" />
            </article>
          ))}

        </div>
      </main>
    </div>
  );
}

export function ApplicationDetail({ slug }: { slug: string }) {

  const [app, setApp] = React.useState<any>(null);
  const [relatedApps, setRelatedApps] = React.useState<any[]>([]);

  React.useEffect(() => {
    const loadArticle = async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Load article error:", error);
        setApp(null);
        return;
      }

      setApp(data ?? null);
    };

    loadArticle();
  }, [slug]);

  React.useEffect(() => {
    if (!app) return;

    const loadRelated = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .limit(4);

      if (error) {
        console.error("Load related applications error:", error);
        setRelatedApps([]);
        return;
      }

      setRelatedApps(data ?? []);
    };

    loadRelated();
  }, [app]);

  if (!app) return <div className="p-20 text-center">Đang tải...</div>;

  const url = `${BASE_URL}ung-dung/${app.slug}`;

  /* ================= HOWTO (thiếu trong SEO.tsx) ================= */

  const howToNode = {
    "@type": "HowTo",
    "@id": `${url}#howto`,
    "name": `Cách chọn biến áp âm ly cho hệ thống ${app.title}`,
    "publisher": { "@id": ORG_ID },
    "mainEntityOfPage": { "@id": `${url}#webpage` },
    "step": [
      {
        "@type": "HowToStep",
        "name": "Tính tổng công suất loa",
        "text": "Cộng tổng công suất tất cả loa trong hệ thống 70V – 100V line."
      },
      {
        "@type": "HowToStep",
        "name": "Chọn mức dự phòng",
        "text": "Thêm 20–30% công suất dự phòng để tránh quá tải khi hoạt động liên tục."
      },
      {
        "@type": "HowToStep",
        "name": "Chọn đúng line điện áp",
        "text": "Xác định hệ thống đang dùng 70V hay 100V để chọn biến áp phù hợp."
      },
      {
        "@type": "HowToStep",
        "name": "Kiểm tra tải thực tế",
        "text": "Đảm bảo biến áp không nóng, không méo tiếng khi hệ thống vận hành lâu dài."
      }
    ]
  };

  /* ================= PRODUCT (dùng helper) ================= */

  const productNode = productSchema({
    slug: `bien-ap-am-ly-${app.slug}`,
    name: "Biến áp âm ly 70V – 100V cho hệ thống truyền thanh",
    image_url: "/logo.png",
    description: `Biến áp âm thanh dùng cho hệ thống ${app.title}, đảm bảo hoạt động ổn định và phù hợp công suất loa tổng.`
  });
  /* ================= FAQ (dùng helper) ================= */

  const faqNode = faqSchema([
    {
      q: `Hệ thống ${app.title} nên dùng biến áp 70V hay 100V?`,
      a: "Tùy theo cấu hình ampli và số lượng loa, cần xác định đúng line điện áp trước khi chọn biến áp."
    },
    {
      q: "Có cần dự phòng công suất khi chọn biến áp không?",
      a: "Nên dự phòng 20–30% công suất để tránh quá tải và đảm bảo hệ thống hoạt động ổn định lâu dài."
    }
  ], url);

  /* ================= FINAL GRAPH ================= */

  const structuredData = buildGraph(
    pageSchema(url, `Biến áp âm ly cho hệ thống ${app.title}`),
    articleSchema({
      slug: app.slug,
      title: `Cách chọn biến áp âm ly cho hệ thống ${app.title}`,
      summary: `Hướng dẫn tính công suất loa và chọn biến áp 70V – 100V phù hợp cho ${app.title}.`,
      image_url: app.image_url
    }),
    breadcrumbSchema(url, [
      { name: "Trang chủ", url: BASE_URL },
      { name: "Ứng dụng hệ thống PA", url: `${BASE_URL}/ung-dung` },
      { name: app.title, url }
    ]),
    productNode,
    howToNode,
    faqNode
  );

  return (
    <div className="bg-white min-h-screen pb-24">

      <JsonLd data={structuredData} />

      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <header className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter">
              Cách Chọn Biến Áp Âm Ly 70V – 100V Cho Hệ Thống {app.title}
            </h1>

            <p className="text-xl text-slate-300 leading-relaxed font-medium">
              Hướng dẫn chi tiết cách tính tổng công suất loa, chọn biến áp âm ly 70V – 100V phù hợp
              cho hệ thống {app.title}. Đảm bảo truyền tải tín hiệu ổn định, tránh sụt áp,
              méo tiếng và quá nhiệt khi vận hành liên tục.
            </p>
          </header>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-24">

            {/* SYMPTOMS */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-10 uppercase tracking-tighter">
                Dấu Hiệu Hệ Thống PA Chọn Sai Công Suất Biến Áp Âm Ly
              </h2>

              <div className="bg-slate-50 border-l-8 border-accent p-10 rounded-r-[2.5rem] space-y-6 text-lg leading-relaxed text-slate-700 font-medium">

                <p className="font-bold text-xl text-slate-900 italic">
                  {app.problem}
                </p>

                <p>
                  Tình trạng này thường xảy ra khi <strong>tổng công suất loa vượt quá công suất biến áp âm ly 70V – 100V</strong>.
                  Khi hệ thống hoạt động ở mức âm lượng cao hoặc mở đồng thời nhiều vùng loa,
                  biến áp phải làm việc quá tải dẫn đến suy giảm hiệu suất truyền tín hiệu.
                </p>

                <p>
                  Người vận hành thường nhầm lẫn đây là lỗi ampli hoặc loa,
                  nhưng nguyên nhân phổ biến nhất là <strong>tính sai tổng tải hoặc không dự phòng 20–30% công suất</strong>
                  khi thiết kế hệ thống.
                </p>

                <p>
                  Hiện tượng này đặc biệt dễ gặp ở hệ thống loa trường học, nhà xưởng,
                  khu công nghiệp hoặc hệ thống phát thanh nội bộ có đường dây dài và nhiều điểm loa phân tán.
                </p>

              </div>
            </section>


            {/* CAUSE */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-10 uppercase tracking-tighter">
                Nguyên Nhân Thường Gặp Khi Chọn Sai Biến Áp Âm Ly
              </h2>

              <div className="space-y-6 text-lg text-slate-700 leading-relaxed font-medium">

                <p>
                  <strong>1. Tính thiếu tổng công suất loa:</strong> Không cộng đầy đủ công suất tất cả loa trong hệ thống
                  hoặc quên tính các vùng sẽ mở đồng thời, dẫn đến biến áp hoạt động quá tải.
                </p>

                <p>
                  <strong>2. Không dự phòng công suất 20–30%:</strong> Chọn biến áp đúng bằng tổng tải khiến hệ thống
                  luôn chạy ở mức 100%, dễ nóng lõi từ và giảm tuổi thọ.
                </p>

                <p>
                  <strong>3. Nhầm lẫn giữa line 70V và 100V:</strong> Sử dụng sai điện áp đầu ra của ampli
                  làm suy hao tín hiệu hoặc méo tiếng khi vận hành.
                </p>

                <p>
                  <strong>4. Mở rộng hệ thống sau khi lắp đặt:</strong> Thêm loa mới nhưng không nâng cấp biến áp,
                  dẫn đến quá tải âm thầm và hỏng hóc sau một thời gian.
                </p>

                <p>
                  <strong>5. Chất lượng lõi thép và dây đồng kém:</strong> Biến áp giá rẻ thường dùng lõi mỏng,
                  dây nhỏ tiết diện thấp khiến tổn hao lớn và sinh nhiệt nhanh.
                </p>

              </div>
            </section>


            {/* CHECKING */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-10 uppercase tracking-tighter">
                Cách Kiểm Tra Hệ Thống PA Có Bị Quá Tải Biến Áp Hay Không
              </h2>

              <div className="bg-slate-50 rounded-[2.5rem] p-10 space-y-6 text-lg text-slate-700 font-medium leading-relaxed">

                <p>
                  <strong>1. Cộng tổng công suất (W) của tất cả loa:</strong>
                  Tính chính xác tổng tải bằng cách cộng toàn bộ công suất các loa đang sử dụng
                  (bao gồm các vùng có thể mở đồng thời).
                </p>

                <p>
                  <strong>2. So sánh với công suất danh định của biến áp âm ly:</strong>
                  Tổng công suất loa nên nhỏ hơn ít nhất 20–30% so với công suất biến áp
                  để đảm bảo dự phòng an toàn khi vận hành liên tục.
                </p>

                <p>
                  <strong>3. Kiểm tra đúng line output ampli (70V hoặc 100V):</strong>
                  Đảm bảo ampli và biến áp sử dụng cùng chuẩn điện áp line để tránh suy hao tín hiệu
                  hoặc méo tiếng khi tăng âm lượng.
                </p>

                <p>
                  <strong>4. Theo dõi nhiệt độ khi hoạt động 1–2 giờ:</strong>
                  Sau khi hệ thống chạy ở mức âm lượng cao, kiểm tra nhiệt độ vỏ biến áp.
                  Nếu biến áp nóng nhanh bất thường hoặc có mùi khét nhẹ,
                  rất có thể hệ thống đang hoạt động gần hoặc vượt quá công suất thiết kế.
                </p>

                <p>
                  <strong>5. Kiểm tra hiện tượng méo tiếng khi mở lớn:</strong>
                  Nếu âm thanh bị vỡ, giảm âm lượng hoặc sụt áp khi mở nhiều vùng loa,
                  đó là dấu hiệu điển hình của quá tải biến áp 70V – 100V.
                </p>

              </div>
            </section>

            {/* SOLUTION */}
            {/* SOLUTION */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-10 uppercase tracking-tighter">
                Giải Pháp Chọn Đúng Biến Áp Âm Ly 70V – 100V
              </h2>

              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-medium space-y-6">

                <p className="text-xl font-bold text-slate-900">
                  {app.solution}
                </p>

                <p>
                  <strong>1. Chọn công suất biến áp ≥ tổng công suất loa + 20–30%:</strong>
                  Đây là nguyên tắc bắt buộc để đảm bảo hệ thống PA hoạt động ổn định,
                  tránh quá tải khi mở đồng thời nhiều vùng loa hoặc vận hành ở mức âm lượng cao.
                </p>

                <p>
                  <strong>2. Đảm bảo đúng chuẩn line 70V hoặc 100V:</strong>
                  Kiểm tra output ampli và lựa chọn biến áp cùng chuẩn điện áp để
                  duy trì chất lượng tín hiệu và hạn chế méo tiếng.
                </p>

                <p>
                  <strong>3. Ưu tiên lõi thép kỹ thuật & dây đồng tiết diện lớn:</strong>
                  Biến áp chất lượng cao giúp giảm tổn hao từ, hạn chế sinh nhiệt
                  và tăng tuổi thọ khi hệ thống hoạt động liên tục nhiều giờ mỗi ngày.
                </p>

                <p>
                  <strong>4. Với hệ thống lớn nên tách vùng tải:</strong>
                  Chia thành nhiều nhánh hoặc nhiều biến áp riêng biệt giúp
                  cân bằng tải, dễ bảo trì và mở rộng trong tương lai.
                </p>

                <div className="p-10 bg-primary text-white rounded-[2.5rem] shadow-2xl">
                  <h4 className="text-accent font-black uppercase text-xs tracking-widest mb-6">
                    Thiết Bị Khuyến Nghị
                  </h4>

                  <Link
                    to="/san-pham?cat=bien-ap-am-ly-70v-100v"
                    className="inline-flex items-center gap-3 text-2xl font-black hover:text-accent transition-colors uppercase tracking-tight"
                  >
                    Biến áp âm ly 70V – 100V chuyên dùng cho hệ thống truyền thanh
                    <ArrowRight className="h-6 w-6" />
                  </Link>
                </div>

              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-10">

            {/* RELATED / CHECKLIST */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-xl">
              <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight">
                Checklist Chọn Biến Áp Âm Ly 70V – 100V Đúng Chuẩn
              </h3>

              <div className="space-y-5 text-sm font-bold leading-relaxed text-slate-700">

                <p>✓ Cộng chính xác tổng công suất (W) của tất cả loa</p>
                <p>✓ Cộng thêm dự phòng tối thiểu 20–30%</p>
                <p>✓ Kiểm tra đúng line ampli: 70V hay 100V</p>
                <p>✓ Xác định số vùng loa có thể mở đồng thời</p>
                <p>✓ Ưu tiên biến áp lõi thép kỹ thuật, dây đồng tiết diện lớn</p>
                <p>✓ Theo dõi nhiệt độ sau 1–2 giờ vận hành</p>
                <p>✓ Tính đến khả năng mở rộng hệ thống trong tương lai</p>

              </div>

              <div className="mt-10 pt-8 border-t border-slate-200">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-5">
                  Bài viết liên quan
                </h4>

                <div className="space-y-4 text-sm font-bold leading-relaxed">
                  {relatedApps.length === 0 && (
                    <p className="text-slate-400">Đang tải nội dung liên quan...</p>
                  )}

                  {relatedApps.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/kien-thuc/${item.slug}`}
                      className="block hover:text-accent transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>


            {/* QUICK CHECK */}
            <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-10">
              <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight">
                Kiểm Tra Nhanh Hệ Thống PA Có Đang Quá Tải Không
              </h3>

              <div className="space-y-4 text-sm text-slate-700 font-medium leading-relaxed">

                <p>
                  Âm thanh bị méo hoặc nhỏ dần khi tăng volume → có thể tổng công suất loa đã vượt công suất biến áp.
                </p>

                <p>
                  Biến áp nóng nhanh sau 1–2 giờ hoạt động → hệ thống đang chạy sát hoặc vượt tải thiết kế.
                </p>

                <p>
                  Mở thêm vùng loa thì toàn hệ thống yếu đi → công suất dự phòng không đủ.
                </p>

                <p>
                  Âm thanh ổn định khi mở ít loa nhưng lỗi khi mở đồng thời nhiều khu vực → tính thiếu tổng tải thực tế.
                </p>

              </div>
            </div>


            {/* CTA FORM */}
            <div className="bg-primary text-white rounded-[2.5rem] p-10 shadow-2xl sticky top-32">
              <h3 className="text-xl font-black mb-6 uppercase tracking-tight">
                Gửi Thông Số Hệ Thống Để Được Tính Công Suất Biến Áp
              </h3>

              <p className="text-sm text-slate-300 mb-8 leading-relaxed">
                Chỉ cần cung cấp tổng số loa, công suất mỗi loa và line 70V hoặc 100V.
                Kỹ sư sẽ tính tải thực tế và đề xuất công suất biến áp phù hợp trước khi triển khai.
              </p>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Tên của bạn"
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl outline-none focus:border-accent font-bold"
                />

                <input
                  type="tel"
                  placeholder="Số điện thoại"
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl outline-none focus:border-accent font-bold"
                />

                <textarea
                  placeholder="Mô tả hệ thống: số loa, công suất mỗi loa, line 70V hay 100V..."
                  rows={4}
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl outline-none focus:border-accent font-bold"
                />

                <button className="w-full py-5 bg-accent rounded-xl font-black text-sm uppercase tracking-widest hover:brightness-110 transition-all">
                  Nhận Tính Toán & Tư Vấn Miễn Phí
                </button>
              </form>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
