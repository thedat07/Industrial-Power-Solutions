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
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Gửi yêu cầu thành công!</h1>
        <p className="text-lg text-slate-600 mb-12 font-medium">
          Kỹ sư của IPS đã nhận được yêu cầu báo giá của bạn. Chúng tôi sẽ phân tích thông số kỹ thuật và phản hồi lại trong vòng 2 giờ làm việc.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="px-10 py-5 bg-primary text-white rounded-xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-all"
        >
          Gửi thêm yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <section className="bg-white border-b border-slate-200 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 uppercase tracking-tighter">Yêu cầu báo giá kỹ thuật (RFQ)</h1>
          <p className="text-xl text-slate-600 max-w-3xl font-medium leading-relaxed">
            Vui lòng cung cấp thông số tải hoặc bản vẽ kỹ thuật. Đội ngũ kỹ sư của chúng tôi sẽ tư vấn giải pháp tối ưu về công suất, tiêu chuẩn và chi phí cho nhà máy của bạn.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-10">
              <div className="flex gap-6">
                <div className="p-4 bg-white rounded-2xl text-accent shadow-lg border border-slate-100 shrink-0">
                  <Phone className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-2">Hotline Kỹ thuật</h3>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">0900-123-456</p>
                  <p className="text-xs text-slate-400 font-bold uppercase mt-1">Hỗ trợ 24/7 toàn quốc</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="p-4 bg-white rounded-2xl text-accent shadow-lg border border-slate-100 shrink-0">
                  <Mail className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-2">Email tiếp nhận</h3>
                  <p className="text-2xl font-black text-slate-900 tracking-tight">baogia@ips-power.vn</p>
                  <p className="text-xs text-slate-400 font-bold uppercase mt-1">Phản hồi trong 2 giờ</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="p-4 bg-white rounded-2xl text-accent shadow-lg border border-slate-100 shrink-0">
                  <Building2 className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-2">Nhà máy sản xuất</h3>
                  <p className="text-lg font-black text-slate-900 leading-tight">KCN Quang Minh, Mê Linh, Hà Nội</p>
                </div>
              </div>
            </div>

            <div className="p-10 bg-primary text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <h4 className="text-accent font-black uppercase text-xs tracking-widest mb-6 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" /> Hồ sơ yêu cầu báo giá
              </h4>
              <ul className="text-sm text-slate-300 space-y-4 font-medium">
                <li className="flex gap-3"><div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></div> Ảnh tem nhãn (Nameplate) thiết bị hiện tại.</li>
                <li className="flex gap-3"><div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></div> Sơ đồ đơn tuyến hoặc bản vẽ tủ điện tổng.</li>
                <li className="flex gap-3"><div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></div> Mô tả hiện trạng điện lưới (sụt áp, nhiễu).</li>
              </ul>
              <Zap className="absolute -right-10 -bottom-10 h-48 w-48 text-white/5 rotate-12" />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white border-2 border-slate-100 rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-slate-200/50">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Tên công ty / Đơn vị *</label>
                    <input
                      required
                      type="text"
                      value={formData.company_name}
                      onChange={e => setFormData({ ...formData, company_name: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent outline-none font-bold"
                      placeholder="Cty TNHH..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Số điện thoại *</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent outline-none font-bold"
                      placeholder="09xx xxx xxx"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email nhận báo giá</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent outline-none font-bold"
                    placeholder="email@company.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Ứng dụng</label>
                    <input
                      type="text"
                      value={formData.application}
                      onChange={e => setFormData({ ...formData, application: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent outline-none font-bold"
                      placeholder="Máy CNC, Solar, Nhà máy..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Công suất (kVA)</label>
                    <input
                      type="text"
                      value={formData.kva}
                      onChange={e => setFormData({ ...formData, kva: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent outline-none font-bold"
                      placeholder="50kVA, 250kVA..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Điện áp vào (V)</label>
                    <input
                      type="text"
                      value={formData.voltage_in}
                      onChange={e => setFormData({ ...formData, voltage_in: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent outline-none font-bold"
                      placeholder="380V, 22kV..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Điện áp ra (V)</label>
                    <input
                      type="text"
                      value={formData.voltage_out}
                      onChange={e => setFormData({ ...formData, voltage_out: e.target.value })}
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent outline-none font-bold"
                      placeholder="200V, 220V, 380V..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Mô tả tải / Yêu cầu đặc biệt</label>
                  <textarea
                    rows={4}
                    value={formData.load_description}
                    onChange={e => setFormData({ ...formData, load_description: e.target.value })}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent outline-none font-bold"
                    placeholder="Mô tả thiết bị hoặc tình trạng điện hiện tại..."
                  ></textarea>
                </div>

            <div className="p-10 border-4 border-dashed border-slate-100 rounded-[2.5rem] text-center group hover:border-accent transition-all relative">
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) alert(`Đã chọn tệp: ${file.name}. Trong thực tế, tệp này sẽ được tải lên server.`);
                }}
              />
              <Upload className="h-12 w-12 text-slate-200 mx-auto mb-4 group-hover:text-accent transition-colors" />
              <p className="text-sm text-slate-400 mb-4 font-bold">Tải lên bản vẽ hoặc ảnh tem máy (PDF, JPG, PNG)</p>
              <button type="button" className="px-6 py-2 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest group-hover:bg-accent group-hover:text-white transition-all">Chọn tệp tin</button>
            </div>

                <button
                  disabled={status === 'submitting'}
                  type="submit"
                  className="w-full py-6 bg-accent text-white rounded-2xl font-black text-xl uppercase tracking-tighter hover:brightness-110 transition-all shadow-2xl shadow-orange-900/20 flex items-center justify-center gap-4 disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Đang xử lý...' : 'Gửi yêu cầu báo giá'} <Send className="h-6 w-6" />
                </button>
                
                {status === 'error' && (
                  <p className="text-center text-red-600 text-sm font-black uppercase tracking-tight">Có lỗi xảy ra, vui lòng thử lại sau hoặc gọi hotline.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
