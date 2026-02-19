import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Zap, AlertTriangle, Calculator, ArrowRight, Factory, Activity, Mail } from 'lucide-react';

export function Solutions() {
  const [solutions, setSolutions] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/solutions').then(res => res.json()).then(setSolutions);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Giải pháp theo ngành</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Mỗi ngành sản xuất có đặc thù về thiết bị và yêu cầu chất lượng điện khác nhau. Chúng tôi cung cấp giải pháp chuyên biệt thay vì thiết bị đại trà.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {solutions.map((sol) => (
          <Link
            key={sol.id}
            to={`/giai-phap/${sol.slug}`}
            className="group relative overflow-hidden rounded-3xl aspect-[16/9] bg-slate-900"
          >
            <img
              src={sol.image_url}
              alt={sol.industry}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <h2 className="text-3xl font-bold text-white mb-4">Giải pháp cho {sol.industry}</h2>
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                Xem chi tiết giải pháp <ArrowRight className="h-5 w-5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SolutionDetail() {
  const { slug } = useParams();
  const [solution, setSolution] = React.useState<any>(null);

  React.useEffect(() => {
    fetch(`/api/solutions/${slug}`).then(res => res.json()).then(setSolution);
  }, [slug]);

  if (!solution) return <div className="p-20 text-center">Đang tải...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Giải pháp nguồn điện cho <span className="text-emerald-600">{solution.industry}</span></h1>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="p-3 bg-red-50 rounded-xl shrink-0">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Sự cố thực tế</h3>
                <p className="text-slate-600">{solution.problem}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="p-3 bg-blue-50 rounded-xl shrink-0">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Nguyên nhân điện</h3>
                <p className="text-slate-600">{solution.cause}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img src={solution.image_url} alt={solution.industry} className="rounded-3xl shadow-2xl" referrerPolicy="no-referrer" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white border border-slate-200 rounded-2xl p-8">
          <Activity className="h-8 w-8 text-emerald-600 mb-4" />
          <h3 className="font-bold text-lg mb-2">Mức điện áp cho phép</h3>
          <p className="text-slate-600 text-sm">{solution.voltage_range}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-8">
          <Calculator className="h-8 w-8 text-emerald-600 mb-4" />
          <h3 className="font-bold text-lg mb-2">Cách tính công suất</h3>
          <p className="text-slate-600 text-sm">{solution.calculation}</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-8">
          <Factory className="h-8 w-8 text-emerald-600 mb-4" />
          <h3 className="font-bold text-lg mb-2">Sơ đồ lắp đặt chuẩn</h3>
          <p className="text-slate-600 text-sm">Lưới → Thiết bị ổn định → Tủ máy {solution.industry}</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Nhận tư vấn kỹ thuật cho {solution.industry}</h2>
          <p className="text-slate-600 mb-10">
            Kỹ sư của chúng tôi sẽ dựa trên thông số máy và tình trạng điện lưới khu vực của bạn để đề xuất cấu hình thiết bị phù hợp nhất.
          </p>
          <Link to="/gui-thong-so" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg">
            Gửi thông số máy ngay <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
