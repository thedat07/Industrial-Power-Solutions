import React from 'react';
import { Mail, Phone, Building2, Upload, Send, CheckCircle2, AlertCircle, Zap } from 'lucide-react';

export function LeadForm() {
  const [status, setStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = React.useState({
    company_name: '',
    phone: '',
    email: '',
    load_description: '',
    voltage_in: '',
    voltage_out: '',
    kva: '',
    application: '',
  });

  const baseUrl = "https://ips-power.vn";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [

      {
        "@type": "Organization",
        "@id": `${baseUrl}#org`,
        "name": "IPS - Industrial Power Solutions",
        "url": baseUrl,
        "logo": `${baseUrl}/logo.png`,
        "contactPoint": [{
          "@type": "ContactPoint",
          "telephone": "+84-900-123-456",
          "contactType": "technical support",
          "areaServed": "VN",
          "availableLanguage": ["vi"]
        }]
      },

      {
        "@type": "Service",
        "@id": `${baseUrl}/tinh-cong-suat#service`,
        "name": "Tính công suất và chọn máy biến áp công nghiệp",
        "provider": { "@id": `${baseUrl}#org` },
        "areaServed": "Vietnam",
        "serviceType": "Electrical Engineering Consulting",
        "description": "Phân tích phụ tải, sụt áp, chọn kVA và cấu hình máy biến áp hoặc ổn áp công nghiệp theo tiêu chuẩn IEC/TCVN"
      },

      {
        "@type": "ContactPage",
        "@id": `${baseUrl}/tinh-cong-suat#contact`,
        "url": `${baseUrl}/tinh-cong-suat`,
        "name": "Gửi thông số tải điện để nhận báo giá",
        "about": { "@id": `${baseUrl}/tinh-cong-suat#service` },
        "inLanguage": "vi-VN"
      }

    ]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <main className="max-w-2xl mx-auto px-4 py-32 text-center">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        <header>
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl">
            <CheckCircle2 className="h-12 w-12" />
          </div>

          <h1 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tight">
            Đã nhận thông số tải điện
          </h1>

          <p className="text-lg text-slate-600 mb-6 font-medium leading-relaxed">
            Kỹ sư điện IPS đang phân tích công suất, dòng tải và điện áp hệ thống của bạn để lựa chọn đúng máy biến áp hoặc ổn áp công nghiệp.
          </p>

          <p className="text-slate-500 mb-12">
            Thời gian phản hồi tiêu chuẩn: <strong>trong vòng 2 giờ làm việc</strong>.
          </p>
        </header>

        {/* SEO INTERNAL LINKS */}
        <nav className="space-y-4 mb-16">
          <a href="/san-pham/may-bien-ap-3-pha" className="block text-accent font-bold hover:underline">
            Xem các dòng máy biến áp 3 pha
          </a>

          <a href="/kien-thuc" className="block text-accent font-bold hover:underline">
            Hướng dẫn chọn công suất máy biến áp
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
              Gửi thông số để tính công suất & báo giá máy biến áp
            </h1>

            <p className="text-xl text-slate-700 font-medium leading-relaxed">
              Điền điện áp đầu vào, điện áp đầu ra, công suất tải hoặc mô tả hệ thống điện.
              Kỹ sư IPS sẽ tính toán kVA phù hợp, kiểm tra sụt áp và đề xuất cấu hình thiết bị
              theo tiêu chuẩn IEC/TCVN cho nhà xưởng hoặc dây chuyền sản xuất của bạn.
            </p>

            <p className="mt-6 text-base text-slate-500 leading-relaxed">
              Áp dụng cho: máy CNC, máy ép nhựa, máy hàn, robot, thang máy, trạm sạc xe điện,
              hệ thống chiếu sáng và toàn bộ phụ tải công nghiệp.
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
                  <a href="tel:0900123456" className="text-2xl font-black text-slate-900 tracking-tight hover:text-accent transition-colors">
                    0900 123 456
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
                    Email nhận hồ sơ kỹ thuật
                  </h3>
                  <a href="mailto:baogia@ips-power.vn" className="text-2xl font-black text-slate-900 tracking-tight hover:text-accent transition-colors">
                    baogia@ips-power.vn
                  </a>
                  <p className="text-xs text-slate-400 font-bold uppercase mt-1">
                    Phản hồi trong 2 giờ làm việc
                  </p>
                </div>
              </div>

              {/* FACTORY */}
              <div className="flex gap-6 items-start">
                <div className="p-4 bg-white rounded-2xl text-accent shadow-lg border border-slate-100 shrink-0">
                  <Building2 className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-2">
                    Nhà máy sản xuất & bảo hành
                  </h3>
                  <p className="text-lg font-black text-slate-900 leading-tight">
                    KCN Quang Minh, Mê Linh, Hà Nội
                  </p>
                  <p className="text-xs text-slate-400 font-bold uppercase mt-1">
                    Có sẵn linh kiện & đội bảo trì tại chỗ
                  </p>
                </div>
              </div>

            </div>

            {/* REQUIREMENTS GUIDE */}
            <div className="p-10 bg-primary text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden">

              <h4 className="text-accent font-black uppercase text-xs tracking-widest mb-6 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Hồ sơ cần gửi để báo giá chính xác
              </h4>

              <p className="text-sm text-slate-300 mb-6 font-medium">
                Cung cấp càng đầy đủ → báo giá càng nhanh & đúng công suất (tránh chọn sai gây sụt áp / quá tải).
              </p>

              <ul className="text-sm text-slate-300 space-y-4 font-medium">

                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></div>
                  Ảnh tem nhãn (Nameplate) máy biến áp hoặc ổn áp hiện tại
                </li>

                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></div>
                  Sơ đồ đơn tuyến / bản vẽ tủ điện tổng (PDF hoặc CAD)
                </li>

                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></div>
                  Hiện tượng đang gặp: sụt áp, nhảy CB, nhiễu PLC, lỗi biến tần
                </li>

                <li className="flex gap-3">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></div>
                  Công suất tải dự kiến (kW / kVA) hoặc loại máy sử dụng
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
                      Tên công ty / Nhà máy *
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
                      placeholder="Công ty TNHH ABC"
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
                      placeholder="0988123456"
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
                    placeholder="kythuat@factory.com"
                  />
                </div>

                {/* APPLICATION + KVA */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                  <div className="space-y-2">
                    <label htmlFor="application" className="text-[11px] font-black text-slate-600 uppercase tracking-widest">
                      Ứng dụng / Dây chuyền
                    </label>

                    <input
                      id="application"
                      name="application"
                      value={formData.application}
                      onChange={e => setFormData({ ...formData, application: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-accent outline-none font-semibold"
                      placeholder="Máy CNC, Lò nhiệt, Solar, Trạm sạc EV..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="kva" className="text-[11px] font-black text-slate-600 uppercase tracking-widest">
                      Công suất dự kiến (kVA)
                    </label>

                    <input
                      id="kva"
                      name="kva"
                      inputMode="numeric"
                      value={formData.kva}
                      onChange={e => setFormData({ ...formData, kva: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-accent outline-none font-semibold"
                      placeholder="75 / 160 / 560..."
                    />
                  </div>
                </div>

                {/* VOLTAGE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                  <div className="space-y-2">
                    <label htmlFor="voltage_in" className="text-[11px] font-black text-slate-600 uppercase tracking-widest">
                      Điện áp vào
                    </label>

                    <input
                      id="voltage_in"
                      name="voltage_in"
                      value={formData.voltage_in}
                      onChange={e => setFormData({ ...formData, voltage_in: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-accent outline-none font-semibold"
                      placeholder="22kV / 380V"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="voltage_out" className="text-[11px] font-black text-slate-600 uppercase tracking-widest">
                      Điện áp ra
                    </label>

                    <input
                      id="voltage_out"
                      name="voltage_out"
                      value={formData.voltage_out}
                      onChange={e => setFormData({ ...formData, voltage_out: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-accent outline-none font-semibold"
                      placeholder="200V / 220V / 400V"
                    />
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div className="space-y-2">
                  <label htmlFor="load_description" className="text-[11px] font-black text-slate-600 uppercase tracking-widest">
                    Mô tả sự cố / yêu cầu
                  </label>

                  <textarea
                    id="load_description"
                    name="load_description"
                    rows={4}
                    value={formData.load_description}
                    onChange={e => setFormData({ ...formData, load_description: e.target.value })}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-accent outline-none font-semibold"
                    placeholder="Máy CNC bị reset khi khởi động spindle..."
                  />
                </div>

                {/* SUBMIT */}
                <button
                  disabled={status === 'submitting'}
                  type="submit"
                  className="w-full py-6 bg-accent text-white rounded-2xl font-black text-lg uppercase tracking-wider hover:brightness-110 transition-all shadow-2xl disabled:opacity-50"
                >
                  {status === 'submitting'
                    ? 'Đang phân tích thông số...'
                    : 'Nhận giải pháp & báo giá trong 2 giờ'}
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
