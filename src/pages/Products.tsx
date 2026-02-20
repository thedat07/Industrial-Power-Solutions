import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Filter, Download, ShieldCheck } from 'lucide-react';
import { JsonLd } from '@/src/components/SEO';
import { supabase } from "@/src/lib/supabase";

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
    const loadCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*");

      if (error) {
        console.error("Load categories error:", error);
        setCategories([]);
        return;
      }

      setCategories(data ?? []);
    };

    loadCategories();
  }, []);

  React.useEffect(() => {
    const loadProducts = async () => {
      let query = supabase.from("products").select("*");

      if (cat) query = query.eq("category", cat);
      if (power) query = query.lte("power_max", power);
      if (vin) query = query.eq("voltage_in", vin);
      if (vout) query = query.eq("voltage_out", vout);

      const { data, error } = await query;

      if (error) {
        console.error("Load products error:", error);
        setProducts([]);
        return;
      }

      setProducts(data ?? []);
    };

    loadProducts();
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
              <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Filter className="h-4 w-4" /> Bộ lọc kỹ thuật
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-3">Loại thiết bị</label>
                  <select
                    value={cat}
                    onChange={e => updateFilter('cat', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-accent"
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
                    className="w-full accent-accent"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-bold mt-2">
                    <span>10kVA</span>
                    <span className="text-accent">{power || '2500'}kVA</span>
                    <span>2500kVA</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-3">Điện áp vào</label>
                  <select
                    value={vin}
                    onChange={e => updateFilter('vin', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-accent"
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
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-accent"
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
              <Link to="/gui-thong-so" className="block w-full py-3 bg-accent text-center rounded-xl font-bold text-sm hover:brightness-110 transition-all">
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
                  <Link key={c.id} to={`/san-pham?cat=${c.slug}`} className="group bg-white p-8 rounded-2xl border border-slate-200 hover:border-accent transition-all flex items-center justify-between shadow-sm">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-accent transition-colors">{c.name}</h3>
                      <p className="text-sm text-slate-500 mt-2">Dải công suất 10kVA - 2500kVA</p>
                    </div>
                    <ArrowRight className="h-6 w-6 text-slate-300 group-hover:text-accent transition-all" />
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
                          <Link to={`/san-pham/${p.slug}`} className="font-bold text-slate-900 hover:text-accent transition-colors">
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
                          <Link to={`/san-pham/${p.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-accent opacity-0 group-hover:opacity-100 transition-all">
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
                    <Link to={`/san-pham/${p.slug}`} className="inline-flex items-center gap-2 text-accent font-bold text-sm">
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
    <div className="bg-white min-h-screen">
      <JsonLd data={generateProductSchema(product)} />

      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <Link to="/" className="hover:text-accent">Trang chủ</Link>
            <ArrowRight className="h-3 w-3" />
            <Link to="/san-pham" className="hover:text-accent">Sản phẩm</Link>
            <ArrowRight className="h-3 w-3" />
            <span className="text-slate-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Media */}
          <div className="lg:col-span-7 space-y-8">
            <div className="aspect-square rounded-[3rem] overflow-hidden bg-slate-50 border border-slate-100 shadow-2xl">
              <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-tight flex items-center gap-2">
                  <Download className="h-5 w-5 text-accent" /> Tài liệu kỹ thuật
                </h3>
                <div className="space-y-3">
                  <a href={product.catalog_url} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-accent transition-all group">
                    <span className="text-xs font-bold text-slate-600 group-hover:text-accent">Catalogue PDF</span>
                    <Download className="h-4 w-4 text-slate-300 group-hover:text-accent" />
                  </a>
                  <a href={product.drawing_url} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-accent transition-all group">
                    <span className="text-xs font-bold text-slate-600 group-hover:text-accent">Bản vẽ CAD (2D/3D)</span>
                    <Download className="h-4 w-4 text-slate-300 group-hover:text-accent" />
                  </a>
                </div>
              </div>

              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-tight flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-accent" /> Cam kết chất lượng
                </h3>
                <ul className="space-y-2 text-xs text-slate-500 font-medium">
                  <li className="flex items-center gap-2"><ArrowRight className="h-3 w-3 text-accent" /> Bảo hành 24 tháng tận nơi</li>
                  <li className="flex items-center gap-2"><ArrowRight className="h-3 w-3 text-accent" /> Kiểm định Quatest 1/2/3</li>
                  <li className="flex items-center gap-2"><ArrowRight className="h-3 w-3 text-accent" /> Hỗ trợ kỹ thuật 24/7</li>
                </ul>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <h2 className="text-3xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Đặc điểm cấu tạo & Ưu điểm</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">{product.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-slate-950 text-white rounded-3xl">
                  <h4 className="text-accent font-black uppercase text-xs tracking-widest mb-4">Vật liệu chế tạo</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{product.material}. Lõi thép Silic định hướng độ từ thẩm cao, tổn hao thấp.</p>
                </div>
                <div className="p-8 bg-slate-950 text-white rounded-3xl">
                  <h4 className="text-accent font-black uppercase text-xs tracking-widest mb-4">Tiêu chuẩn áp dụng</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">Sản xuất và thử nghiệm theo tiêu chuẩn {product.standard}, đảm bảo vận hành an toàn trong môi trường khắc nghiệt.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Specs & CTA (Sticky) */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50">
                <h1 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tighter leading-tight">{product.name}</h1>

                <div className="space-y-1 mb-10">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Thông số kỹ thuật định mức</div>
                  <table className="w-full border-collapse">
                    <tbody className="divide-y divide-slate-100">
                      {[
                        ['Công suất', `${product.power_kva} kVA`],
                        ['Điện áp vào', product.input_voltage],
                        ['Điện áp ra', product.output_voltage],
                        ['Tổ đấu dây', product.wiring],
                        ['Làm mát', product.cooling],
                        ['Độ chính xác', product.accuracy],
                        ['Khả năng quá tải', product.overload],
                      ].map(([label, value]) => (
                        <tr key={label}>
                          <td className="py-4 pl-0 border-0 bg-transparent text-xs font-bold text-slate-500 uppercase tracking-tight">{label}</td>
                          <td className="py-4 pr-0 border-0 bg-transparent text-sm font-black text-slate-900 text-right">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-4">
                  <Link to="/gui-thong-so" className="w-full py-5 bg-accent text-white rounded-2xl font-black text-lg uppercase tracking-tighter hover:brightness-110 transition-all shadow-2xl shadow-orange-900/20 flex items-center justify-center gap-3">
                    Yêu cầu báo giá kỹ thuật <ArrowRight className="h-5 w-5" />
                  </Link>
                  <a href="tel:0900123456" className="w-full py-5 bg-primary text-white rounded-2xl font-black text-lg uppercase tracking-tighter hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                    Gọi tư vấn: 0900-123-456
                  </a>
                </div>
              </div>

              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Ứng dụng phù hợp</h4>
                <div className="flex flex-wrap gap-2">
                  {product.applications?.split(',').map((app: string) => (
                    <span key={app} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-600 uppercase tracking-widest">
                      {app.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
