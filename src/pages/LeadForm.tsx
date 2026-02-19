import React from 'react';
import { Mail, Phone, Building2, Upload, Send, CheckCircle2, AlertCircle } from 'lucide-react';

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
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Gửi yêu cầu thành công!</h1>
        <p className="text-slate-600 mb-8">
          Kỹ sư của IPS đã nhận được yêu cầu báo giá của bạn. Chúng tôi sẽ phân tích thông số và phản hồi lại trong vòng 2 giờ làm việc.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all"
        >
          Gửi thêm yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Yêu cầu báo giá kỹ thuật</h1>
          <p className="text-lg text-slate-600 mb-12">
            Vui lòng cung cấp thông số tải hoặc bản vẽ kỹ thuật. Đội ngũ kỹ sư của chúng tôi sẽ tư vấn giải pháp tối ưu về công suất và chi phí cho nhà máy của bạn.
          </p>

          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Hotline Kỹ thuật</h3>
                <p className="text-slate-600">0900-123-456 (Hỗ trợ 24/7)</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 shrink-0">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Email tiếp nhận</h3>
                <p className="text-slate-600">baogia@ips-power.vn</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 shrink-0">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Văn phòng & Nhà xưởng</h3>
                <p className="text-slate-600">Khu Công Nghiệp Quang Minh, Mê Linh, Hà Nội</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-emerald-600" /> Hồ sơ yêu cầu
            </h4>
            <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
              <li>Ảnh tem nhãn (Nameplate) thiết bị.</li>
              <li>Sơ đồ đơn tuyến hoặc bản vẽ tủ điện.</li>
              <li>Mô tả hiện trạng điện lưới (sụt áp, nhiễu, lệch pha).</li>
            </ul>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tên công ty / Đơn vị *</label>
                <input
                  required
                  type="text"
                  value={formData.company_name}
                  onChange={e => setFormData({ ...formData, company_name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="Cty TNHH..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Số điện thoại *</label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="09xx xxx xxx"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Email nhận báo giá</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="email@company.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Ứng dụng</label>
                <input
                  type="text"
                  value={formData.application}
                  onChange={e => setFormData({ ...formData, application: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="Máy CNC, Solar, Nhà máy..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Công suất (kVA)</label>
                <input
                  type="text"
                  value={formData.kva}
                  onChange={e => setFormData({ ...formData, kva: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="50kVA, 250kVA..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Điện áp vào (V)</label>
                <input
                  type="text"
                  value={formData.voltage_in}
                  onChange={e => setFormData({ ...formData, voltage_in: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="380V, 22kV..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Điện áp ra (V)</label>
                <input
                  type="text"
                  value={formData.voltage_out}
                  onChange={e => setFormData({ ...formData, voltage_out: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="200V, 220V, 380V..."
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Mô tả tải / Yêu cầu đặc biệt</label>
              <textarea
                rows={3}
                value={formData.load_description}
                onChange={e => setFormData({ ...formData, load_description: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="Mô tả thiết bị hoặc tình trạng điện hiện tại..."
              ></textarea>
            </div>

            <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl text-center">
              <Upload className="h-8 w-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500 mb-2">Tải lên bản vẽ hoặc ảnh tem máy</p>
              <button type="button" className="text-xs font-bold text-emerald-600 uppercase tracking-widest hover:text-emerald-700">Chọn tệp tin</button>
            </div>

            <button
              disabled={status === 'submitting'}
              type="submit"
              className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {status === 'submitting' ? 'Đang gửi...' : 'Gửi yêu cầu báo giá'} <Send className="h-5 w-5" />
            </button>
            
            {status === 'error' && (
              <p className="text-center text-red-600 text-sm font-medium">Có lỗi xảy ra, vui lòng thử lại sau hoặc gọi hotline.</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
