import React from 'react';
import { Factory, ShieldCheck, Award, CheckCircle2, Ruler, Thermometer, Zap } from 'lucide-react';

export function Manufacturing() {
  const [capacity, setCapacity] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/manufacturing').then(res => res.json()).then(setCapacity);
  }, []);

  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-8">Năng lực sản xuất & <span className="text-emerald-500">Quy trình chất lượng</span></h1>
            <p className="text-xl text-slate-400 leading-relaxed">
              Với hệ thống nhà xưởng hiện đại và đội ngũ kỹ sư giàu kinh nghiệm, chúng tôi cam kết mang đến những sản phẩm thiết bị điện công nghiệp đạt tiêu chuẩn quốc tế.
            </p>
          </div>
        </div>
      </section>

      {/* Factory Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Diện tích nhà xưởng', value: '5,000 m²', icon: Factory },
            { label: 'Công suất sản xuất', value: '2,000 kVA/tháng', icon: Zap },
            { label: 'Đội ngũ kỹ sư', value: '50+ Nhân sự', icon: Award },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-6">
              <div className="p-4 bg-emerald-50 rounded-xl text-emerald-600">
                <stat.icon className="h-8 w-8" />
              </div>
              <div>
                <div className="text-sm text-slate-500 font-medium mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Quy trình sản xuất khép kín</h2>
          <p className="text-slate-600">Từ khâu nhập liệu đến xuất xưởng đều được kiểm soát nghiêm ngặt.</p>
        </div>
        
        <div className="space-y-24">
          {capacity.map((step, i) => (
            <div key={i} className={`flex flex-col lg:flex-row gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="lg:w-1/2">
                <div className="text-6xl font-black text-slate-100 mb-6">0{step.sort_order}</div>
                <h3 className="text-3xl font-bold text-slate-900 mb-6">{step.title}</h3>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">{step.description}</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Kiểm soát sai số kỹ thuật tuyệt đối.
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Sử dụng vật liệu cao cấp nhập khẩu.
                  </li>
                </ul>
              </div>
              <div className="lg:w-1/2">
                <img src={step.image_url} alt={step.title} className="rounded-3xl shadow-2xl w-full aspect-video object-cover" referrerPolicy="no-referrer" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QC Section */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Hệ thống quản lý chất lượng (QC)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Ruler, title: 'Đo lường chính xác', desc: 'Sử dụng thiết bị đo chuẩn quốc tế.' },
                  { icon: Thermometer, title: 'Kiểm tra nhiệt độ', desc: 'Thử nghiệm vận hành ở tải tối đa.' },
                  { icon: ShieldCheck, title: 'Cách điện tuyệt đối', desc: 'Thử nghiệm phóng điện cao áp.' },
                  { icon: Award, title: 'Chứng chỉ ISO', desc: 'Quy trình đạt chuẩn ISO 9001:2015.' },
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200">
                    <item.icon className="h-6 w-6 text-emerald-600 mb-4" />
                    <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src="https://picsum.photos/seed/qc-lab/800/600" alt="QC Laboratory" className="rounded-3xl shadow-xl" referrerPolicy="no-referrer" />
              <div className="absolute -bottom-6 -right-6 bg-emerald-600 text-white p-8 rounded-2xl shadow-xl">
                <div className="text-4xl font-bold mb-1">100%</div>
                <div className="text-xs font-bold uppercase tracking-widest">Sản phẩm được test tải</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
