import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ArrowRight, Clock, User, ChevronRight, Zap } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { JsonLd } from '@/src/components/SEO';
import { cn } from '@/src/lib/utils';
import { supabase } from "@/src/lib/supabase";

export function Knowledge() {
  const [articles, setArticles] = React.useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCat = searchParams.get('cat') || '';
  const query = searchParams.get('q') || '';

  const categories = [
    { id: 'selection', name: 'Hướng dẫn chọn', slug: 'huong-dan-chon' },
    { id: 'comparison', name: 'So sánh', slug: 'so-sanh' },
    { id: 'error', name: 'Lỗi & Sự cố', slug: 'loi-su-co' },
    { id: 'standard', name: 'Tiêu chuẩn', slug: 'tieu-chuan' },
  ];

  const baseUrl = "https://ips.vn";

  React.useEffect(() => {
    const loadArticles = async () => {
      let queryBuilder = supabase.from("articles").select("*");

      if (activeCat) queryBuilder = queryBuilder.eq("category", activeCat);

      if (query) {
        queryBuilder = queryBuilder.textSearch(
          "search_text",
          query,
          { type: "websearch" }
        );
      }

      const { data, error } = await queryBuilder;

      if (error) {
        console.error("Load articles error:", error);
        setArticles([]);
        return;
      }

      setArticles(data ?? []);
    };

    loadArticles();
  }, [activeCat, query]);

  const filteredArticles = articles;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "name": "Kiến thức kỹ thuật điện công nghiệp | IPS",
        "description": "Thư viện kiến thức về máy biến áp, ổn áp, lỗi điện áp và tiêu chuẩn điện nhà xưởng.",
        "url": `${baseUrl}/kien-thuc`,
        "inLanguage": "vi-VN"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Trang chủ",
            "item": baseUrl
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Kiến thức kỹ thuật",
            "item": `${baseUrl}/kien-thuc`
          }
        ]
      },
      {
        "@type": "ItemList",
        "itemListElement": filteredArticles.map((a, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "url": `${baseUrl}/kien-thuc/${a.slug}`,
          "name": a.title
        }))
      }
    ]
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      {/* HEADER */}
      <section className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">
            Kiến thức kỹ thuật điện công nghiệp
          </h1>

          <p className="text-lg text-slate-600 max-w-3xl font-medium">
            Hướng dẫn chọn máy biến áp, ổn áp, xử lý lỗi điện áp và phân tích chất lượng điện năng trong nhà xưởng.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="lg:w-1/4 space-y-8">
            <nav className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">
                Chuyên mục kỹ thuật
              </h3>

              <ul className="space-y-2">

                <li>
                  <Link
                    to="/kien-thuc"
                    className={cn(
                      "block px-4 py-3 rounded-xl text-sm font-black uppercase tracking-tight transition-all",
                      !activeCat ? "bg-primary text-white shadow-lg" : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    Tất cả bài viết
                  </Link>
                </li>

                {categories.map(c => (
                  <li key={c.id}>
                    <Link
                      to={`/kien-thuc?cat=${c.id}`}
                      className={cn(
                        "block px-4 py-3 rounded-xl text-sm font-black uppercase tracking-tight transition-all",
                        activeCat === c.id ? "bg-primary text-white shadow-lg" : "text-slate-600 hover:bg-slate-50"
                      )}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}

              </ul>
            </nav>

            <div className="bg-accent rounded-3xl p-8 text-white shadow-2xl shadow-orange-900/20">
              <h4 className="text-xl font-black mb-4 uppercase tracking-tight text-white">
                Tư vấn kỹ thuật miễn phí
              </h4>
              <p className="text-sm text-orange-50 mb-8 font-medium opacity-90">
                Kỹ sư IPS hỗ trợ tính toán công suất và bắt bệnh hệ thống điện 24/7.
              </p>

              <Link
                to="/gui-thong-so"
                className="block w-full py-4 bg-white text-accent text-center rounded-xl font-black text-xs uppercase tracking-widest hover:bg-orange-50 transition-all"
              >
                Gửi yêu cầu ngay
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4 space-y-8">

            {/* SEARCH BOX */}
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm kiếm kiến thức điện công nghiệp, lỗi điện áp, tiêu chuẩn..."
                className="w-full pl-16 pr-6 py-5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-accent outline-none shadow-sm font-bold"
                value={query}
                onChange={e => setSearchParams({ q: e.target.value, cat: activeCat })}
              />
            </div>


            {/* ARTICLE LIST */}
            <div className="grid grid-cols-1 gap-8">
              {filteredArticles.map((art) => (

                <article
                  key={art.id}
                  className="group bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden hover:border-accent hover:shadow-2xl transition-all flex flex-col md:flex-row shadow-sm"
                >

                  {/* IMAGE */}
                  <div className="md:w-2/5 h-64 md:h-auto overflow-hidden">
                    <Link to={`/kien-thuc/${art.slug}`} aria-label={art.title}>
                      <img
                        src={art.image_url}
                        alt={`${art.title} - kiến thức điện công nghiệp IPS`}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        referrerPolicy="no-referrer"
                      />
                    </Link>
                  </div>

                  {/* CONTENT */}
                  <div className="p-10 md:w-3/5">

                    {/* META */}
                    <div className="flex items-center gap-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">

                      {/* CATEGORY = TAXONOMY */}
                      <Link
                        to={`/kien-thuc?cat=${art.category}`}
                        className="text-accent hover:underline"
                      >
                        {art.category}
                      </Link>

                      {/* DATE machine readable */}
                      <time
                        dateTime={art.published_at}
                        className="flex items-center gap-1"
                      >
                        <Clock className="h-3 w-3" />
                        {new Date(art.published_at).toLocaleDateString('vi-VN')}
                      </time>

                    </div>

                    {/* TITLE = MAIN ANCHOR */}
                    <h2 className="text-2xl font-black text-slate-900 mb-6 leading-tight uppercase tracking-tight">
                      <Link
                        to={`/kien-thuc/${art.slug}`}
                        className="group-hover:text-accent transition-colors"
                      >
                        {art.title}
                      </Link>
                    </h2>

                    {/* SUMMARY */}
                    <p className="text-slate-500 mb-8 line-clamp-3 leading-relaxed font-medium">
                      {art.summary}
                    </p>

                    {/* SEO ANCHOR TEXT */}
                    <Link
                      to={`/kien-thuc/${art.slug}`}
                      className="flex items-center gap-2 text-accent font-black text-xs uppercase tracking-widest"
                    >
                      Xem chi tiết: {art.title}
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                  </div>
                </article>

              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export function ArticleDetail({ slug }: { slug: string }) {
  const [article, setArticle] = React.useState<any>(null);

  function slugify(text: string) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, '-');
  }

  React.useEffect(() => {
    const loadArticle = async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error("Load article error:", error);
        setArticle(null);
        return;
      }

      setArticle(data ?? null);
    };

    loadArticle();
  }, [slug]);

  if (!article) return <div className="p-20 text-center">Đang tải...</div>;

  const baseUrl = "https://industrial-power-solutions.vercel.app";
  const articleUrl = `${baseUrl}/kien-thuc/${article.slug}`;

  const id = {
    article: `${articleUrl}#article`,
    webpage: `${articleUrl}#webpage`,
    breadcrumb: `${articleUrl}#breadcrumb`,
    organization: `${baseUrl}#organization`
  };

  const faqEntities = extractFAQ(article.content);

  const faqLd =
    faqEntities.length >= 2
      ? {
        "@type": "FAQPage",
        "@id": `${articleUrl}#faq`,
        "mainEntity": faqEntities
      }
      : null;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": id.organization,
        "name": "IPS - Industrial Power Solutions",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/logo.png`
        }
      },
      {
        "@type": "WebPage",
        "@id": id.webpage,
        "url": articleUrl,
        "name": article.title,
        "isPartOf": { "@id": id.organization },
        "breadcrumb": { "@id": id.breadcrumb },
        "inLanguage": "vi-VN"
      },

      {
        "@type": "BreadcrumbList",
        "@id": id.breadcrumb,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Trang chủ", "item": baseUrl },
          { "@type": "ListItem", "position": 2, "name": "Kiến thức", "item": `${baseUrl}/kien-thuc` },
          { "@type": "ListItem", "position": 3, "name": article.title, "item": articleUrl }
        ]
      },
      {
        "@type": "TechArticle",
        "@id": id.article,
        "headline": article.title,
        "description": article.summary,
        "image": article.image_url,
        "datePublished": article.created_at ?? new Date().toISOString(),
        "dateModified": article.updated_at ?? article.created_at ?? new Date().toISOString(),
        "mainEntityOfPage": { "@id": id.webpage },
        "author": { "@type": "Person", "name": "Kỹ sư IPS" },
        "publisher": { "@id": id.organization },
        "articleSection": article.category,
        "keywords": article.title,
        "inLanguage": "vi-VN"
      },
      ...(faqLd ? [faqLd] : [])
    ]
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-12">
          <Link to="/kien-thuc" itemProp="url" className="hover:text-accent">
            <span itemProp="title">Thư viện</span>
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-slate-900" aria-current="page">{article.title}</span>
        </nav>

        <header className="mb-16" itemProp="headline">
          <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">

            <span itemProp="articleSection"
              className="px-2 py-1 bg-orange-50 text-accent rounded">
              {article.category}
            </span>

            <time
              dateTime={article.published_at}
              itemProp="datePublished"
              className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {new Date(article.published_at).toLocaleDateString('vi-VN')}
            </time>

            <span itemProp="author" itemScope itemType="https://schema.org/Person"
              className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span itemProp="name">Kỹ sư IPS</span>
            </span>

          </div>

          <h1 itemProp="name"
            className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-8">
            {article.title}
          </h1>

          <p itemProp="description"
            className="text-xl text-slate-600 leading-relaxed italic border-l-4 border-accent pl-6">
            {article.summary}
          </p>
        </header>

        <figure className="aspect-video rounded-3xl overflow-hidden mb-16 shadow-2xl" itemProp="image" itemScope itemType="https://schema.org/ImageObject">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover"
            itemProp="url"
            loading="eager"
          />
          <meta itemProp="caption" content={article.title} />
        </figure>

        <div className="prose prose-slate prose-lg max-w-none markdown-body">
          <ReactMarkdown
            components={{
              h2: ({ node, ...props }) => (
                <h2 id={slugify(String(props.children))}
                  itemProp="about"
                  className="scroll-mt-32">
                  {props.children}
                </h2>
              ),
              h3: ({ node, ...props }) => (
                <h3 id={slugify(String(props.children))}
                  className="scroll-mt-32">
                  {props.children}
                </h3>
              ),
              p: ({ node, ...props }) => (
                <p>{props.children}</p>
              ),
              img: ({ node, ...props }) => (
                <figure className="my-10">
                  <img {...props} loading="lazy" />
                  {props.alt && <figcaption>{props.alt}</figcaption>}
                </figure>
              ),
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-8">
                  <table className="table-auto w-full border">{props.children}</table>
                </div>
              )
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>

        {/* In-article CTA */}
        <section
          className="my-24 p-12 bg-primary rounded-[3rem] text-white relative overflow-hidden shadow-2xl"
          itemScope
          itemType="https://schema.org/Service"
        >

          <meta itemProp="serviceType" content="Tư vấn tính toán công suất điện nhà xưởng" />
          <meta itemProp="provider" content="IPS" />

          <div className="relative z-10">

            <h2
              className="text-3xl font-black mb-6 uppercase tracking-tighter"
              itemProp="name"
            >
              Dịch vụ tính toán công suất điện nhà xưởng
            </h2>

            <p
              className="text-slate-300 mb-10 max-w-xl font-medium text-lg"
              itemProp="description"
            >
              Gửi thông số tải máy CNC, máy ép, lò nung hoặc dây chuyền sản xuất.
              Kỹ sư điện IPS sẽ phân tích sụt áp, lựa chọn máy biến áp và đề xuất cấu hình nguồn điện phù hợp trong vòng 2 giờ.
            </p>

            <Link
              to="/gui-thong-so"
              itemProp="url"
              className="inline-flex items-center gap-3 px-10 py-5 bg-accent text-white rounded-xl font-black uppercase text-xs tracking-widest hover:brightness-110 transition-all shadow-xl shadow-orange-900/20"
            >
              Gửi thông số tải để nhận bản tính toán <ArrowRight className="h-5 w-5" />
            </Link>

          </div>

          <Zap className="absolute -right-10 -bottom-10 h-64 w-64 text-white/5 rotate-12" />
        </section>
      </section>
    </div>
  );
}

function extractFAQ(content: string) {
  const regex = /## (.+?)\n([\s\S]*?)(?=\n##|$)/g;
  const faqs = [];
  let match;

  while ((match = regex.exec(content))) {
    faqs.push({
      "@type": "Question",
      "name": match[1],
      "acceptedAnswer": {
        "@type": "Answer",
        "text": match[2].replace(/\n/g, ' ').slice(0, 300)
      }
    });
  }

  return faqs.slice(0, 5);
}
