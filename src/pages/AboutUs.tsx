import React from 'react';
import { ShieldCheck, Target, Users, CheckCircle2, Zap, MapPin, Phone, Mail, RefreshCcw } from 'lucide-react';
import { ADDRESS, EMAIL, JsonLd, rootSchema, TELEPHONE, TELEPHONE_TEXT, YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_PUBLIC_KEY } from '../components/SEO';
import emailjs from '@emailjs/browser';

export function AboutUs() {

  const [status, setStatus] = React.useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (status === 'sending') return;

    setStatus('sending');

    try {
      const result = await emailjs.sendForm(
        YOUR_SERVICE_ID,
        YOUR_TEMPLATE_ID,
        e.currentTarget,
        YOUR_PUBLIC_KEY
      );

      console.log("Email sent:", result.text);
      setStatus('success');
      e.currentTarget.reset();

    } catch (error) {
      console.error("Email error:", error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <JsonLd data={rootSchema} />
      <section
        className="bg-primary py-32 text-white relative overflow-hidden"
        aria-labelledby="gioi-thieu-xuong-san-xuat-bien-ap-am-ly"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">

            <header>
              <h1
                id="gioi-thieu-xuong-san-xuat-bien-ap-am-ly"
                className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter leading-tight"
              >
                Xưởng sản xuất biến áp âm ly <span className="text-accent">15 năm kinh nghiệm</span>
              </h1>
            </header>

            <p className="text-xl text-slate-200 leading-relaxed font-medium mb-6">
              Chuyên sản xuất và gia công <strong>biến áp âm ly 70V / 100V</strong>
              cho hệ thống loa truyền thanh, trường học, nhà xưởng và khu dân cư.
            </p>

            <p className="text-lg text-slate-400 leading-relaxed">
              Nhận quấn biến áp theo công suất yêu cầu, hỗ trợ tính toán tổng công suất loa
              và cấu hình phù hợp nhằm đảm bảo hoạt động ổn định, bền bỉ lâu dài.
            </p>

          </div>
        </div>

        <Zap className="absolute -right-20 -bottom-20 h-96 w-96 text-white/5 rotate-12" aria-hidden="true" />
      </section>

      {/* Core Values */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20"
        aria-labelledby="nang-luc-san-xuat-bien-ap-am-ly"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {[
            {
              title: 'Chạy tải 100% công suất định mức',
              desc: 'Mỗi biến áp được vận hành đủ công suất trước khi bàn giao để đảm bảo ổn định và không quá nhiệt.',
              icon: ShieldCheck
            },
            {
              title: 'Tính toán công suất hệ thống loa',
              desc: 'Hỗ trợ xác định tổng công suất loa 70V / 100V để lựa chọn biến áp phù hợp, tránh quá tải.',
              icon: Target
            },
            {
              title: 'Gia công theo yêu cầu',
              desc: 'Nhận quấn biến áp theo công suất, điện áp và cấu hình đầu ra theo yêu cầu thực tế.',
              icon: Users
            },
            {
              title: 'Cam kết bảo hành trọn đời',
              desc: 'Sẵn sàng thu lại sửa chữa hoặc quấn lại khi sản phẩm gặp lỗi kỹ thuật do sản xuất.',
              icon: RefreshCcw
            },
          ].map((val, i) => (
            <article
              key={i}
              className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 group hover:border-accent transition-all"
            >
              <div className="p-5 bg-slate-50 rounded-2xl text-accent mb-8 group-hover:bg-orange-50 transition-colors inline-block">
                <val.icon className="h-10 w-10" aria-hidden="true" />
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">
                {val.title}
              </h3>

              <p className="text-slate-600 font-medium leading-relaxed">
                {val.desc}
              </p>
            </article>
          ))}

        </div>
      </section>

      {/* History & Vision */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32"
        aria-labelledby="lich-su-san-xuat-bien-ap-am-ly"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* IMAGE */}
          <div className="relative">
            <img
              src="https://rbyjreoslnnhqcuyoptq.supabase.co/storage/v1/object/sign/image/BienAp_1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YjZkYTZiMi1mYjE1LTRlYWItYTZlNS0zYTUyZTc2ZmM5NGYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZS9CaWVuQXBfMS5qcGciLCJpYXQiOjE3NzE3NTY0MjAsImV4cCI6MTgwMzI5MjQyMH0.1Xuy0aU2pECZjrNfyj57lGSsDgWo4XU7MvviqdhAkkg"
              alt="Khu vực quấn dây và lắp ráp biến áp âm ly"
              className="rounded-[3rem] shadow-2xl border-8 border-slate-50"
              referrerPolicy="no-referrer"
            />

            <div className="absolute -bottom-10 -right-10 bg-primary text-white p-12 rounded-[2.5rem] shadow-2xl border-4 border-white/10">
              <div className="text-5xl font-black mb-2 text-accent">1998</div>
              <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                Bắt đầu sản xuất biến áp âm ly
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="space-y-10">

            <header>
              <h2
                id="lich-su-san-xuat-bien-ap-am-ly"
                className="text-4xl font-black text-slate-900 uppercase tracking-tighter"
              >
                Quá trình hoạt động & phạm vi sản xuất
              </h2>
            </header>

            <div className="space-y-8 text-slate-600 leading-relaxed">

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-accent" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">
                    Sản xuất biến áp âm ly theo công suất yêu cầu
                  </h3>
                  <p>
                    Gia công biến áp 70V / 100V với nhiều mức công suất khác nhau,
                    phù hợp hệ thống loa truyền thanh, nhà xưởng, trường học và khu dân cư.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-accent" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">
                    Tính toán công suất & cấu hình phù hợp
                  </h3>
                  <p>
                    Hỗ trợ khách hàng xác định tổng công suất loa,
                    lựa chọn biến áp phù hợp để đảm bảo ổn định và tránh quá tải.
                  </p>
                </div>
              </div>

            </div>

            <aside className="p-10 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100">
              <p className="text-lg text-slate-700 font-medium leading-relaxed">
                Sản phẩm được sử dụng trong hệ thống loa truyền thanh xã/phường,
                trường học, nhà xưởng, nhà thờ và các khu vực cần phát thanh diện rộng.
              </p>
              <div className="mt-6 font-black text-slate-900 uppercase tracking-widest text-xs">
                Phạm vi ứng dụng thực tế
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Certifications */}
      {/* Quality Standards */}
      <section
        className="bg-slate-50 py-32 border-y border-slate-200"
        aria-labelledby="kiem-tra-chat-luong-bien-ap"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <header>
            <h2
              id="kiem-tra-chat-luong-bien-ap"
              className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter"
            >
              Kiểm tra chất lượng trước khi xuất xưởng
            </h2>

            <p className="text-slate-600 max-w-3xl mx-auto mb-16 leading-relaxed">
              Mỗi biến áp âm ly được kiểm tra điện áp đầu ra, công suất tải
              và độ an toàn cách điện nhằm đảm bảo vận hành ổn định trong hệ thống 70V / 100V.
            </p>
          </header>

          <ul className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              {
                name: "Đo điện áp đầu ra",
                desc: "Kiểm tra sai số điện áp 70V / 100V trước khi bàn giao"
              },
              {
                name: "Chạy tải công suất",
                desc: "Vận hành đủ công suất định mức để đảm bảo ổn định"
              },
              {
                name: "Đo cách điện",
                desc: "Kiểm tra an toàn giữa cuộn sơ cấp và thứ cấp"
              },
              {
                name: "Kiểm tra nhiệt độ",
                desc: "Đánh giá mức tăng nhiệt khi hoạt động liên tục"
              },
            ].map((item, i) => (
              <li key={i} className="space-y-4">

                <div className="aspect-square bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex items-center justify-center">
                  <span className="text-xl font-black text-slate-400 text-center">
                    {item.name}
                  </span>
                </div>

                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                  {item.name}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </p>

              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact Info */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32"
        id="lien-he"
      >
        <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">

            {/* CONTACT DETAILS */}
            <address className="not-italic">
              <h2 className="text-4xl font-black mb-10 uppercase tracking-tighter">
                Liên hệ tư vấn biến áp âm ly & hệ thống loa
              </h2>

              <div className="space-y-8">

                {/* ADDRESS */}
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-white/10 rounded-2xl text-accent">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">
                      Cơ sở sản xuất & bảo hành
                    </div>
                    <p className="text-lg font-bold">
                      {ADDRESS}
                    </p>
                  </div>
                </div>

                {/* PHONE */}
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-white/10 rounded-2xl text-accent">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">
                      Hotline tư vấn kỹ thuật
                    </div>
                    <a
                      href={`tel:${TELEPHONE}`}
                      className="text-lg font-bold hover:underline"
                    >
                      {TELEPHONE_TEXT}
                    </a>
                  </div>
                </div>

                {/* EMAIL */}
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-white/10 rounded-2xl text-accent">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">
                      Email nhận thông số & báo giá
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(EMAIL);
                        alert("Đã sao chép email!");
                      }}
                      className="text-lg font-bold hover:underline"
                    >
                      {EMAIL}
                    </button>
                  </div>
                </div>

              </div>
            </address>

            {/* CONTACT FORM */}
            <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-10 border border-white/10">
              <h3 className="text-2xl font-black mb-8 uppercase tracking-tight">
                Gửi thông tin vẫn đề
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="sr-only">Tên đơn vị / Công trình</label>
                  <input
                    name="company"
                    type="text"
                    placeholder="Tên đơn vị / Công trình"
                    className="w-full px-6 py-4 bg-white/10 border border-white/10 rounded-xl outline-none focus:border-accent font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="sr-only">Số điện thoại</label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Số điện thoại kỹ thuật"
                    className="w-full px-6 py-4 bg-white/10 border border-white/10 rounded-xl outline-none focus:border-accent font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="sr-only">Thông tin hệ thống</label>
                  <textarea
                    name="system_info"
                    placeholder="Số lượng loa, công suất mỗi loa (W), chiều dài tuyến dây..."
                    className="w-full px-6 py-4 bg-white/10 border border-white/10 rounded-xl outline-none focus:border-accent font-bold"
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-5 bg-accent text-white rounded-xl font-black uppercase text-xs tracking-widest hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {status === 'sending'
                    ? 'Đang gửi...'
                    : 'Gửi yêu cầu kiểm tra miễn phí'}
                </button>

                {status === 'success' && (
                  <p className="text-green-400 font-bold text-sm text-center">
                    ✅ Đã gửi thành công! Kỹ sư sẽ liên hệ sớm.
                  </p>
                )}

                {status === 'error' && (
                  <p className="text-red-400 font-bold text-sm text-center">
                    ❌ Gửi thất bại. Vui lòng thử lại.
                  </p>
                )}

              </form>
            </div>
          </div>

          <Zap className="absolute -right-20 -bottom-20 h-96 w-96 text-white/5 rotate-12" />
        </div>
      </section>
    </div>
  );
}
