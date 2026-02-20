import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Activity, AlertTriangle, Zap } from 'lucide-react';
import { JsonLd } from '@/src/components/SEO';
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

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Giải pháp điện công nghiệp theo ngành",
    hasPart: apps.map(app => ({
      "@type": "Article",
      name: `Giải pháp điện cho ${app.title}`,
      url: `https://ips-power.vn/ung-dung/${app.slug}`
    }))
  };

  const breadcrumbLd = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Trang chủ",
        "item": "https://ips-power.vn"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Giải pháp theo ngành",
        "item": "https://ips-power.vn/ung-dung"
      }
    ]
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbLd, collectionLd]
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">

      {/* HERO */}
      <section className="bg-white border-b border-slate-200 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* PAGE TITLE */}
          <header className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 uppercase tracking-tighter">
              Giải pháp điện công nghiệp theo ngành sản xuất
            </h1>

            <p className="text-xl text-slate-600 font-medium leading-relaxed">
              Các giải pháp ổn định điện áp, chống sụt áp và bảo vệ thiết bị được thiết kế riêng cho từng mô hình nhà xưởng: cơ khí, CNC, nhựa, dệt may, trạm sạc xe điện và dây chuyền tự động hóa.
            </p>
          </header>

          {/* SEO STRUCTURED DATA */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData)
            }}
          />
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
                    alt={`Giải pháp điện cho ${app.title}`}
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
                    Giải pháp điện cho {app.title}
                  </h2>

                  <p
                    className="text-slate-500 mb-10 line-clamp-2 font-medium leading-relaxed"
                    itemProp="description"
                  >
                    {app.problem}
                  </p>

                  <div className="flex items-center gap-2 text-accent font-black text-xs uppercase tracking-widest">
                    Xem phân tích nguyên nhân & cách xử lý
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>

              {/* SERVICE SCHEMA */}
              <meta itemProp="provider" content="IPS Power" />
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

  if (!app) return <div className="p-20 text-center">Đang tải...</div>;

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `Cách xử lý ${app.title} bị điện yếu`,
    step: [
      { "@type": "HowToStep", name: "Nhận biết dấu hiệu", text: app.problem },
      { "@type": "HowToStep", name: "Xác định nguyên nhân", text: "Kiểm tra sụt áp, dòng khởi động và lệch pha" },
      { "@type": "HowToStep", name: "Đo kiểm tra", text: "Đo điện áp khi máy đang tải" },
      { "@type": "HowToStep", name: "Giải pháp", text: app.solution }
    ]
  };

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Máy biến áp 3 pha công nghiệp",
    brand: { "@type": "Brand", name: "IPS Power" },
    isRelatedTo: {
      "@type": "TechArticle",
      name: `${app.title} sụt áp`
    }
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `${app.title} bị lỗi có cần mua ổn áp không?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Không phải mọi trường hợp đều cần ổn áp, cần xác định nguyên nhân sụt áp trước."
        }
      }
    ]
  };

  const articleLd = {
    "@type": "TechArticle",
    "headline": `${app.title} bị sụt áp – nguyên nhân & cách xử lý`,
    "description": app.problem,
    "author": {
      "@type": "Organization",
      "name": "IPS Power"
    },
    "publisher": {
      "@type": "Organization",
      "name": "IPS Power",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ips-power.vn/logo.png"
      }
    },
    "about": [
      { "@type": "Thing", "name": "Sụt áp điện công nghiệp" },
      { "@type": "Thing", "name": "Máy sản xuất nhà xưởng" }
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Kỹ sư nhà máy"
    },
    "mainEntityOfPage": `https://ips-power.vn/ung-dung/${app.slug}`
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [articleLd, howToLd, productLd, faqLd]
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "headline": `${app.title} bị sụt áp – nguyên nhân & cách xử lý`,
          "about": "Industrial Electrical System",
          "author": {
            "@type": "Organization",
            "name": "IPS Power"
          },
          "audience": {
            "@type": "Audience",
            "audienceType": "Kỹ sư nhà máy"
          }
        }}
      />

      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <header className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter">
              {app.title} – Nguyên nhân & giải pháp xử lý điện yếu
            </h1>

            <p className="text-xl text-slate-300 leading-relaxed font-medium">
              Phân tích thực tế hiện tượng: {app.problem}.
              Tài liệu kỹ thuật này giúp xác định đúng nguyên nhân trước khi thay ổn áp hoặc biến áp để tránh lãng phí chi phí.
            </p>
          </header>
        </div>
        <Zap className="absolute -right-20 -bottom-20 h-96 w-96 text-white/5 rotate-12" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-24">

            {/* SYMPTOMS */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-10 uppercase tracking-tighter">
                Dấu hiệu nhận biết hệ thống điện gặp sự cố
              </h2>

              <div className="bg-slate-50 border-l-8 border-accent p-10 rounded-r-[2.5rem] space-y-6 text-lg leading-relaxed text-slate-700 font-medium">
                <p className="font-bold text-xl text-slate-900 italic">{app.problem}</p>

                <p>
                  Hiện tượng này thường xuất hiện khi điện áp tại điểm đặt máy thấp hơn điện áp danh định
                  trong lúc thiết bị đang tải. Người vận hành thường nhầm lẫn với lỗi máy hoặc lỗi driver,
                  tuy nhiên nguyên nhân thực tế thường nằm ở hệ thống cấp nguồn.
                </p>

                <p>
                  Đặc biệt phổ biến ở nhà xưởng có đường dây dài, nhiều thiết bị khởi động đồng thời
                  hoặc sử dụng máy nhập khẩu yêu cầu điện áp ổn định cao.
                </p>
              </div>
            </section>


            {/* CAUSE */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-10 uppercase tracking-tighter">
                Nguyên nhân kỹ thuật
              </h2>

              <div className="space-y-6 text-lg text-slate-700 leading-relaxed font-medium">
                <p><strong>1. Sụt áp đường dây:</strong> tiết diện dây không đủ hoặc khoảng cách quá xa.</p>
                <p><strong>2. Dòng khởi động lớn:</strong> motor, máy nén khí, máy ép nhựa làm tụt áp tức thời.</p>
                <p><strong>3. Cấp nguồn sai vị trí:</strong> đấu sau tủ phân phối thay vì gần nguồn tổng.</p>
                <p><strong>4. Lệch pha:</strong> tải phân bố không đều giữa 3 pha.</p>
              </div>
            </section>


            {/* CHECKING */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-10 uppercase tracking-tighter">
                Cách kiểm tra nhanh tại xưởng
              </h2>

              <div className="bg-slate-50 rounded-[2.5rem] p-10 space-y-6 text-lg text-slate-700 font-medium leading-relaxed">
                <p>Đo điện áp khi máy đang chạy tải — không đo lúc không tải.</p>
                <p>Nếu điện áp tụt hơn 8% so với danh định → hệ thống đang sụt áp.</p>
                <p>Nếu máy lỗi khi thiết bị khác khởi động → thiếu công suất cấp nguồn.</p>
              </div>
            </section>


            {/* SOLUTION */}
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-10 uppercase tracking-tighter">
                Giải pháp kỹ thuật phù hợp
              </h2>

              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-medium space-y-6">
                <p className="text-xl font-bold text-slate-900">{app.solution}</p>

                <p>
                  Không phải mọi trường hợp đều cần ổn áp. Trong nhiều hệ thống,
                  giải pháp đúng là tách nguồn hoặc đặt biến áp gần tải để giảm sụt áp.
                </p>

                <p>
                  Việc chọn sai thiết bị có thể khiến điện vẫn yếu dù đã đầu tư lớn,
                  do đó cần xác định nguyên nhân trước khi lắp đặt.
                </p>

                <div className="p-10 bg-primary text-white rounded-[2.5rem] shadow-2xl">
                  <h4 className="text-accent font-black uppercase text-xs tracking-widest mb-6">
                    Thiết bị thường được sử dụng
                  </h4>

                  <Link
                    to="/san-pham?cat=may-bien-ap-3-pha"
                    className="inline-flex items-center gap-3 text-2xl font-black hover:text-accent transition-colors uppercase tracking-tight"
                  >
                    Máy biến áp 3 pha công nghiệp
                    <ArrowRight className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-10">

            {/* RELATED PROBLEMS */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-xl">
              <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight">
                Sự cố điện tương tự
              </h3>

              <div className="space-y-5 text-sm font-bold leading-relaxed">
                <Link to="/kien-thuc/may-cnc-bao-undervoltage" className="block hover:text-accent">
                  Máy CNC báo lỗi undervoltage khi chạy tải
                </Link>
                <Link to="/kien-thuc/motor-khoi-dong-nhay-aptomat" className="block hover:text-accent">
                  Motor khởi động làm nhảy aptomat tổng
                </Link>
                <Link to="/kien-thuc/may-laser-reset" className="block hover:text-accent">
                  Máy laser reset khi máy khác khởi động
                </Link>
                <Link to="/kien-thuc/sut-ap-cuoi-xuong" className="block hover:text-accent">
                  Điện yếu ở cuối nhà xưởng
                </Link>
              </div>
            </div>


            {/* QUICK CHECK */}
            <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-10">
              <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight">
                Kiểm tra nhanh
              </h3>

              <div className="space-y-4 text-sm text-slate-700 font-medium leading-relaxed">
                <p>Điện áp khi tải thấp hơn định mức &gt; 8% → sụt áp</p>
                <p>Máy lỗi khi thiết bị khác chạy → thiếu công suất nguồn</p>
                <p>Máy chạy ban ngày lỗi, tối bình thường → quá tải lưới</p>
              </div>
            </div>


            {/* CTA FORM */}
            <div className="bg-primary text-white rounded-[2.5rem] p-10 shadow-2xl sticky top-32">
              <h3 className="text-xl font-black mb-6 uppercase tracking-tight">
                Gửi thông số để kiểm tra
              </h3>

              <p className="text-sm text-slate-300 mb-8 leading-relaxed">
                Chỉ cần công suất máy lớn nhất và khoảng cách dây.
                Kỹ sư có thể xác định nguyên nhân trước khi khảo sát.
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
                  placeholder="Mô tả hiện trạng điện"
                  rows={4}
                  className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl outline-none focus:border-accent font-bold"
                />

                <button className="w-full py-5 bg-accent rounded-xl font-black text-sm uppercase tracking-widest hover:brightness-110 transition-all">
                  Nhận phân tích kỹ thuật
                </button>
              </form>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
