import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Zap, Layout, ArrowRight, Download, Info, AlertCircle } from 'lucide-react';

export function Products() {
  const [products, setProducts] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Danh mục thiết bị</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Chúng tôi không bán hàng theo catalog có sẵn. Mỗi thiết bị được cấu hình dựa trên đặc thù tải và điều kiện điện lưới thực tế của khách hàng.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          { title: 'Ổn áp công nghiệp', icon: Zap, desc: 'Ổn định điện áp tự động cho nhà xưởng, máy CNC, thang máy.', items: ['Dải rộng', 'Servo motor', 'Bù áp'] },
          { title: 'Biến áp hạ thế', icon: Settings, desc: 'Đổi nguồn cho máy nhập khẩu Nhật, Mỹ, Châu Âu.', items: ['Cách ly', 'Tự ngẫu', 'Chống nhiễu'] },
          { title: 'Tủ điện & Phụ kiện', icon: Layout, desc: 'Hệ thống bảo vệ, phân phối và giám sát điện năng.', items: ['Tủ ATS', 'Tủ bù', 'Giám sát từ xa'] },
        ].map((cat, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-emerald-500 transition-all">
            <cat.icon className="h-10 w-10 text-emerald-600 mb-6" />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{cat.title}</h2>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed">{cat.desc}</p>
            <ul className="space-y-2 mb-8">
              {cat.items.map((item, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-slate-700">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  {item}
                </li>
              ))}
            </ul>
            <button className="w-full py-3 border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all">
              Xem chi tiết loại thiết bị
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/san-pham/${product.slug}`}
            className="group flex flex-col md:flex-row bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all"
          >
            <div className="md:w-2/5 h-64 md:h-auto overflow-hidden">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-8 md:w-3/5">
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">{product.type}</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">{product.name}</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-xs">
                  <div className="text-slate-400 uppercase font-medium mb-1">Công suất</div>
                  <div className="text-slate-900 font-bold">{product.power_kva}</div>
                </div>
                <div className="text-xs">
                  <div className="text-slate-400 uppercase font-medium mb-1">Điện áp ra</div>
                  <div className="text-slate-900 font-bold">{product.output_voltage}</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 line-clamp-2 mb-6">{product.description}</p>
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                Xem thông số kỹ thuật <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ProductDetail({ slug }: { slug: string }) {
  const [product, setProduct] = React.useState<any>(null);

  React.useEffect(() => {
    fetch(`/api/products/${slug}`).then(res => res.json()).then(setProduct);
  }, [slug]);

  if (!product) return <div className="p-20 text-center">Đang tải...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <div>
          <img src={product.image_url} alt={product.name} className="w-full rounded-2xl shadow-lg" referrerPolicy="no-referrer" />
        </div>
        <div>
          <div className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-4">{product.type}</div>
          <h1 className="text-4xl font-bold text-slate-900 mb-6">{product.name}</h1>
          <p className="text-lg text-slate-600 mb-8">{product.description}</p>
          
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Info className="h-5 w-5 text-emerald-600" /> Khi nào cần dùng thiết bị này?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Dùng khi điện áp khu vực không đúng chuẩn máy, máy nhập khẩu khác điện áp hoặc cần cách ly nhiễu điện cho các thiết bị nhạy cảm như CNC, Laser.
            </p>
          </div>

          <Link to="/gui-thong-so" className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg">
            Gửi thông số tải để kỹ sư kiểm tra
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Thông số kỹ thuật chi tiết</h2>
          <div className="overflow-hidden border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-slate-200">
                {[
                  ['Công suất', product.power_kva],
                  ['Số pha', product.phase],
                  ['Điện áp vào', product.input_voltage],
                  ['Điện áp ra', product.output_voltage],
                  ['Độ chính xác', product.accuracy],
                  ['Khả năng quá tải', product.overload],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td className="px-6 py-4 font-medium text-slate-500 bg-slate-50 w-1/3">{label}</td>
                    <td className="px-6 py-4 text-slate-900 font-semibold">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Ứng dụng phù hợp</h2>
            <p className="text-slate-600 mb-4">{product.applications}</p>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex gap-4">
              <AlertCircle className="h-6 w-6 text-amber-600 shrink-0" />
              <div>
                <h4 className="font-bold text-amber-900 mb-1">Sai lầm thường gặp khi chọn</h4>
                <ul className="text-sm text-amber-800 list-disc list-inside space-y-1">
                  <li>Chọn đúng công suất kW nhưng thiếu kVA (không tính cosφ)</li>
                  <li>Không tính đến dòng khởi động của motor (thường gấp 3-5 lần)</li>
                  <li>Lắp đặt sau biến tần (Inverter) gây hỏng thiết bị</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 mb-6">Tài liệu kỹ thuật</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-all group">
                <span className="flex items-center gap-3 font-medium">
                  <Download className="h-5 w-5 text-slate-400 group-hover:text-emerald-600" /> Catalog PDF
                </span>
                <span className="text-xs text-slate-400">2.4 MB</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-all group">
                <span className="flex items-center gap-3 font-medium">
                  <Download className="h-5 w-5 text-slate-400 group-hover:text-emerald-600" /> Bản vẽ đấu nối
                </span>
                <span className="text-xs text-slate-400">1.1 MB</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 text-white">
            <h3 className="font-bold mb-4">Hỗ trợ kỹ thuật 24/7</h3>
            <p className="text-sm text-slate-400 mb-6">Kỹ sư của chúng tôi sẵn sàng giải đáp mọi thắc mắc về đấu nối và vận hành.</p>
            <div className="text-emerald-400 font-bold text-xl">0900-123-456</div>
          </div>
        </div>
      </div>
    </div>
  );
}
