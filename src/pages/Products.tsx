import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Filter, Download, ShieldCheck } from 'lucide-react';
import { BASE_URL, breadcrumbSchema, buildGraph, JsonLd, NAME_INFO, ORG_ID, pageSchema, productSchema, rootSchema, TELEPHONE, TELEPHONE_TEXT } from '@/src/components/SEO';
import { supabase } from "@/src/lib/supabase";

export function Products() {
  const [products, setProducts] = React.useState<any[]>([]);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [catMap, setCatMap] = React.useState<Record<string, number>>({});
  const [page, setPage] = React.useState(1);
  const pageSize = 20;
  const [total, setTotal] = React.useState(0);

  // Filters
  const cat = searchParams.get('cat') || '';
  const power = searchParams.get('power') || '';
  const vin = searchParams.get('line') || '';
  const vout = searchParams.get('imp') || '';
  const totalPages = Math.ceil(total / pageSize);

  React.useEffect(() => {
    setPage(1);
  }, [cat, power, vin, vout]);

  React.useEffect(() => {
    const loadCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id,slug,name");

      if (error) {
        console.error("Load categories error:", error);
        setCategories([]);
        return;
      }

      setCategories(data ?? []);

      // tạo map slug -> id
      const map: Record<string, number> = {};
      (data ?? []).forEach(c => map[c.slug] = c.id);
      setCatMap(map);
    };

    loadCategories();
  }, []);

  React.useEffect(() => {
    if (!Object.keys(catMap).length) return; // chờ categories load xong

    const loadProducts = async () => {

      let query = supabase
        .from("products")
        .select(`
        *,
        categories(name,slug)
      `, { count: "exact" });

      // ✅ FIX CAT FILTER
      if (cat && catMap[cat]) {
        query = query.eq("category_id", catMap[cat]);
      }

      if (power) query = query.lte("power_watt", Number(power));
      if (vin) query = query.eq("line_voltage", vin);
      if (vout) query = query.ilike("impedance", `%${vout}%`);

      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, error, count } = await query.range(from, to);

      if (error) {
        console.error(error);
        setProducts([]);
        return;
      }

      setProducts(data ?? []);
      setTotal(count ?? 0);
    };

    loadProducts();
  }, [cat, power, vin, vout, page, catMap]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value);
    else newParams.delete(key);
    setSearchParams(newParams);
  };

  const url = `${BASE_URL}/san-pham`;

  /* ================= COLLECTION PAGE ================= */

  const collectionPage = {
    ...pageSchema(url, `Biến áp amply & biến áp đổi nguồn quấn theo yêu cầu | ${NAME_INFO}`),
    "@type": ["CollectionPage", "Service"],
    description: `Danh mục biến áp amply, biến áp truyền thanh và biến áp đổi nguồn quấn theo yêu cầu cho hệ thống loa phường, trường học và dự án nông thôn mới.`,
    breadcrumb: { "@id": `${url}#breadcrumb` }
  };

  /* ================= BREADCRUMB ================= */

  const breadcrumb = breadcrumbSchema(url, [
    { name: "Trang chủ", url: BASE_URL },
    { name: "Sản phẩm", url }
  ]);

  /* ================= ITEM LIST ================= */

  const productList = {
    "@type": "OfferCatalog",
    "@id": `${url}#catalog`,
    name: "Danh mục biến áp quấn theo yêu cầu",
    itemListElement: products.map((p, i) => ({
      "@type": "Offer",
      position: i + 1,
      itemOffered: {
        "@type": ["Product", "Service"],
        "@id": `${BASE_URL}/san-pham/${p.slug}#product`,
        name: p.name,
        url: `${BASE_URL}/san-pham/${p.slug}`,
        provider: { "@id": ORG_ID },
        areaServed: "VN"
      }
    }))
  };

  /* ================= FINAL GRAPH ================= */

  const structuredData = buildGraph(
    ...rootSchema["@graph"],
    collectionPage,
    breadcrumb,
    productList
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      <JsonLd data={structuredData} />
      {/* SEO Header */}
      <section className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <h1 className="text-4xl font-bold text-slate-900 mb-6">
            Biến áp amply – biến áp truyền thanh – quấn theo yêu cầu
          </h1>

          <div className="prose prose-slate max-w-4xl text-slate-600">
            <p>
              {NAME_INFO} chuyên quấn và gia công <strong>biến áp amply</strong>,
              <strong> biến áp truyền thanh xã – thôn</strong> và
              <strong> biến áp đổi nguồn 100V – 110V – 220V</strong> theo thông số thực tế.
              Sản phẩm được thiết kế phù hợp cho hệ thống loa phường, trường học,
              khu dân cư và dự án nông thôn mới.
            </p>

            <p>
              Nhận quấn theo yêu cầu công suất, điện áp vào/ra và cấu hình tải.
              Hỗ trợ tính toán sụt áp đường dây và lựa chọn công suất phù hợp
              trước khi sản xuất.
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

                {/* Loại biến áp */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-3">
                    Loại biến áp
                  </label>
                  <select
                    value={cat}
                    onChange={e => updateFilter('cat', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                  >
                    <option value="">Tất cả</option>
                    {categories
                      .filter(c => !c.parent_id)
                      .map(c => (
                        <option key={c.id} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Công suất */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-3">
                    Công suất (W)
                  </label>
                  <select
                    value={power}
                    onChange={e => updateFilter('power', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-accent"
                  >
                    <option value="">Tất cả</option>
                    <option value="5">≤ 5W</option>
                    <option value="10">≤ 10W</option>
                    <option value="20">≤ 20W</option>
                    <option value="40">≤ 40W</option>
                    <option value="60">≤ 60W</option>
                    <option value="100">≤ 100W</option>
                  </select>
                </div>

                {/* Điện áp đường dây */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-3">
                    Điện áp đường dây
                  </label>
                  <select
                    value={vin}
                    onChange={e => updateFilter('line', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-accent"
                  >
                    <option value="">Tất cả</option>
                    <option value="100V">100V Line</option>
                    <option value="70V">70V Line</option>
                    <option value="4-8Ω">Loa trở kháng thấp</option>
                  </select>
                </div>

                {/* Trở kháng tải */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-3">
                    Trở kháng tải
                  </label>
                  <select
                    value={vout}
                    onChange={e => updateFilter('imp', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-accent"
                  >
                    <option value="">Tất cả</option>
                    <option value="4Ω">4Ω</option>
                    <option value="8Ω">8Ω</option>
                    <option value="16Ω">16Ω</option>
                    <option value="600Ω">600Ω</option>
                  </select>
                </div>

              </div>
            </div>

            {/* CTA */}
            <div className="bg-slate-900 p-8 rounded-2xl text-white">
              <h4 className="font-bold mb-4">Không thấy đúng thông số?</h4>
              <p className="text-xs text-slate-400 mb-6">
                Gửi thông số thực tế, chúng tôi quấn theo yêu cầu.
              </p>
              <Link
                to="/gui-thong-so"
                className="block w-full py-3 bg-accent text-center rounded-xl font-bold text-sm hover:brightness-110 transition-all"
              >
                Gửi yêu cầu quấn biến áp
              </Link>
            </div>

          </aside>


          <main className="lg:col-span-3 space-y-12">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-slate-900">Danh sách Model phù hợp</h3>
                <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Tìm thấy {products.length} sản phẩm</div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                      <th className="px-6 py-4">Model</th>
                      <th className="px-6 py-4">Công suất</th>
                      <th className="px-6 py-4">Line</th>
                      <th className="px-6 py-4">Ω</th>
                      <th className="px-6 py-4">Ứng dụng</th>
                      <th className="px-6 py-4 text-right">Chi tiết</th>
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
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded">{p.power_watt}W</span>
                        </td>
                        <td className="px-6 py-5 text-sm text-slate-600">{p.line_voltage}</td>
                        <td className="px-6 py-5 text-sm text-slate-600">{p.impedance}</td>
                        <td className="px-6 py-5 text-sm text-slate-600">{p.applications}</td>
                        <td className="px-6 py-5 text-right">
                          <Link to={`/san-pham/${p.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-accent transition-all">
                            Chi tiết <ArrowRight className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex items-center justify-between px-6 py-5 bg-slate-50 border-t">

              <div className="text-xs text-slate-500 font-bold">
                Trang {page} / {totalPages}
              </div>

              <div className="flex gap-2">

                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="px-4 py-2 text-xs font-bold bg-white border rounded-lg disabled:opacity-40"
                >
                  ← Trước
                </button>

                {Array.from({ length: totalPages })
                  .slice(Math.max(0, page - 3), page + 2)
                  .map((_, i) => {
                    const p = Math.max(1, page - 2) + i;
                    if (p > totalPages) return null;

                    return (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`px-4 py-2 text-xs font-bold rounded-lg border
                            ${p === page
                            ? "bg-accent text-white border-accent"
                            : "bg-white"}`}
                      >
                        {p}
                      </button>
                    );
                  })}

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="px-4 py-2 text-xs font-bold bg-white border rounded-lg disabled:opacity-40"
                >
                  Sau →
                </button>

              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export function ProductDetail({ slug }: { slug: string }) {
  const [product, setProduct] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let ignore = false;

    const loadProduct = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .maybeSingle(); // <-- quan trọng

      if (ignore) return;

      if (error) {
        console.error("Load product error:", error);
        setProduct(null);
      } else {
        setProduct(data ?? null);
      }

      setLoading(false);
    };

    loadProduct();

    return () => {
      ignore = true; // tránh setState sau unmount / slug change
    };
  }, [slug]);

  if (loading)
    return <div className="p-20 text-center">Đang tải...</div>;

  if (!product)
    return <div className="p-20 text-center">Không tìm thấy sản phẩm</div>;

  const url = `${BASE_URL}/san-pham/${product.slug}`;

  const schema = buildGraph(
    ...rootSchema["@graph"],

    pageSchema(url, product.name),

    breadcrumbSchema(url, [
      { name: "Trang chủ", url: BASE_URL },
      { name: "Sản phẩm", url: `${BASE_URL}/san-pham` },
      { name: product.name, url }
    ]),

    productSchema(product)
  );

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={schema} />
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
                  <ShieldCheck className="h-5 w-5 text-accent" />
                  Gia công theo yêu cầu
                </h3>

                <ul className="space-y-3 text-xs text-slate-600 font-medium">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-3 w-3 text-accent mt-0.5" />
                    Nhận quấn biến áp theo công suất và điện áp yêu cầu
                  </li>

                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-3 w-3 text-accent mt-0.5" />
                    Tư vấn matching tải loa – ampli – trở kháng
                  </li>

                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-3 w-3 text-accent mt-0.5" />
                    Hỗ trợ thiết kế Tap công suất cho hệ 70V / 100V Line
                  </li>

                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-3 w-3 text-accent mt-0.5" />
                    Nhận đơn số lượng nhỏ và OEM theo lô
                  </li>
                </ul>
              </div>

              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-tight flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-accent" /> Cam kết chất lượng
                </h3>
                <ul className="space-y-2 text-xs text-slate-500 font-medium">
                  <li className="flex items-center gap-2"><ArrowRight className="h-3 w-3 text-accent" /> Quấn thủ công – kiểm soát từng lớp dây</li>
                  <li className="flex items-center gap-2"><ArrowRight className="h-3 w-3 text-accent" /> Matching đúng trở kháng tầng công suất & loa</li>
                  <li className="flex items-center gap-2"><ArrowRight className="h-3 w-3 text-accent" /> Test thực tế bằng ampli trước khi giao</li>
                </ul>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <h2 className="text-3xl font-black text-slate-900 mb-6 uppercase tracking-tighter">
                Đặc tính âm thanh & thiết kế
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {product.description ?? `
                Biến áp được thiết kế tối ưu cho ampli đèn và bán dẫn công suất nhỏ.
                Ưu tiên đáp tuyến phẳng, méo thấp và độ động tốt ở dải trung trầm.
                `}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-slate-950 text-white rounded-3xl">
                  <h4 className="text-accent font-black uppercase text-xs tracking-widest mb-4">Vật liệu chế tạo</h4>
                  <p>
                    {product.material ?? "Đồng / Nhôm cao cấp"}.
                    Lõi thép Silic định hướng độ từ thẩm cao, tổn hao thấp.
                  </p>
                </div>
                <div className="p-8 bg-slate-950 text-white rounded-3xl">
                  <h4 className="text-accent font-black uppercase text-xs tracking-widest mb-4">Tiêu chuẩn áp dụng</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Thiết kế theo đặc tính tải audio, tối ưu đáp tuyến tần số và độ méo hài tổng (THD).
                  </p>
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
                        ['Công suất danh định', `${product.power_watt} W`],
                        ['Điện áp đường dây', product.line_voltage],
                        ['Trở kháng tải', product.impedance],
                        ['Các mức công suất (Tap)', product.taps],
                        ['Dải tần đáp ứng', product.frequency_range],
                        ['Loại lõi', product.core_type],
                        ['Chống nhiễu', product.shielding ? 'Có' : null],
                      ]
                        .filter(([, value]) => value)
                        .map(([label, value]) => (
                          <tr key={label}>
                            <td className="py-4 pl-0 border-0 bg-transparent text-xs font-bold text-slate-500 uppercase tracking-tight">
                              {label}
                            </td>
                            <td className="py-4 pr-0 border-0 bg-transparent text-sm font-black text-slate-900 text-right">
                              {value}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                <div className="space-y-4">
                  <Link to="/gui-thong-so" className="w-full py-5 bg-accent text-white rounded-2xl font-black text-lg uppercase tracking-tighter hover:brightness-110 transition-all shadow-2xl shadow-orange-900/20 flex items-center justify-center gap-3">
                    Gửi thông số ampli cần quấn<ArrowRight className="h-5 w-5" />
                  </Link>
                  <a href={`tel:${TELEPHONE}`} className="w-full py-5 bg-primary text-white rounded-2xl font-black text-lg uppercase tracking-tighter hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                    Gọi tư vấn: {`tel:${TELEPHONE_TEXT}`}
                  </a>
                </div>
              </div>

              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Phù hợp cho</h4>
                <div className="flex flex-wrap gap-2">
                  {product.applications
                    ? product.applications.split(',').map((app: string) => (
                      <span key={app}>
                        {app.trim()}
                      </span>
                    ))
                    : <span className="text-xs text-slate-400">
                      Ampli đèn SE / Push Pull / Headamp / DAC tube buffer
                    </span>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}