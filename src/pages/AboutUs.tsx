import React from 'react';
import { ShieldCheck, Target, Users, CheckCircle2, Zap, MapPin, Phone, Mail } from 'lucide-react';
import { ADDRESS, EMAIL, JsonLd, rootSchema, TELEPHONE, TELEPHONE_TEXT } from '../components/SEO';

export function AboutUs() {
  return (
    <div className="bg-white min-h-screen pb-24">
      <JsonLd data={rootSchema} />
      <section
        className="bg-primary py-32 text-white relative overflow-hidden"
        aria-labelledby="gioi-thieu-cong-ty-dien-cong-nghiep"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">

            <header>
              <h1
                id="gioi-thieu-cong-ty-dien-cong-nghiep"
                className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter leading-tight"
              >
                Đơn vị kỹ thuật điện công nghiệp <span className="text-accent">15 năm kinh nghiệm</span>
              </h1>
            </header>

            <p className="text-xl text-slate-200 leading-relaxed font-medium mb-6">
              Chúng tôi chuyên phân tích và xử lý các vấn đề
              <strong> sụt áp nhà xưởng</strong>,
              <strong> quá dòng khởi động</strong>,
              <strong> mất cân bằng pha</strong> và
              <strong> nguồn cấp không đủ công suất</strong>
              cho dây chuyền sản xuất.
            </p>

            <p className="text-lg text-slate-400 leading-relaxed">
              Giải pháp bao gồm thiết kế cấp nguồn, lựa chọn biến áp, ổn áp và tách tải
              nhằm đảm bảo máy CNC, máy ép, máy hàn và motor công suất lớn vận hành ổn định.
            </p>

          </div>
        </div>

        <Zap className="absolute -right-20 -bottom-20 h-96 w-96 text-white/5 rotate-12" aria-hidden="true" />
      </section>

      {/* Core Values */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20"
        aria-labelledby="nang-luc-ky-thuat"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {[
            {
              title: 'Kiểm tra tải thực tế trước khi bàn giao',
              desc: 'Tất cả biến áp và tủ điện được chạy tải 80–100% để đo điện áp, nhiệt độ và độ sụt áp theo tiêu chuẩn IEC/TCVN.',
              icon: ShieldCheck
            },
            {
              title: 'Phân tích nguyên nhân sự cố điện',
              desc: 'Kỹ sư đo điện áp khi máy hoạt động, tính dòng khởi động và đánh giá khả năng cấp nguồn trước khi đề xuất thiết bị.',
              icon: Target
            },
            {
              title: 'Hỗ trợ xử lý sự cố tại xưởng',
              desc: 'Kiểm tra hiện tượng nhảy aptomat, motor nóng hoặc CNC lỗi điện áp trực tiếp tại hệ thống đang vận hành.',
              icon: Users
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
        aria-labelledby="lich-su-don-vi-dien-cong-nghiep"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* IMAGE */}
          <div className="relative">
            <img
              src="https://rbyjreoslnnhqcuyoptq.supabase.co/storage/v1/object/sign/image/BienAp_1.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85YjZkYTZiMi1mYjE1LTRlYWItYTZlNS0zYTUyZTc2ZmM5NGYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZS9CaWVuQXBfMS5qcGciLCJpYXQiOjE3NzE3NTY0MjAsImV4cCI6MTgwMzI5MjQyMH0.1Xuy0aU2pECZjrNfyj57lGSsDgWo4XU7MvviqdhAkkg"
              alt="Khu vực lắp ráp và kiểm tra thiết bị điện công nghiệp"
              className="rounded-[3rem] shadow-2xl border-8 border-slate-50"
              referrerPolicy="no-referrer"
            />

            <div className="absolute -bottom-10 -right-10 bg-primary text-white p-12 rounded-[2.5rem] shadow-2xl border-4 border-white/10">
              <div className="text-5xl font-black mb-2 text-accent">2009</div>
              <div className="text-xs font-black uppercase tracking-widest text-slate-400">
                Bắt đầu hoạt động kỹ thuật điện công nghiệp
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="space-y-10">

            <header>
              <h2
                id="lich-su-don-vi-dien-cong-nghiep"
                className="text-4xl font-black text-slate-900 uppercase tracking-tighter"
              >
                Quá trình hoạt động & phạm vi kỹ thuật
              </h2>
            </header>

            <div className="space-y-8 text-slate-600 leading-relaxed">

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-accent" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">
                    Thiết kế và lắp đặt hệ thống cấp nguồn
                  </h3>
                  <p>
                    Tính toán công suất biến áp, tiết diện dây dẫn và vị trí đặt tủ điện
                    nhằm hạn chế sụt áp và quá dòng khởi động cho máy sản xuất.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-accent" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">
                    Phân tích sự cố điện trong quá trình vận hành
                  </h3>
                  <p>
                    Đo điện áp khi tải thay đổi, kiểm tra mất cân bằng pha,
                    đánh giá nguyên nhân gây nóng motor, lỗi CNC hoặc nhảy aptomat.
                  </p>
                </div>
              </div>

            </div>

            <aside className="p-10 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100">
              <p className="text-lg text-slate-700 font-medium leading-relaxed">
                Hoạt động tập trung vào môi trường nhà xưởng sản xuất:
                cơ khí, nhựa, bao bì, gỗ, thực phẩm và gia công kim loại —
                nơi yêu cầu nguồn điện ổn định để tránh dừng dây chuyền.
              </p>
              <div className="mt-6 font-black text-slate-900 uppercase tracking-widest text-xs">
                Phạm vi ứng dụng thực tế
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* Certifications */}
      <section
        className="bg-slate-50 py-32 border-y border-slate-200"
        aria-labelledby="chung-nhan-thiet-bi-dien"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <header>
            <h2
              id="chung-nhan-thiet-bi-dien"
              className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter"
            >
              Tiêu chuẩn kiểm tra & chứng nhận kỹ thuật
            </h2>

            <p className="text-slate-600 max-w-3xl mx-auto mb-16 leading-relaxed">
              Thiết bị và hệ thống điện được kiểm tra theo tiêu chuẩn an toàn,
              độ bền cách điện và khả năng chịu tải trước khi đưa vào vận hành.
            </p>
          </header>

          <ul className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              {
                name: "ISO 9001:2015",
                desc: "Quy trình quản lý chất lượng trong sản xuất và kiểm tra thiết bị điện"
              },
              {
                name: "Quatest 3",
                desc: "Kiểm định thông số điện và độ an toàn vận hành"
              },
              {
                name: "Kiểm tra tải thực tế",
                desc: "Chạy tải 100% công suất trước khi lắp đặt"
              },
              {
                name: "Đo điện áp vận hành",
                desc: "Đánh giá sụt áp và mất cân bằng pha tại hiện trường"
              },
            ].map((cert, i) => (
              <li key={i} className="space-y-4">

                <div className="aspect-square bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex items-center justify-center">
                  <span className="text-3xl font-black text-slate-300">
                    {cert.name}
                  </span>
                </div>

                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                  {cert.name}
                </h3>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {cert.desc}
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
                Liên hệ tư vấn hệ thống điện công nghiệp
              </h2>

              <div className="space-y-8">

                {/* ADDRESS */}
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-white/10 rounded-2xl text-accent">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">
                      Nhà máy sản xuất
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
                      Hotline kỹ thuật
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
                      Email báo giá
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(EMAIL);
                        alert("Đã copy email!");
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
                Gửi thông số máy để kiểm tra sụt áp
              </h3>

              <form className="space-y-4">

                <div>
                  <label className="sr-only">Họ và tên</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Họ và tên"
                    className="w-full px-6 py-4 bg-white/10 border border-white/10 rounded-xl outline-none focus:border-accent font-bold"
                  />
                </div>

                <div>
                  <label className="sr-only">Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full px-6 py-4 bg-white/10 border border-white/10 rounded-xl outline-none focus:border-accent font-bold"
                  />
                </div>

                <div>
                  <label className="sr-only">Thông số máy</label>
                  <textarea
                    name="message"
                    placeholder="Công suất máy (kW), khoảng cách dây (m), hiện tượng gặp phải..."
                    className="w-full px-6 py-4 bg-white/10 border border-white/10 rounded-xl outline-none focus:border-accent font-bold"
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-accent text-white rounded-xl font-black uppercase text-xs tracking-widest hover:brightness-110 transition-all"
                >
                  Gửi yêu cầu kiểm tra miễn phí
                </button>

              </form>
            </div>
          </div>

          <Zap className="absolute -right-20 -bottom-20 h-96 w-96 text-white/5 rotate-12" />
        </div>
      </section>
    </div>
  );
}
