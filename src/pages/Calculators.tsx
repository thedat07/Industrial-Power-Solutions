import React from 'react';
import { Calculator, Info } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function Calculators() {
  const [type, setType] = React.useState<'power' | 'voltage-drop'>('power');
  const [inputs, setInputs] = React.useState({
    voltage: '380',
    current: '20',
    cosPhi: '0.85',
    loadType: 'motor',
    length: '50',
    wireSize: '6'
  });
  const [result, setResult] = React.useState<any>(null);

  const calculate = () => {
    if (type === 'power') {
      const v = parseFloat(inputs.voltage);
      const i = parseFloat(inputs.current);
      const cos = parseFloat(inputs.cosPhi);
      
      // S = sqrt(3) * V * I / 1000
      const kva = (Math.sqrt(3) * v * i) / 1000;
      const kw = kva * cos;
      
      // Recommendation: kva * safety factor
      const safetyFactor = inputs.loadType === 'motor' ? 2.0 : 1.5;
      const recommendedKva = kva * safetyFactor;

      setResult({
        kva: kva.toFixed(2),
        kw: kw.toFixed(2),
        recommended: Math.ceil(recommendedKva / 5) * 5, // Round to nearest 5
        explanation: inputs.loadType === 'motor' 
          ? 'Tải motor có dòng khởi động lớn (gấp 3-5 lần dòng định mức), do đó cần dự phòng công suất nguồn gấp 2 lần.'
          : 'Tải hỗn hợp cần dự phòng ít nhất 50% công suất để đảm bảo độ bền thiết bị và bù sụt áp.'
      });
    } else {
      // Simple voltage drop calculation (approximate)
      // deltaV = sqrt(3) * I * (R*cosPhi + X*sinPhi) * L
      // For simplicity, using a basic factor for copper wire
      const i = parseFloat(inputs.current);
      const l = parseFloat(inputs.length);
      const s = parseFloat(inputs.wireSize);
      const drop = (0.0175 * l * i) / s; // Basic R = rho * L / S
      const percent = (drop / parseFloat(inputs.voltage)) * 100;

      setResult({
        drop: drop.toFixed(2),
        percent: percent.toFixed(2),
        status: percent > 5 ? 'Nguy hiểm' : 'An toàn',
        recommendation: percent > 5 ? 'Cần tăng tiết diện dây dẫn hoặc lắp ổn áp bù áp tại đầu tải.' : 'Độ sụt áp nằm trong phạm vi cho phép.'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Công cụ tính toán kỹ thuật</h1>
        <p className="text-slate-600">Công cụ hỗ trợ kỹ sư tính toán nhanh công suất và sụt áp đường dây.</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
          <button
            onClick={() => { setType('power'); setResult(null); }}
            className={cn(
              "flex-1 py-3 text-sm font-bold rounded-lg transition-all",
              type === 'power' ? "bg-white text-accent shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            Tính công suất (kVA)
          </button>
          <button
            onClick={() => { setType('voltage-drop'); setResult(null); }}
            className={cn(
              "flex-1 py-3 text-sm font-bold rounded-lg transition-all",
              type === 'voltage-drop' ? "bg-white text-accent shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            Tính sụt áp dây dẫn
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Settings className="h-5 w-5 text-accent" /> Thông số đầu vào
            </h3>
            <div className="space-y-4">
              {type === 'power' ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Điện áp (V)</label>
                    <input
                      type="number"
                      value={inputs.voltage}
                      onChange={(e) => setInputs({ ...inputs, voltage: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Dòng điện (A)</label>
                    <input
                      type="number"
                      value={inputs.current}
                      onChange={(e) => setInputs({ ...inputs, current: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Hệ số công suất (cosφ)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={inputs.cosPhi}
                      onChange={(e) => setInputs({ ...inputs, cosPhi: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Loại tải</label>
                    <select
                      value={inputs.loadType}
                      onChange={(e) => setInputs({ ...inputs, loadType: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                    >
                      <option value="motor">Động cơ (Motor)</option>
                      <option value="heater">Điện trở (Nhiệt)</option>
                      <option value="mixed">Hỗn hợp</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Chiều dài dây (m)</label>
                    <input
                      type="number"
                      value={inputs.length}
                      onChange={(e) => setInputs({ ...inputs, length: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Dòng điện tải (A)</label>
                    <input
                      type="number"
                      value={inputs.current}
                      onChange={(e) => setInputs({ ...inputs, current: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tiết diện dây (mm²)</label>
                    <input
                      type="number"
                      value={inputs.wireSize}
                      onChange={(e) => setInputs({ ...inputs, wireSize: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                    />
                  </div>
                </>
              )}
              <button
                onClick={calculate}
                className="w-full py-4 bg-accent text-white rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-orange-900/10"
              >
                Tính toán kết quả
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {result ? (
              <div className="bg-slate-900 text-white rounded-2xl p-8 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-accent font-bold uppercase tracking-widest text-xs mb-6">Kết quả tính toán</h3>
                {type === 'power' ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-slate-400 text-xs mb-1">Công suất biểu kiến</div>
                        <div className="text-3xl font-bold">{result.kva} <span className="text-sm font-normal text-slate-500">kVA</span></div>
                      </div>
                      <div>
                        <div className="text-slate-400 text-xs mb-1">Công suất thực</div>
                        <div className="text-3xl font-bold">{result.kw} <span className="text-sm font-normal text-slate-500">kW</span></div>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-slate-800">
                      <div className="text-accent text-xs font-bold uppercase mb-2">Đề xuất thiết bị</div>
                      <div className="text-4xl font-bold mb-4">≥ {result.recommended} kVA</div>
                      <p className="text-sm text-slate-400 leading-relaxed">{result.explanation}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <div className="text-slate-400 text-xs mb-1">Độ sụt áp ước tính</div>
                      <div className="text-3xl font-bold">{result.drop} <span className="text-sm font-normal text-slate-500">V</span></div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-xs mb-1">Phần trăm sụt áp</div>
                      <div className={cn("text-3xl font-bold", result.status === 'Nguy hiểm' ? "text-red-400" : "text-accent")}>
                        {result.percent}%
                      </div>
                    </div>
                    <div className="pt-6 border-t border-slate-800">
                      <div className="text-slate-400 text-xs font-bold uppercase mb-2">Trạng thái: <span className={result.status === 'Nguy hiểm' ? "text-red-400" : "text-accent"}>{result.status}</span></div>
                      <p className="text-sm text-slate-400 leading-relaxed">{result.recommendation}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center">
                <Calculator className="h-12 w-12 text-slate-300 mb-4" />
                <p className="text-slate-500 text-sm">Nhập thông số và nhấn nút tính toán để xem kết quả đề xuất kỹ thuật.</p>
              </div>
            )}

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex gap-4">
              <Info className="h-6 w-6 text-amber-600 shrink-0" />
              <div className="text-sm text-amber-800">
                <p className="font-bold mb-1">Lưu ý kỹ thuật:</p>
                <p>Kết quả tính toán mang tính chất tham khảo dựa trên công thức lý thuyết. Trong thực tế cần xem xét thêm các yếu tố như nhiệt độ môi trường, sóng hài và đặc tính khởi động cụ thể của từng hãng máy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Settings(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
