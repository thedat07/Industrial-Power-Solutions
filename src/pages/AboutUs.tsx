import React from 'react';
import { ShieldCheck, Target, Users, CheckCircle2, Zap, MapPin, Phone, Mail } from 'lucide-react';

export function AboutUs() {
  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero */}
      <section className="bg-primary py-32 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter leading-tight">
              Hành trình <span className="text-accent">15 năm</span> <br />
              Kiến tạo giá trị điện năng
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed font-medium">
              IPS không chỉ sản xuất thiết bị điện, chúng tôi cung cấp sự an tâm và ổn định cho hàng ngàn dây chuyền sản xuất trên khắp Việt Nam.
            </p>
          </div>
        </div>
        <Zap className="absolute -right-20 -bottom-20 h-96 w-96 text-white/5 rotate-12" />
      </section>

      {/* Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Chất lượng là cốt lõi', desc: 'Mọi sản phẩm đều đạt chuẩn IEC, TCVN và được test tải 100% trước khi xuất xưởng.', icon: ShieldCheck },
            { title: 'Kỹ thuật là thế mạnh', desc: 'Đội ngũ kỹ sư giàu kinh nghiệm, sẵn sàng giải quyết mọi bài toán điện năng phức tạp.', icon: Target },
            { title: 'Khách hàng là trọng tâm', desc: 'Hỗ trợ kỹ thuật 24/7, bảo hành tận nơi nhanh chóng trong vòng 2-4 giờ.', icon: Users },
          ].map((val, i) => (
            <div key={i} className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-slate-100 group hover:border-accent transition-all">
              <div className="p-5 bg-slate-50 rounded-2xl text-accent mb-8 group-hover:bg-orange-50 transition-colors inline-block">
                <val.icon className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">{val.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* History & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <img src="https://picsum.photos/seed/factory-history/800/1000" alt="Nhà máy IPS" className="rounded-[3rem] shadow-2xl border-8 border-slate-50" referrerPolicy="no-referrer" />
            <div className="absolute -bottom-10 -right-10 bg-primary text-white p-12 rounded-[2.5rem] shadow-2xl border-4 border-white/10">
              <div className="text-5xl font-black mb-2 text-accent">2009</div>
              <div className="text-xs font-black uppercase tracking-widest text-slate-400">Năm thành lập</div>
            </div>
          </div>
          <div className="space-y-10">
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Tầm nhìn & Sứ mệnh</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">Trở thành nhà sản xuất hàng đầu</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">Khẳng định vị thế thương hiệu Việt trong lĩnh vực thiết bị điện công nghiệp, thay thế hàng nhập khẩu bằng chất lượng tương đương và giá thành tối ưu.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">Đồng hành cùng sự phát triển</h4>
                  <p className="text-slate-500 font-medium leading-relaxed">Cung cấp giải pháp điện năng ổn định, giúp các doanh nghiệp sản xuất tối ưu hóa hiệu suất và giảm thiểu rủi ro hư hỏng thiết bị.</p>
                </div>
              </div>
            </div>
            <div className="p-10 bg-slate-50 rounded-[2.5rem] border-2 border-slate-100">
              <p className="text-lg text-slate-600 font-bold italic leading-relaxed">
                "Chúng tôi tin rằng một nền sản xuất mạnh mẽ bắt đầu từ một nguồn điện ổn định. IPS cam kết là người gác cổng tin cậy cho hệ thống điện của bạn."
              </p>
              <div className="mt-6 font-black text-slate-900 uppercase tracking-widest text-xs">— Ban Giám Đốc IPS</div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-slate-50 py-32 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-16 uppercase tracking-tighter">Chứng nhận & Giải thưởng</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { name: 'ISO 9001:2015', img: 'https://picsum.photos/seed/iso/300/300' },
              { name: 'Hàng VN Chất Lượng Cao', img: 'https://picsum.photos/seed/award1/300/300' },
              { name: 'Quatest 3 Certified', img: 'https://picsum.photos/seed/award2/300/300' },
              { name: 'Top 100 Thương Hiệu', img: 'https://picsum.photos/seed/award3/300/300' },
            ].map((cert, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-square bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex items-center justify-center group hover:border-accent transition-all">
                  <img src={cert.img} alt={cert.name} className="max-w-full grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                </div>
                <div className="text-xs font-black text-slate-900 uppercase tracking-widest">{cert.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-4xl font-black mb-10 uppercase tracking-tighter">Kết nối với IPS</h2>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-white/10 rounded-2xl text-accent">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Trụ sở chính</div>
                    <div className="text-lg font-bold">KCN Quang Minh, Mê Linh, Hà Nội</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-white/10 rounded-2xl text-accent">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Hotline Kỹ thuật</div>
                    <div className="text-lg font-bold">0900-123-456</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-white/10 rounded-2xl text-accent">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Email báo giá</div>
                    <div className="text-lg font-bold">baogia@ips-power.vn</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md rounded-[2.5rem] p-10 border border-white/10">
              <h3 className="text-2xl font-black mb-8 uppercase tracking-tight">Gửi lời nhắn</h3>
              <form className="space-y-4">
                <input type="text" placeholder="Họ và tên" className="w-full px-6 py-4 bg-white/10 border border-white/10 rounded-xl outline-none focus:border-accent font-bold" />
                <input type="email" placeholder="Email" className="w-full px-6 py-4 bg-white/10 border border-white/10 rounded-xl outline-none focus:border-accent font-bold" />
                <textarea placeholder="Nội dung" className="w-full px-6 py-4 bg-white/10 border border-white/10 rounded-xl outline-none focus:border-accent font-bold" rows={4}></textarea>
                <button className="w-full py-5 bg-accent text-white rounded-xl font-black uppercase text-xs tracking-widest hover:brightness-110 transition-all">Gửi tin nhắn</button>
              </form>
            </div>
          </div>
          <Zap className="absolute -right-20 -bottom-20 h-96 w-96 text-white/5 rotate-12" />
        </div>
      </section>
    </div>
  );
}
