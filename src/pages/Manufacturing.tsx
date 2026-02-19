import React from 'react';
import { Factory, ShieldCheck, Award, CheckCircle2, Ruler, Thermometer, Zap } from 'lucide-react';

export function Manufacturing() {
  const [capacity, setCapacity] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/manufacturing').then(res => res.json()).then(setCapacity);
  }, []);

  return (
    <div className="pb-24 bg-white">
      {/* Hero */}
      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-tighter">Năng lực sản xuất & <br /><span className="text-accent">Quy trình chất lượng</span></h1>
            <p className="text-xl text-slate-400 leading-relaxed font-medium">
              Sở hữu hệ thống nhà xưởng hiện đại tại KCN Quang Minh, IPS làm chủ 100% quy trình sản xuất từ khâu quấn dây đến thử nghiệm xuất xưởng.
            </p>
          </div>
        </div>
        <Zap className="absolute -right-20 -bottom-20 h-96 w-96 text-white/5 rotate-12" />
      </section>

      {/* Factory Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Diện tích nhà xưởng', value: '5,000 m²', icon: Factory },
            { label: 'Công suất sản xuất', value: '5,000 kVA/tháng', icon: Zap },
            { label: 'Chứng chỉ chất lượng', value: 'ISO 9001:2015', icon: ShieldCheck },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-8">
              <div className="p-5 bg-slate-50 rounded-2xl text-accent">
                <stat.icon className="h-10 w-10" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{stat.label}</div>
                <div className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-24">
          <h2 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Quy trình sản xuất khép kín</h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">Mỗi sản phẩm IPS đều trải qua 7 bước kiểm soát nghiêm ngặt trước khi bàn giao cho khách hàng.</p>
        </div>
        
        <div className="space-y-32">
          {capacity.map((step, i) => (
            <div key={i} className={`flex flex-col lg:flex-row gap-20 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="lg:w-1/2">
                <div className="text-7xl font-black text-slate-100 mb-8 leading-none">0{step.sort_order}</div>
                <h3 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tight">{step.title}</h3>
                <p className="text-xl text-slate-600 leading-relaxed mb-10 font-medium">{step.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-center gap-3 text-slate-900 font-bold text-sm">
                    <CheckCircle2 className="h-5 w-5 text-accent" /> Kiểm soát sai số &lt; 1%
                  </div>
                  <div className="flex items-center gap-3 text-slate-900 font-bold text-sm">
                    <CheckCircle2 className="h-5 w-5 text-accent" /> Vật liệu nhập khẩu
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div className="relative">
                  <img src={step.image_url} alt={step.title} className="rounded-[3rem] shadow-2xl w-full aspect-video object-cover border-8 border-slate-50" referrerPolicy="no-referrer" />
                  <div className="absolute -bottom-6 -right-6 bg-accent text-white p-6 rounded-2xl shadow-xl font-black text-xs uppercase tracking-widest">
                    Step 0{step.sort_order}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QC Section */}
      <section className="bg-slate-50 py-32 industrial-grid border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-12 uppercase tracking-tighter">Hệ thống quản lý chất lượng (QC)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { icon: Ruler, title: 'Đo lường chính xác', desc: 'Sử dụng thiết bị đo chuẩn quốc tế, hiệu chuẩn định kỳ.' },
                  { icon: Thermometer, title: 'Kiểm tra phát nhiệt', desc: 'Thử nghiệm vận hành ở tải tối đa trong 24h.' },
                  { icon: ShieldCheck, title: 'Cách điện tuyệt đối', desc: 'Thử nghiệm phóng điện cao áp 2.5kV - 5kV.' },
                  { icon: Award, title: 'Chứng chỉ ISO', desc: 'Quy trình đạt chuẩn ISO 9001:2015 toàn diện.' },
                ].map((item, i) => (
                  <div key={i} className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm hover:border-accent transition-all">
                    <item.icon className="h-8 w-8 text-accent mb-6" />
                    <h4 className="font-black text-slate-900 mb-3 uppercase tracking-tight">{item.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src="https://picsum.photos/seed/qc-lab/800/600" alt="QC Laboratory" className="rounded-[3rem] shadow-2xl border-8 border-white" referrerPolicy="no-referrer" />
              <div className="absolute -bottom-10 -right-10 bg-primary text-white p-12 rounded-[2.5rem] shadow-2xl border-4 border-white/10">
                <div className="text-5xl font-black mb-2 text-accent">100%</div>
                <div className="text-xs font-black uppercase tracking-widest text-slate-500">Sản phẩm được test tải</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
