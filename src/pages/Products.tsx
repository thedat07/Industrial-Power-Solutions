import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Filter, Table, Settings } from 'lucide-react';
import { JsonLd } from '@/src/components/SEO';

export function Products() {
  const [products, setProducts] = React.useState<any[]>([]);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Filters
  const cat = searchParams.get('cat') || '';
  const power = searchParams.get('power') || '';
  const vin = searchParams.get('vin') || '';
  const vout = searchParams.get('vout') || '';

  React.useEffect(() => {
    fetch('/api/categories').then(res => res.json()).then(setCategories);
  }, []);

  React.useEffect(() => {
    const params = new URLSearchParams();
    if (cat) params.append('category', cat);
    if (power) params.append('power_max', power);
    if (vin) params.append('voltage_in', vin);
    if (vout) params.append('voltage_out', vout);
    
    fetch(`/api/products?${params.toString()}`)
      .then(res => res.json())
      .then(setProducts);
  }, [cat, power, vin, vout]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": products.map((p, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "url": `${window.location.origin}/san-pham/${p.slug}`
        }))
      }} />

      {/* SEO Header */}
      <section className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Sản phẩm máy biến áp – ổn áp – tủ điện công nghiệp</h1>
          <div className="prose prose-slate max-w-4xl text-slate-600">
            <p>
              IPS tự hào là nhà cung cấp hàng đầu các thiết bị điện công nghiệp chất lượng cao. Chúng tôi chuyên sản xuất và phân phối các dòng máy biến áp 3 pha, ổn áp servo, biến áp trung thế và hạ thế đạt tiêu chuẩn IEC và TCVN. Với dải công suất rộng từ 10kVA đến 2500kVA, các sản phẩm của IPS được tin dùng trong các nhà máy sản xuất, khu công nghiệp và các dự án năng lượng tái tạo trên toàn quốc.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Filter Sidebar */}
          <aside className="space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Filter className="h-4 w-4" /> Bộ lọc kỹ thuật
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-3">Loại thiết bị</label>
                  <select 
                    value={cat} 
                    onChange={e => updateFilter('cat', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500"
                  >
                    <option value="">Tất cả</option>
                    {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-3">Công suất tối đa (kVA)</label>
                  <input 
                    type="range" 
                    min="10" 
                    max="2500" 
                    step="10"
                    value={power || 2500}
                    onChange={e => updateFilter('power', e.target.value)}
                    className="w-full accent-emerald-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-2">
                    <span>10kVA</span>
                    <span className="text-emerald-600">{power || '2500'}kVA</span>
                    <span>2500kVA</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-3">Điện áp vào</label>
                  <select 
                    value={vin} 
                    onChange={e => updateFilter('vin', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500"
                  >
                    <option value="">Tất cả</option>
                    <option value="380V">380V</option>
                    <option value="22kV">22kV</option>
                    <option value="35kV">35kV</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-3">Điện áp ra</label>
                  <select 
                    value={vout} 
                    onChange={e => updateFilter('vout', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500"
                  >
                    <option value="">Tất cả</option>
                    <option value="200V/220V">200V/220V</option>
                    <option value="380V">380V</option>
                    <option value="400V">400V</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl text-white">
              <h4 className="font-bold mb-4">Tư vấn kỹ thuật?</h4>
              <p className="text-xs text-slate-400 mb-6">Kỹ sư của chúng tôi sẵn sàng hỗ trợ bạn tính toán công suất phù hợp.</p>
              <Link to="/gui-thong-so" className="block w-full py-3 bg-emerald-600 text-center rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all">
                Gửi yêu cầu ngay
              </Link>
            </div>
          </aside>

          {/* Product List */}
          <main className="lg:col-span-3 space-y-12">
            {/* Category Cards (if no specific category selected) */}
            {!cat && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map(c => (
                  <Link key={c.id} to={`/san-pham?cat=${c.slug}`} className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-emerald-500 transition-all flex items-center justify-between shadow-sm">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{c.name}</h3>
                      <p className="text-sm text-slate-500 mt-2">Dải công suất 10kVA - 2500kVA</p>
                    </div>
                    <ArrowRight className="h-6 w-6 text-slate-300 group-hover:text-emerald-600 transition-all" />
                  </Link>
                ))}
              </div>
            )}

            {/* Model Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-slate-900">Danh sách Model phù hợp</h3>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Tìm thấy {products.length} sản phẩm</div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                      <th className="px-6 py-4">Model / Tên sản phẩm</th>
                      <th className="px-6 py-4">Công suất</th>
                      <th className="px-6 py-4">Điện áp vào</th>
                      <th className="px-6 py-4">Điện áp ra</th>
                      <th className="px-6 py-4">Làm mát</th>
                      <th className="px-6 py-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {products.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-6 py-5">
                          <Link to={`/san-pham/${p.slug}`} className="font-bold text-slate-900 hover:text-emerald-600 transition-colors">
                            {p.name}
                          </Link>
                        </td>
                        <td className="px-6 py-5">
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded">{p.power_kva}kVA</span>
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-600">{p.input_voltage}</td>
                        <td className="px-6 py-5 text-sm text-slate-600">{p.output_voltage}</td>
                        <td className="px-6 py-5 text-sm text-slate-600">{p.cooling}</td>
                        <td className="px-6 py-5 text-right">
                          <Link to={`/san-pham/${p.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 opacity-0 group-hover:opacity-100 transition-all">
                            Chi tiết <ArrowRight className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Grid View for Visuals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {products.slice(0, 4).map(p => (
                <div key={p.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all">
                  <div className="aspect-video overflow-hidden">
                    <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{p.name}</h3>
                    <p className="text-sm text-slate-500 mb-6 line-clamp-2">{p.description}</p>
                    <Link to={`/san-pham/${p.slug}`} className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm">
                      Xem Datasheet & Bản vẽ <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <JsonLd data={generateProductSchema(product)} />
      {/* ... existing detail layout ... */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        <div>
          <div className="sticky top-24">
            <img src={product.image_url} alt={product.name} className="w-full rounded-3xl shadow-2xl" referrerPolicy="no-referrer" />
            <div className="grid grid-cols-2 gap-4 mt-6">
              <a href={product.catalog_url} className="flex items-center justify-center gap-2 py-4 bg-slate-100 text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-all">
                <Settings className="h-5 w-5" /> Catalogue PDF
              </a>
              <a href={product.drawing_url} className="flex items-center justify-center gap-2 py-4 bg-slate-100 text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-all">
                <Table className="h-5 w-5" /> Bản vẽ CAD
              </a>
            </div>
          </div>
        </div>
        
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{product.name}</h1>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">{product.description}</p>
          
          <div className="space-y-8 mb-12">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Thông số kỹ thuật (Datasheet)</h3>
              <div className="grid grid-cols-1 gap-4">
                {[
                  ['Công suất định mức', `${product.power_kva} kVA`],
                  ['Điện áp vào (Input)', product.input_voltage],
                  ['Điện áp ra (Output)', product.output_voltage],
                  ['Tổ đấu dây', product.wiring],
                  ['Kiểu làm mát', product.cooling],
                  ['Tiêu chuẩn chế tạo', product.standard],
                  ['Vật liệu cuộn dây', product.material],
                  ['Độ chính xác', product.accuracy],
                  ['Khả năng quá tải', product.overload],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between items-center py-3 border-b border-slate-200 last:border-0">
                    <span className="text-sm text-slate-500 font-medium">{label}</span>
                    <span className="text-sm text-slate-900 font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link to="/gui-thong-so" className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-emerald-600 text-white rounded-xl font-bold text-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200">
            Yêu cầu báo giá kỹ thuật <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function generateProductSchema(product: any) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.image_url,
    "description": product.seo_description || product.description,
    "brand": {
      "@type": "Brand",
      "name": "IPS"
    }
  };
}
