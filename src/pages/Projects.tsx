import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Briefcase, MapPin, CheckCircle2, ArrowRight, Zap, ShieldCheck, Factory } from 'lucide-react';
import { BASE_URL, breadcrumbSchema, buildGraph, JsonLd, NAME_INFO, ORG_ID, pageSchema, rootSchema } from '@/src/components/SEO';
import { supabase } from "@/src/lib/supabase";

export function Projects() {
  const [projects, setProjects] = React.useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const industry = searchParams.get('industry') || '';
  const province = searchParams.get('province') || '';

  const url = `${BASE_URL}/cong-trinh`;

  /* ================= PAGE ================= */

  const pageNode = {
    ...pageSchema(url, "Dự án & Công trình tiêu biểu | " + { NAME_INFO }),
    "@type": "CollectionPage",
    description: "Hồ sơ năng lực và các dự án thi công trạm biến áp, ổn áp công nghiệp.",
    about: { "@id": `${BASE_URL}/dich-vu#service` }
  };

  /* ================= BREADCRUMB ================= */

  const breadcrumb = breadcrumbSchema(url, [
    { name: "Trang chủ", url: BASE_URL },
    { name: "Công trình", url }
  ]);

  /* ================= PROJECT LIST ================= */

  const projectList =
    projects.length > 0
      ? {
        "@type": "ItemList",
        "@id": `${url}#list`,
        numberOfItems: projects.length,
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            "@id": `${BASE_URL}/cong-trinh/${p.slug}#project`,
            name: p.title,
            url: `${BASE_URL}/cong-trinh/${p.slug}`,
            creator: { "@id": ORG_ID }
          }
        }))
      }
      : null;

  /* ================= FINAL GRAPH ================= */

  const structuredData = buildGraph(
    ...rootSchema["@graph"],
    pageNode,
    breadcrumb,
    projectList
  );

  React.useEffect(() => {
    const loadProjects = async () => {
      let query = supabase.from("projects").select("*");

      if (industry) query = query.eq("industry", industry);
      if (province) query = query.eq("province", province);

      const { data, error } = await query;

      if (error) {
        console.error("Load projects error:", error);
        setProjects([]);
        return;
      }

      setProjects(data ?? []);
    };

    loadProjects();
  }, [industry, province]);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <JsonLd data={structuredData} />
      <section className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Ứng dụng thực tế của biến áp do {NAME_INFO} sản xuất</h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Sản phẩm của {NAME_INFO} được các công ty tích hợp hệ thống sử dụng trong
            thiết bị âm thanh, truyền thanh và hệ thống PA trên toàn quốc.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        {/* <div className="flex flex-wrap gap-4 mb-12">
          <select
            value={industry}
            onChange={e => setSearchParams({ industry: e.target.value, province })}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none focus:border-emerald-500"
          >
            <option value="">Tất cả ứng dụng</option>
            <option value="truyen-thanh">Hệ thống truyền thanh</option>
            <option value="nha-xuong">Âm thanh nhà xưởng</option>
            <option value="toa-nha">PA tòa nhà</option>
            <option value="phong-hop">Phòng họp & hội trường</option>
            <option value="studio">Studio & phòng thu</option>
          </select>
          <select
            value={province}
            onChange={e => setSearchParams({ industry, province: e.target.value })}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none focus:border-emerald-500"
          >
            <option value="">Tất cả tỉnh thành</option>
            <option value="Bắc Ninh">Bắc Ninh</option>
            <option value="Hưng Yên">Hưng Yên</option>
            <option value="Hải Phòng">Hải Phòng</option>
          </select>
        </div> */}

        <div className="grid grid-cols-1 gap-12">
          {projects.map((project) => (
            <div key={project.id} className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-80 lg:h-auto overflow-hidden">
                  <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="p-10 lg:p-16">
                  <div className="flex flex-wrap gap-4 mb-8">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full uppercase tracking-widest">
                      Ứng dụng: Hệ thống truyền thanh
                    </span>

                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded-full uppercase tracking-widest">
                      Thiết bị: Ampli & loa 100V
                    </span>

                    <span className="px-3 py-1 bg-slate-900 text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                      Gia công theo yêu cầu
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold text-slate-900 mb-8 leading-tight">{project.title}</h2>

                  <div className="space-y-8 mb-12">
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                        Loại biến áp cung cấp
                      </h4>
                      <p className="text-slate-600 leading-relaxed line-clamp-2">
                        Biến áp nguồn, biến áp xuất âm, biến áp line 70V–100V sản xuất theo thông số riêng.
                      </p>
                    </div>
                  </div>

                  <Link to={`/cong-trinh/${project.slug}`} className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-slate-200">
                    Tham khảo cấu hình & đặt theo yêu cầu<ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectDetail({ slug }: { slug: string }) {
  const [project, setProject] = React.useState<any>(null);

  React.useEffect(() => {
    const loadArticle = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Load article error:", error);
        setProject(null);
        return;
      }

      setProject(data ?? null);
    };

    loadArticle();
  }, [slug]);

  if (!project) return <div className="p-20 text-center">Đang tải...</div>;

  const url = `${BASE_URL}/cong-trinh/${project.slug}`;

  /* ================= PAGE ================= */

  const pageNode = pageSchema(url, project.title);

  /* ================= BREADCRUMB ================= */

  const breadcrumb = breadcrumbSchema(url, [
    { name: "Trang chủ", url: BASE_URL },
    { name: "Ứng dụng thực tế", url: `${BASE_URL}/cong-trinh` },
    { name: project.title, url }
  ]);

  /* ================= CASE STUDY ARTICLE ================= */

  const article = {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: project.title,
    description: project.problem,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: { "@id": `${url}#webpage` },
    about: [
      "Biến áp âm ly",
      "Hệ thống truyền thanh",
      project.industry
    ],
    articleSection: "Ứng dụng thực tế",
  };

  /* ================= SUPPLIED EQUIPMENT ================= */

  const suppliedProducts = project.related_products?.map((p: any) => ({
    "@type": "Product",
    "@id": `${BASE_URL}/san-pham/${p.slug}#product`,
    name: p.name,
    brand: { "@id": ORG_ID },
    manufacturer: { "@id": ORG_ID },
    isAccessoryOrSparePartFor: {
      "@type": "Thing",
      name: "Hệ thống truyền thanh công cộng"
    }
  }));

  /* ================= MANUFACTURER ROLE ================= */

  const manufacturerRole = {
    "@type": "OrganizationRole",
    "@id": `${url}#oem-role`,
    roleName: "OEM Manufacturer",
    memberOf: { "@id": ORG_ID },
    description:
      "Sản xuất biến áp theo thông số cho đơn vị tích hợp hệ thống, không trực tiếp thi công công trình"
  };

  /* ================= FINAL GRAPH ================= */

  const structuredData = buildGraph(
    ...rootSchema["@graph"],
    pageNode,
    breadcrumb,
    article,
    manufacturerRole,
    ...(suppliedProducts || [])
  );

  return (
    <div className="bg-white min-h-screen pb-24">
      <JsonLd data={structuredData} />
      <section className="bg-primary py-24 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Meta tags */}
          <div className="flex flex-wrap gap-4 mb-8">
            {project.industry && (
              <span className="px-3 py-1 bg-accent text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                {project.industry}
              </span>
            )}
            {project.year && (
              <span className="px-3 py-1 bg-white/10 text-white text-[10px] font-black rounded-full uppercase tracking-widest">
                {project.year}
              </span>
            )}
          </div>

          {/* H1 chuẩn SEO */}
          <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight uppercase tracking-tighter">
            {project.equipment_type
              ? `Sản xuất ${project.equipment_type} cho ${project.client_name}`
              : `Gia công thiết bị OEM cho ${project.client_name}`}
          </h1>

          {/* Mô tả rõ vai trò manufacturer */}
          <p className="text-xl text-slate-300 max-w-3xl font-medium leading-relaxed">
            {NAME_INFO} là đơn vị sản xuất trực tiếp {project.equipment_type || 'thiết bị điện'}
            {project.system_type && ` phục vụ hệ thống ${project.system_type}`}
            {' '}theo yêu cầu OEM của {project.client_name}.
            Chúng tôi không trực tiếp thi công công trình mà cung cấp thiết bị cho đơn vị tích hợp triển khai tại địa phương.
          </p>

          {/* Thông tin phụ */}
          <div className="flex flex-wrap items-center gap-8 text-slate-400 font-bold text-sm uppercase tracking-widest mt-10">

            {project.province && (
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                {project.province === 'toan-quoc'
                  ? 'Cung cấp toàn quốc'
                  : project.province}
              </div>
            )}

            {project.kva && (
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" />
                Công suất {project.kva} kVA
              </div>
            )}

          </div>
        </div>
        <Zap className="absolute -right-20 -bottom-20 h-96 w-96 text-white/5 rotate-12" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-20">
            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tighter flex items-center gap-3">
                <div className="w-2 h-8 bg-accent"></div>
                Thông số kỹ thuật từ đơn vị tích hợp hệ thống
              </h2>

              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                {project.problem}
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase tracking-tighter flex items-center gap-3">
                <div className="w-2 h-8 bg-accent"></div>
                Giải pháp thiết kế & chế tạo biến áp OEM
              </h2>

              <p className="text-xl text-slate-600 leading-relaxed font-medium mb-12">
                {project.solution}
              </p>

              <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50">
                <img
                  src={project.image_url}
                  alt={`Gia công ${project.equipment_type || 'biến áp'} cho ${project.client_name}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </section>

            <section className="p-12 bg-slate-950 rounded-[3rem] text-white relative overflow-hidden">
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3 uppercase tracking-tighter">
                <ShieldCheck className="h-8 w-8 text-accent" />
                Hiệu suất vận hành sau khi lắp đặt vào hệ thống
              </h2>

              <p className="text-2xl text-slate-300 font-bold leading-relaxed relative z-10">
                {project.result}
              </p>

              <div className="absolute top-0 right-0 p-8 opacity-10">
                <CheckCircle2 className="h-32 w-32" />
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-8">

            {/* SPEC REFERENCE */}
            <div className="bg-white p-10 rounded-[2.5rem] border-2 border-slate-100 shadow-2xl shadow-slate-200/50">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">
                Cấu hình biến áp đã chế tạo tương tự
              </h3>

              {project.related_products?.map((p: any) => (
                <Link
                  key={p.id}
                  to={`/san-pham/${p.slug}`}
                  className="group flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-accent transition-all mb-4"
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white">
                    <img src={p.image_url} alt={`Biến áp ${p.name}`} className="w-full h-full object-cover" loading="lazy" />
                  </div>

                  <div>
                    <h4 className="font-black text-slate-900 group-hover:text-accent transition-colors text-xs uppercase tracking-tight">
                      {p.name}
                    </h4>
                    <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                      Công suất {p.power_kva} kVA
                    </div>
                  </div>
                </Link>
              ))}

              <Link
                to="/gui-thong-so"
                className="block w-full py-5 bg-accent text-white text-center rounded-xl font-black text-sm uppercase tracking-widest hover:brightness-110 transition-all mt-8"
              >
                Gửi thông số để chúng tôi thiết kế biến áp
              </Link>
            </div>


            {/* MANUFACTURING CAPABILITY */}
            <div className="bg-primary p-10 rounded-[2.5rem] text-white">
              <h3 className="text-xl font-black mb-8 uppercase tracking-tight">
                Năng lực chế tạo OEM
              </h3>

              <div className="space-y-6">
                {/* <div className="flex items-center gap-4 text-sm font-bold">
                  <Factory className="h-6 w-6 text-accent" />
                  Sản xuất trực tiếp tại nhà máy
                </div> */}

                <div className="flex items-center gap-4 text-sm font-bold">
                  <ShieldCheck className="h-6 w-6 text-accent" />
                  Kiểm tra tải & đo kiểm trước khi giao
                </div>

                <div className="flex items-center gap-4 text-sm font-bold">
                  <Zap className="h-6 w-6 text-accent" />
                  Thiết kế theo thông số hệ thống âm thanh
                </div>
              </div>

              <p className="text-xs text-slate-300 mt-8 leading-relaxed">
                Chúng tôi cung cấp thiết bị cho đơn vị tích hợp hệ thống, không trực tiếp thi công công trình.
              </p>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}