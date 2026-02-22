import React from "react";
import { Factory, ShieldCheck, Award, CheckCircle2, Ruler, Thermometer, Zap, Volume2, Activity } from "lucide-react";
import { supabase } from "@/src/lib/supabase";
import { BASE_URL, buildGraph, faqSchema, JsonLd, NAME_INFO, ORG_ID, pageSchema, rootSchema } from "../components/SEO";

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


  const url = `${BASE_URL}/san-xuat-may-bien-ap`;

  /* ================= PAGE ================= */

  const webpage = {
    ...pageSchema(url, `Quy trình sản xuất máy biến áp | ${NAME_INFO}`),
    description:
      "Quy trình sản xuất biến áp audio: biến áp nguồn ampli, biến áp xuất âm, 70V-100V cho hệ thống truyền thanh và phòng thu.",
    mainEntity: { "@id": `${url}#product` }
  };

  /* ================= PRODUCT ================= */

  const service = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: `Gia công & thiết kế biến áp âm thanh theo yêu cầu`,
    provider: { "@id": ORG_ID },
    areaServed: "VN",
    serviceType: "Audio transformer manufacturing",
    description:
      "Thiết kế và sản xuất biến áp nguồn ampli, biến áp xuất âm, biến áp 70V-100V cho hệ thống truyền thanh và studio",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Audio Transformer Types",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Biến áp nguồn ampli" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Biến áp xuất âm" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Biến áp loa 70V-100V" } }
      ]
    }
  };

  /* ================= HOWTO ================= */

  const howTo = {
    "@type": "HowTo",
    "@id": `${url}#howto`,
    name: "Quy trình sản xuất máy biến áp",
    mainEntityOfPage: { "@id": `${url}#webpage` },
    step: capacity.map(step => ({
      "@type": "HowToStep",
      name: step.title,
      text: step.description,
      image: step.image_url
    }))
  };

  /* ================= FAQ ================= */
  const faq = faqSchema([
    {
      q: "Biến áp audio có bị ù không?",
      a: `${NAME_INFO} đo nhiễu nền và đáp tuyến tần số trước khi xuất xưởng để đảm bảo không hum khi lắp vào ampli.`
    },
    {
      q: `${NAME_INFO} có nhận thiết kế theo thông số riêng không?`,
      a: `Chúng tôi thiết kế biến áp theo trở kháng loa, công suất ampli và dải tần yêu cầu.`
    }
  ], url);

  /* ================= FINAL GRAPH ================= */

  const structuredData = buildGraph(
    ...rootSchema["@graph"],
    webpage,
    service,
    howTo,
    faq
  );

  return (
    <div className="pb-24 bg-white">
      <JsonLd data={structuredData} />
      {/* ================= HERO ================= */}
      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <header className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter">
              Xưởng quấn <span className="text-accent">Biến Áp Âm Ly</span> & Gia Công Theo Yêu Cầu
            </h1>

            <p className="text-xl text-slate-300 leading-relaxed font-medium">
              {NAME_INFO} chuyên quấn biến áp nguồn ampli, biến áp xuất âm,
              biến áp loa nén 70V–100V dùng cho hệ thống truyền thanh xã phường,
              trường học, khu công nghiệp và các dự án âm thanh công cộng.
            </p>
          </header>
        </div>
        <Zap className="absolute -right-20 -bottom-20 h-96 w-96 text-white/5 rotate-12" />
      </section>

      {/* ================= WORKSHOP STATS ================= */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Kinh nghiệm quấn biến áp", value: "15+ năm", icon: ShieldCheck },
            { label: "Đơn hàng gia công mỗi tháng", value: "300+ bộ", icon: Zap },
            { label: "Hỗ trợ thiết kế kỹ thuật", value: "Theo thông số riêng", icon: Factory },
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
            Quy trình sản xuất biến áp âm thanh & truyền thanh
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">
            Mỗi biến áp loa 70V–100V và biến áp xuất âm đều được đo đáp tuyến tần số,
            kiểm tra méo tín hiệu và thử tải thực với ampli trước khi bàn giao.
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
                    <CheckCircle2 className="h-5 w-5 text-accent" /> Đo đáp tuyến tần số 50Hz – 18kHz
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent" /> Thử tải loa 4Ω / 8Ω / 100V line
                  </li>
                </ul>
              </div>

              <div className="lg:w-1/2">
                <img
                  src={step.image_url}
                  alt={`${step.title} biến áp âm thanh 70V 100V tại xưởng`}
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
              Kiểm tra điện & âm thanh trước xuất xưởng
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Activity,
                title: "Đo đáp tuyến tần số",
                desc: "20Hz – 20kHz, kiểm tra suy hao bass & treble"
              },
              {
                icon: Volume2,
                title: "Kiểm tra nhiễu & ù nền",
                desc: "Đảm bảo không hum khi lắp vào ampli"
              },
              {
                icon: Thermometer,
                title: "Test tải liên tục",
                desc: "Hoạt động 24h ở công suất danh định"
              },
              {
                icon: ShieldCheck,
                title: "Thử cách điện cao áp",
                desc: "2.5kV – 5kV giữa các lớp cuộn"
              }
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