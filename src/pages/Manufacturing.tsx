import React from "react";
import { Factory, ShieldCheck, Award, CheckCircle2, Ruler, Thermometer, Zap } from "lucide-react";
import { supabase } from "@/src/lib/supabase";

/* ---------------- TYPES ---------------- */
type Step = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  sort_order: number;
};

/* ---------------- COMPONENT ---------------- */
export function Manufacturing() {
  const [capacity, setCapacity] = React.useState<Step[]>([]);
  const [loading, setLoading] = React.useState(true);

  /* ---------------- FETCH DATA ---------------- */
  React.useEffect(() => {
    let mounted = true;

    const loadCapacity = async () => {
      const { data } = await supabase
        .from("manufacturing_capacity")
        .select("*")
        .order("sort_order");

      if (!mounted) return;

      setCapacity(data ?? []);
      setLoading(false);
    };

    loadCapacity();
    return () => { mounted = false; };
  }, []);

  /* ---------------- STRUCTURED DATA (SEO) ---------------- */
  const jsonLd = {
    "@type": "Organization",
    name: "IPS Power",
    url: "https://ips-power.vn",
    description: "Nhà sản xuất máy biến áp, ổn áp và giải pháp điện công nghiệp tại Việt Nam",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hà Nội",
      addressCountry: "VN"
    }
  };

  const productLd = {
    "@type": "Product",
    name: "Máy biến áp công nghiệp IPS Power",
    brand: {
      "@type": "Brand",
      name: "IPS Power"
    },
    manufacturer: {
      "@type": "Organization",
      name: "IPS Power"
    },
    category: "Industrial Transformer",
    additionalProperty: [
      { "@type": "PropertyValue", name: "Công suất", value: "50kVA - 2500kVA" },
      { "@type": "PropertyValue", name: "Điện áp vào", value: "220V / 380V / 22kV" },
      { "@type": "PropertyValue", name: "Tiêu chuẩn", value: "ISO 9001:2015" }
    ]
  };

  const howToLd = {
    "@type": "HowTo",
    name: "Quy trình sản xuất máy biến áp",
    step: capacity.map(step => ({
      "@type": "HowToStep",
      name: step.title,
      text: step.description
    }))
  };

  const faqLd = {
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "IPS có test tải trước khi giao hàng không?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tất cả máy biến áp IPS đều được test tải thực tế trước khi xuất xưởng."
        }
      }
    ]
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      jsonLd,
      productLd,
      howToLd,
      faqLd
    ]
  };

  return (
    <div className="pb-24 bg-white">

      {/* SEO STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      {/* ================= HERO ================= */}
      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <header className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter">
              Năng lực sản xuất & <span className="text-accent">Quy trình chất lượng</span>
            </h1>

            <p className="text-xl text-slate-300 leading-relaxed font-medium">
              IPS làm chủ 100% quy trình sản xuất máy biến áp công nghiệp
              từ quấn dây, sấy chân không đến thử nghiệm tải thực tế.
            </p>
          </header>
        </div>
        <Zap className="absolute -right-20 -bottom-20 h-96 w-96 text-white/5 rotate-12" />
      </section>

      {/* ================= FACTORY STATS ================= */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Diện tích nhà xưởng", value: "5,000 m²", icon: Factory },
            { label: "Công suất sản xuất", value: "5,000 kVA/tháng", icon: Zap },
            { label: "Chứng chỉ chất lượng", value: "ISO 9001:2015", icon: ShieldCheck },
          ].map((stat, i) => (
            <article key={i} className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-8">
              <div className="p-5 bg-slate-50 rounded-2xl text-accent">
                <stat.icon className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-[11px] text-slate-500 font-black uppercase tracking-widest mb-1">
                  {stat.label}
                </h3>
                <p className="text-3xl font-black text-slate-900 tracking-tight">
                  {stat.value}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= PROCESS ================= */}
      <section className="max-w-7xl mx-auto px-4 py-32">
        <header className="text-center mb-24">
          <h2 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">
            Quy trình sản xuất máy biến áp
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">
            Mỗi thiết bị đều được kiểm tra tải thực trước khi xuất xưởng
          </p>
        </header>

        {/* SKELETON */}
        {loading && (
          <div className="space-y-20 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-slate-100 rounded-3xl" />
            ))}
          </div>
        )}

        {/* REAL CONTENT */}
        <div className="space-y-32">
          {capacity.map((step, i) => (
            <article
              key={step.id}
              className={`flex flex-col lg:flex-row gap-20 items-center ${i % 2 ? "lg:flex-row-reverse" : ""}`}
            >
              <div className="lg:w-1/2">
                <div className="text-7xl font-black text-slate-100 mb-8 leading-none">
                  0{step.sort_order}
                </div>

                <h3 className="text-3xl font-black text-slate-900 mb-6 uppercase">
                  {step.title}
                </h3>

                <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
                  {step.description}
                </p>

                <ul className="space-y-3 text-sm font-bold text-slate-800">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent" /> Kiểm soát sai số &lt; 1%
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent" /> Test tải thực tế
                  </li>
                </ul>
              </div>

              <div className="lg:w-1/2">
                <img
                  src={step.image_url}
                  alt={`Quy trình sản xuất bước ${step.sort_order} - ${step.title}`}
                  loading="lazy"
                  className="rounded-[3rem] shadow-2xl w-full aspect-video object-cover border-8 border-slate-50"
                  referrerPolicy="no-referrer"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================= QC ================= */}
      <section className="bg-slate-50 py-32 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <header className="mb-16">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">
              Kiểm soát chất lượng QC
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Ruler, title: "Đo lường chính xác", desc: "Hiệu chuẩn định kỳ" },
              { icon: Thermometer, title: "Kiểm tra phát nhiệt", desc: "Test tải 24h" },
              { icon: ShieldCheck, title: "Thử cao áp", desc: "2.5kV - 5kV" },
              { icon: Award, title: "ISO 9001", desc: "Quy trình chuẩn quốc tế" },
            ].map((item, i) => (
              <article key={i} className="p-8 bg-white rounded-3xl border border-slate-200">
                <item.icon className="h-8 w-8 text-accent mb-6" />
                <h3 className="font-black text-slate-900 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}