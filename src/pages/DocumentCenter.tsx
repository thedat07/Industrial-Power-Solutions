import React from 'react';
import { FileText, Download, Lock, CheckCircle2, Table, FileCode, ShieldCheck, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { supabase } from "@/src/lib/supabase";
import { Link, useLocation } from "react-router-dom";

export function DocumentCenter() {
  const [docs, setDocs] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const location = useLocation();

  const getActiveTab = () => {
    const path = location.pathname;

    if (path.includes("catalogue")) return "catalogue";
    if (path.includes("datasheet")) return "datasheet";
    if (path.includes("ban-ve")) return "drawing";
    if (path.includes("tieu-chuan")) return "standard";

    return "all";
  };

  const activeTab = getActiveTab();
  const [showGate, setShowGate] = React.useState<any>(null); // Store doc to download
  const [leadStatus, setLeadStatus] = React.useState<'idle' | 'success'>('idle');

  const breadcrumbLd = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: "https://ips-power.vn" },
      { "@type": "ListItem", position: 2, name: "Tài liệu kỹ thuật", item: "https://ips-power.vn/tai-lieu-may-bien-ap" }
    ]
  };

  const collectionLd = {
    "@type": "CollectionPage",
    "name": "Thư viện tài liệu máy biến áp",
    "url": "https://ips-power.vn/tai-lieu-may-bien-ap",
    "about": "Catalogue, Datasheet, bản vẽ CAD máy biến áp công nghiệp",
  };

  const documentsLd = {
    "@type": "ItemList",
    "itemListElement": docs.map((doc, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "DigitalDocument",
        name: doc.title,
        url: `https://ips-power.vn/tai-lieu/${doc.slug}`,
        encodingFormat: doc.file_format,
        fileFormat: doc.file_format,
        contentUrl: doc.file_url,
        author: {
          "@type": "Organization",
          name: "IPS Power"
        }
      }
    }))
  };

  const structuredData = docs.length === 0 ? null : {
    "@context": "https://schema.org",
    "@graph": [breadcrumbLd, collectionLd, documentsLd]
  };

  React.useEffect(() => {
    const loadDocs = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("documents")
        .select("*");

      if (error) {
        console.error("Load documents error:", error);
        setDocs([]);
      } else {
        setDocs(data ?? []);
      }

      setLoading(false);
    };

    loadDocs();
  }, []);

  const normalize = (s: string) => s?.toLowerCase().trim();

  const filteredDocs = docs.filter(d => {
    if (activeTab === "all") return true;

    const type = normalize(d.type);

    if (activeTab === "catalogue") return type.includes("catalog");
    if (activeTab === "datasheet") return type.includes("data");
    if (activeTab === "drawing") return type.includes("draw") || type.includes("cad");
    if (activeTab === "standard") return type.includes("standard") || type.includes("iec");

    return false;
  });

  const handleDownload = (doc: any) => {
    setShowGate(doc);
  };

  const onLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const payload = {
      type: "document_download",
      company_name: formData.get("company"),
      email: formData.get("email"),
      document_id: showGate.id,
      document_title: showGate.title,
    };

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Lead API error:", text);
      alert("Không gửi được form. Kiểm tra server /api/leads");
      return;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}

      <section className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <header className="max-w-4xl">

            <h1 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tight leading-tight">
              Tài liệu kỹ thuật máy biến áp: Catalogue, Datasheet & Bản vẽ CAD
            </h1>

            <p className="text-lg text-slate-600 font-medium leading-relaxed">
              Thư viện tài liệu máy biến áp dành cho kỹ sư điện, nhà thầu M&E và bộ phận bảo trì nhà máy.
              Bao gồm thông số điện áp, dòng tải, tổn hao, kích thước lắp đặt và tiêu chuẩn IEC/TCVN
              giúp lựa chọn đúng công suất và tránh sụt áp trong hệ thống.
            </p>

            <p className="mt-4 text-sm text-slate-500">
              Có thể tải trực tiếp file PDF, CAD để sử dụng trong thiết kế tủ điện và hồ sơ kỹ thuật.
            </p>

          </header>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* List */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDocs.map((doc) => (
              <article
                key={doc.id}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-200 hover:border-accent hover:shadow-2xl transition-all shadow-sm group"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-orange-50 group-hover:text-accent transition-colors">
                    {doc.type === 'drawing'
                      ? <FileCode className="h-8 w-8" />
                      : <FileText className="h-8 w-8" />}
                  </div>

                  <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full">
                    {doc.file_format}
                  </span>
                </div>

                {/* TITLE = LINK SEO */}
                <Link
                  to={`/tai-lieu/${doc.slug}`}
                  tabIndex={-1}
                  aria-hidden="true"
                  className="block pointer-events-none select-none"
                >
                  <h2 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight leading-tight">
                    {doc.title}
                  </h2>
                </Link>

                <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-8">
                  {doc.category_name} | {doc.power_range}
                </div>

                {/* DOWNLOAD LINK thật (Google index được file) */}
                <div className="relative">
                  {/* BOT link */}
                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sr-only"
                  >
                    Download {doc.title}
                  </a>

                  {/* USER button */}
                  <button
                    onClick={() => handleDownload(doc)}
                    className="w-full py-4 bg-slate-950 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-accent transition-all flex items-center justify-center gap-3"
                  >
                    <Download className="h-4 w-4" />
                    Tải xuống {doc.file_format}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Lead Gate Modal */}
      {/* ================== LEAD GATE ================== */}
      {showGate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">

          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative">

            {/* CLOSE */}
            <button
              onClick={() => setShowGate(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-900"
              aria-label="Đóng"
            >
              <X className="h-6 w-6" />
            </button>


            {/* SUCCESS */}
            {leadStatus === 'success' ? (
              <div className="text-center py-10">

                <div className="w-16 h-16 bg-orange-50 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Tải xuống bắt đầu
                </h3>

                <p className="text-slate-500 mb-6">
                  File đang được mở trong tab mới.
                  Nếu không thấy, hãy kiểm tra popup blocker.
                </p>

                {/* FALLBACK DOWNLOAD — SEO IMPORTANT */}
                <a
                  href={showGate.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-accent transition"
                >
                  <Download className="h-4 w-4" />
                  Tải lại file
                </a>

              </div>
            ) : (
              <>
                {/* HEADER */}
                <div className="mb-8">

                  <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center mb-6">
                    <Lock className="h-7 w-7 text-slate-400" />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Nhận link tải tài liệu
                  </h3>

                  <p className="text-sm text-slate-500 leading-relaxed">
                    Nhập email để tải <b>{showGate.title}</b> và nhận hỗ trợ kỹ thuật từ kỹ sư.
                  </p>

                </div>


                {/* FORM */}
                <form onSubmit={onLeadSubmit} className="space-y-4">

                  <div>
                    <label className="text-xs font-semibold text-slate-500">
                      Công ty / Nhà máy
                    </label>
                    <input
                      required
                      name="company"
                      type="text"
                      autoComplete="organization"
                      className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-500">
                      Email nhận tài liệu
                    </label>
                    <input
                      required
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="w-full mt-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-accent text-white rounded-xl font-bold hover:brightness-110 transition"
                  >
                    Nhận link tải
                  </button>

                </form>


                {/* BOT-ACCESS LINK (ẨN) — SEO CRITICAL */}
                <a
                  href={showGate.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sr-only"
                >
                  Download {showGate.title}
                </a>

              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
