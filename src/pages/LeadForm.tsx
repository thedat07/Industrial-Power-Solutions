import React from 'react';
import { Mail, Phone, Building2, Upload, Send, CheckCircle2, AlertCircle, Zap } from 'lucide-react';
import { ADDRESS, BASE_URL, buildGraph, EMAIL, JsonLd, NAME_INFO, ORG_ID, pageSchema, rootSchema, TELEPHONE, TELEPHONE_TEXT, YOUR_PUBLIC_KEY, YOUR_TEMPLATE_ID, YOUR_SERVICE_ID } from '../components/SEO';
import emailjs from '@emailjs/browser';

export function LeadForm() {
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const initialFormState = {
    company_name: '',
    phone: '',
    email: '',
    speaker_quantity: '',
    speaker_power: '',
    line_length: '',
    load_description: '',
  };

  const [formData, setFormData] = React.useState(initialFormState);

  const url = `${BASE_URL}/gui-thong-so`;

  /* ================= SERVICE ================= */

  const service = {
    "@type": "Service",
    "@id": `${url}#service`,
    "name": "Tư vấn chọn biến áp âm ly 70V – 100V line",
    "provider": { "@id": ORG_ID },
    "areaServed": {
      "@type": "Country",
      "name": "Vietnam"
    },
    "serviceType": "Tư vấn cấu hình biến áp cho hệ thống âm thanh công cộng",
    "description":
      "Phân tích tổng công suất loa, chiều dài tuyến dây và dự phòng tải để đề xuất công suất kVA phù hợp cho biến áp âm ly 70V – 100V line.",
    "audience": {
      "@type": "Audience",
      "audienceType":
        "Đơn vị tích hợp hệ thống PA, công ty thiết bị âm thanh dự án, kỹ thuật viên lắp đặt"
    }
  };

  /* ================= PAGE ================= */

  const webpage = {
    ...pageSchema(
      url,
      `Gửi thông số hệ thống để tư vấn chọn biến áp âm ly | ${NAME_INFO}`
    ),
    "description":
      `Gửi số lượng loa, tổng công suất, chiều dài tuyến dây và yêu cầu hệ thống để ${NAME_INFO} phân tích và đề xuất cấu hình biến áp âm ly 70V – 100V line phù hợp.`,
    "mainEntity": { "@id": `${url}#service` },
    "about": {
      "@type": "Thing",
      "name": "Biến áp âm ly 100V line cho hệ thống PA"
    },
    "potentialAction": {
      "@type": "ContactAction",
      "name": "Gửi thông số hệ thống",
      "target": url,
      "description":
        "Khách hàng gửi thông tin hệ thống để được kỹ sư phân tích và đề xuất cấu hình biến áp phù hợp."
    },
    "keywords":
      "biến áp âm ly 100V, gửi thông số hệ thống PA, tư vấn chọn kVA biến áp, biến áp loa truyền thanh"
  };


  /* ================= FINAL GRAPH ================= */

  const structuredData = buildGraph(
    ...rootSchema["@graph"],
    webpage,
    service
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    if (!formData.company_name || !formData.phone) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc.");
      return;
    }

    setStatus("submitting");

    try {
      await emailjs.send(
        YOUR_SERVICE_ID,
        YOUR_TEMPLATE_ID,
        {
          company_name: formData.company_name,
          phone: formData.phone,
          email: formData.email || "Không cung cấp",
          speaker_quantity: formData.speaker_quantity || "Không rõ",
          speaker_power: formData.speaker_power || "Không rõ",
          line_length: formData.line_length || "Không rõ",
          load_description: formData.load_description || "Không có mô tả",
          submit_time: new Date().toLocaleString("vi-VN"),
        },
        YOUR_PUBLIC_KEY
      );

      setStatus("success");
      setFormData(initialFormState);
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    }
  };

  if (status === 'success') {
    return (
      <main className="max-w-2xl mx-auto px-4 py-32 text-center">
        <JsonLd data={structuredData} />
        <header>
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl">
            <CheckCircle2 className="h-12 w-12" />
          </div>

          <h1 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tight">
            Đã nhận thông số hệ thống
          </h1>

          <p className="text-lg text-slate-600 mb-6 font-medium leading-relaxed">
            Đội ngũ kỹ sư {NAME_INFO} đang phân tích công suất và cấu hình hệ thống
            để đề xuất biến áp âm ly phù hợp, đảm bảo hoạt động ổn định và đúng tải.
          </p>

          <p className="text-slate-500 mb-12">
            Thời gian phản hồi tiêu chuẩn: <strong>trong vòng 2 giờ làm việc</strong>.
          </p>
        </header>

        {/* SEO INTERNAL LINKS */}
        <nav className="space-y-4 mb-16">
          <a href="/san-pham/bien-ap-am-ly" className="block text-accent font-bold hover:underline">
            Xem các dòng biến áp âm ly
          </a>

          <a href="/kien-thuc/tinh-cong-suat" className="block text-accent font-bold hover:underline">
            Hướng dẫn chọn công suất biến áp âm ly
          </a>
        </nav>

        <button
          onClick={() => setStatus('idle')}
          className="px-10 py-5 bg-primary text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-all"
        >
          Gửi yêu cầu khác
        </button>
      </main>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <section className="bg-white border-b border-slate-200 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <header className="max-w-4xl">

            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 uppercase tracking-tight leading-tight">
              Gửi thông số để tính công suất & báo giá biến áp âm ly
            </h1>

            <p className="text-xl text-slate-700 font-medium leading-relaxed">
              Điền tổng công suất loa, số lượng thiết bị, chiều dài tuyến dây hoặc mô tả hệ thống âm thanh.
              Kỹ sư {NAME_INFO} sẽ tính toán công suất phù hợp, kiểm tra khả năng chịu tải
              và đề xuất cấu hình biến áp âm ly đảm bảo hoạt động ổn định, không quá tải.
            </p>

            <p className="mt-6 text-base text-slate-500 leading-relaxed">
              Áp dụng cho: hệ thống loa truyền thanh, âm thanh thông báo nhà xưởng,
              trường học, bệnh viện, khu công nghiệp và các hệ thống âm thanh công cộng diện rộng.
            </p>

          </header>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-12">

            {/* CONTACT INFO */}
            <div className="space-y-10">

              {/* PHONE */}
              <div className="flex gap-6 items-start">
                <div className="p-4 bg-white rounded-2xl text-accent shadow-lg border border-slate-100 shrink-0">
                  <Phone className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-2">
                    Hotline kỹ sư điện
                  </h3>
                  <a href={`tel:${TELEPHONE}`} className="text-2xl font-black text-slate-900 tracking-tight hover:text-accent transition-colors">
                    {TELEPHONE_TEXT}
                  </a>
                  <p className="text-xs text-slate-400 font-bold uppercase mt-1">
                    Hỗ trợ sự cố điện 24/7 toàn quốc
                  </p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex gap-6 items-start">
                <div className="p-4 bg-white rounded-2xl text-accent shadow-lg border border-slate-100 shrink-0">
                  <Mail className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-2">
                    Email tiếp nhận thông số hệ thống
                  </h3>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(EMAIL);
                      alert("Đã sao chép email!");
                    }}
                    className="text-2xl font-black text-slate-900 tracking-tight hover:text-accent transition-colors"
                  >
                    {EMAIL}
                  </button>
                  <p className="text-xs text-slate-400 font-bold uppercase mt-1">
                    Phản hồi kỹ thuật trong 2 giờ làm việc
                  </p>
                </div>
              </div>

              {/* CƠ SỞ SẢN XUẤT */}
              <div className="flex gap-6 items-start">
                <div className="p-4 bg-white rounded-2xl text-accent shadow-lg border border-slate-100 shrink-0">
                  <Building2 className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-2">
                    Cơ sở sản xuất & bảo hành biến áp âm ly
                  </h3>
                  <p className="text-lg font-black text-slate-900 leading-tight">
                    {ADDRESS}
                  </p>
                  <p className="text-xs text-slate-400 font-bold uppercase mt-1">
                    Sẵn linh kiện thay thế & hỗ trợ kỹ thuật nhanh chóng
                  </p>
                </div>
              </div>
            </div>

            {/* REQUIREMENTS GUIDE */}
            <div className="p-10 bg-primary text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden">

              <h4 className="text-accent font-black uppercase text-xs tracking-widest mb-6 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Thông tin cần gửi để báo giá chính xác
              </h4>

              <p className="text-sm text-slate-300 mb-6 font-medium">
                Cung cấp càng đầy đủ → tính công suất càng chính xác, tránh chọn sai gây méo tiếng hoặc quá tải hệ thống.
              </p>

              <ul className="text-sm text-slate-300 space-y-4 font-medium">

                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></div>
                  Tổng số lượng loa và công suất mỗi loa (W)
                </li>

                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></div>
                  Sơ đồ đấu nối hoặc mô tả cách đi dây hệ thống
                </li>

                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></div>
                  Chiều dài tuyến dây chính và khoảng cách xa nhất
                </li>

                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></div>
                  Hiện tượng đang gặp (âm nhỏ, méo tiếng, quá nhiệt, cháy biến áp cũ...)
                </li>

              </ul>

              <Zap className="absolute -right-10 -bottom-10 h-48 w-48 text-white/5 rotate-12" />
            </div>

          </div>

          <div className="lg:col-span-7">
            <div className="bg-white border-2 border-slate-100 rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-slate-200/50">
              <form onSubmit={handleSubmit} className="space-y-10" noValidate>

                {/* COMPANY + PHONE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                  <div className="space-y-2">
                    <label htmlFor="company_name" className="text-[11px] font-black text-slate-600 uppercase tracking-widest">
                      Tên đơn vị / Công trình *
                    </label>

                    <input
                      id="company_name"
                      name="company_name"
                      autoComplete="organization"
                      required
                      minLength={3}
                      value={formData.company_name}
                      onChange={e => setFormData({ ...formData, company_name: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-accent outline-none font-semibold"
                      placeholder="UBND xã A / Trường THPT B / Khu công nghiệp C"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-[11px] font-black text-slate-600 uppercase tracking-widest">
                      Số điện thoại kỹ thuật *
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      required
                      pattern="(0|\+84)[0-9]{9,10}"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-accent outline-none font-semibold"
                      placeholder="090xxxxxxx"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[11px] font-black text-slate-600 uppercase tracking-widest">
                    Email nhận báo giá
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-accent outline-none font-semibold"
                    placeholder="kythuat@donvi.vn"
                  />
                </div>

                {/* SYSTEM INFO */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                  <div className="space-y-2">
                    <label htmlFor="speaker_quantity" className="text-[11px] font-black text-slate-600 uppercase tracking-widest">
                      Số lượng loa
                    </label>

                    <input
                      id="speaker_quantity"
                      name="speaker_quantity"
                      inputMode="numeric"
                      value={formData.speaker_quantity}
                      onChange={e => setFormData({ ...formData, speaker_quantity: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-accent outline-none font-semibold"
                      placeholder="20 / 45 / 120..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="speaker_power" className="text-[11px] font-black text-slate-600 uppercase tracking-widest">
                      Công suất mỗi loa (W)
                    </label>

                    <input
                      id="speaker_power"
                      name="speaker_power"
                      inputMode="numeric"
                      value={formData.speaker_power}
                      onChange={e => setFormData({ ...formData, speaker_power: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-accent outline-none font-semibold"
                      placeholder="10W / 20W / 30W..."
                    />
                  </div>
                </div>

                {/* LINE LENGTH */}
                <div className="space-y-2">
                  <label htmlFor="line_length" className="text-[11px] font-black text-slate-600 uppercase tracking-widest">
                    Chiều dài tuyến dây chính (m)
                  </label>

                  <input
                    id="line_length"
                    name="line_length"
                    inputMode="numeric"
                    value={formData.line_length}
                    onChange={e => setFormData({ ...formData, line_length: e.target.value })}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-accent outline-none font-semibold"
                    placeholder="300m / 800m / 1500m..."
                  />
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-2">
                  <label htmlFor="load_description" className="text-[11px] font-black text-slate-600 uppercase tracking-widest">
                    Mô tả hệ thống / sự cố (nếu có)
                  </label>

                  <textarea
                    id="load_description"
                    name="load_description"
                    rows={4}
                    value={formData.load_description}
                    onChange={e => setFormData({ ...formData, load_description: e.target.value })}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-accent outline-none font-semibold"
                    placeholder="Âm nhỏ ở cuối tuyến, biến áp cũ hay quá nhiệt..."
                  />
                </div>

                {/* SUBMIT */}
                <button
                  disabled={status === 'submitting'}
                  type="submit"
                  className="w-full py-6 bg-accent text-white rounded-2xl font-black text-lg uppercase tracking-wider hover:brightness-110 transition-all shadow-2xl disabled:opacity-50"
                >
                  {status === 'submitting'
                    ? 'Đang tính công suất hệ thống...'
                    : 'Nhận cấu hình & báo giá trong 2 giờ'}
                </button>

                {status === 'error' && (
                  <p className="text-center text-red-600 font-semibold">
                    Không gửi được yêu cầu. Vui lòng thử lại hoặc gọi hotline kỹ thuật.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
