import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("industrial_power.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE,
    name TEXT,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER,
    slug TEXT UNIQUE,
    name TEXT,
    power_kva INTEGER,
    input_voltage TEXT,
    output_voltage TEXT,
    wiring TEXT,
    cooling TEXT,
    standard TEXT,
    material TEXT,
    accuracy TEXT,
    overload TEXT,
    applications TEXT,
    description TEXT,
    seo_description TEXT,
    image_url TEXT,
    catalog_url TEXT,
    drawing_url TEXT,
    FOREIGN KEY(category_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS manufacturing_capacity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    image_url TEXT,
    sort_order INTEGER
  );

  CREATE TABLE IF NOT EXISTS certificates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE,
    title TEXT,
    industry_key TEXT,
    problem TEXT,
    solution TEXT,
    diagram_url TEXT,
    image_url TEXT,
    seo_content TEXT
  );

  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE,
    title TEXT,
    category TEXT,
    content TEXT,
    summary TEXT,
    image_url TEXT,
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE,
    title TEXT,
    industry TEXT,
    location TEXT,
    province TEXT,
    year INTEGER,
    kva INTEGER,
    problem TEXT,
    solution TEXT,
    result TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS project_products (
    project_id INTEGER,
    product_id INTEGER,
    PRIMARY KEY(project_id, product_id),
    FOREIGN KEY(project_id) REFERENCES projects(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
  );

  CREATE TABLE IF NOT EXISTS documents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    type TEXT,
    product_category_id INTEGER,
    power_range TEXT,
    file_format TEXT,
    file_url TEXT,
    FOREIGN KEY(product_category_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT,
    company_name TEXT,
    phone TEXT,
    email TEXT,
    load_description TEXT,
    voltage_in TEXT,
    voltage_out TEXT,
    kva TEXT,
    application TEXT,
    document_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed Data
const catCount = db.prepare("SELECT COUNT(*) as count FROM categories").get() as { count: number };
if (catCount.count === 0) {
  // Categories
  const insertCat = db.prepare("INSERT INTO categories (slug, name, description) VALUES (?, ?, ?)");
  const mba3p = insertCat.run("may-bien-ap-3-pha", "Máy Biến Áp 3 Pha", "Dòng máy biến áp hạ thế chuyên dụng cho nhà xưởng và khu công nghiệp. Chúng tôi cung cấp các giải pháp biến áp từ 10kVA đến 2500kVA, đáp ứng tiêu chuẩn IEC và TCVN.").lastInsertRowid;
  insertCat.run("bien-ap-trung-the", "Biến Áp Trung Thế", "Hệ thống trạm biến áp trung thế từ 6kV đến 35kV.");
  const onap = insertCat.run("on-ap-cong-nghiep", "Ổn Áp Công Nghiệp", "Giải pháp ổn định điện áp tự động dải rộng cho thiết bị nhạy cảm.").lastInsertRowid;
  // Use onap if needed in future seeds
  console.log("Seeded onap with id:", onap);

  // Products
  const insertProduct = db.prepare(`
    INSERT INTO products (category_id, slug, name, power_kva, input_voltage, output_voltage, wiring, cooling, standard, material, accuracy, overload, applications, description, seo_description, image_url, catalog_url, drawing_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertProduct.run(
    mba3p,
    "bien-ap-3-pha-250kva",
    "Máy Biến Áp 3 Pha 250kVA",
    250,
    "380V",
    "200V/220V",
    "Dyn11",
    "ONAN",
    "IEC 60076",
    "Đồng 100%",
    "±1%",
    "150% (60s)",
    "nha-may, co-khi",
    "Máy biến áp 250kVA hiệu suất cao...",
    "Mua máy biến áp 3 pha 250kVA chính hãng IPS. Tiêu chuẩn IEC, bảo hành 24 tháng.",
    "https://picsum.photos/seed/mba250/800/600",
    "#", "#"
  );

  // Documents
  const insertDoc = db.prepare("INSERT INTO documents (title, type, product_category_id, power_range, file_format, file_url) VALUES (?, ?, ?, ?, ?, ?)");
  insertDoc.run("Catalogue Máy Biến Áp 3 Pha 2024", "catalogue", mba3p, "10-2500kVA", "PDF", "#");
  insertDoc.run("Datasheet Biến Áp 250kVA", "datasheet", mba3p, "250kVA", "PDF", "#");

  // Manufacturing Capacity
  const insertCap = db.prepare("INSERT INTO manufacturing_capacity (title, description, image_url, sort_order) VALUES (?, ?, ?, ?)");
  insertCap.run("Cắt lõi thép Silic", "Hệ thống máy cắt tôn silic tự động đảm bảo độ chính xác và giảm thiểu tổn hao không tải.", "https://picsum.photos/seed/factory1/800/600", 1);
  insertCap.run("Quấn dây đồng", "Công nghệ quấn dây hiện đại, kiểm soát lực căng, đảm bảo độ bền cơ học và điện môi.", "https://picsum.photos/seed/factory2/800/600", 2);
  insertCap.run("Sấy chân không", "Quy trình sấy loại bỏ hoàn toàn ẩm, tăng cường độ bền cách điện cho cuộn dây.", "https://picsum.photos/seed/factory3/800/600", 3);
  insertCap.run("Thử nghiệm KCS", "Phòng thử nghiệm đạt chuẩn ISO, kiểm tra 100% sản phẩm trước khi xuất xưởng.", "https://picsum.photos/seed/factory4/800/600", 4);

  // Projects
  const insertProject = db.prepare(`
    INSERT INTO projects (slug, title, industry, location, province, year, kva, problem, solution, result, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertProject.run(
    "du-an-nha-may-nhua-bac-ninh",
    "Trạm biến áp nhà máy nhựa Bắc Ninh",
    "nha-may",
    "KCN Quế Võ",
    "Bắc Ninh",
    2024,
    1000,
    "Điện áp không ổn định gây lỗi sản phẩm nhựa.",
    "Trạm biến áp 1000kVA Dyn11.",
    "Tỷ lệ phế phẩm giảm 20%.",
    "https://picsum.photos/seed/proj-bn/800/600"
  );

  // Applications
  const insertApp = db.prepare("INSERT INTO applications (slug, title, industry_key, problem, solution, diagram_url, image_url, seo_content) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  insertApp.run(
    "nha-may-san-xuat",
    "Giải pháp cho Nhà máy sản xuất",
    "nha-may",
    "Sụt áp khi khởi động động cơ lớn, gây dừng dây chuyền.",
    "Lắp đặt biến áp hạ thế kết hợp ổn áp dải rộng.",
    "https://picsum.photos/seed/diagram1/800/600",
    "https://picsum.photos/seed/app-factory/800/600",
    "Chi tiết giải pháp điện cho nhà máy sản xuất công nghiệp..."
  );
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/categories", (req, res) => {
    const cats = db.prepare("SELECT * FROM categories").all();
    res.json(cats);
  });

  app.get("/api/products", (req, res) => {
    const { category, power_min, power_max, voltage_in, voltage_out, cooling, application } = req.query;
    let query = "SELECT p.*, c.name as category_name FROM products p JOIN categories c ON p.category_id = c.id WHERE 1=1";
    const params: any[] = [];

    if (category) { query += " AND c.slug = ?"; params.push(category); }
    if (power_min) { query += " AND p.power_kva >= ?"; params.push(power_min); }
    if (power_max) { query += " AND p.power_kva <= ?"; params.push(power_max); }
    if (voltage_in) { query += " AND p.input_voltage = ?"; params.push(voltage_in); }
    if (voltage_out) { query += " AND p.output_voltage = ?"; params.push(voltage_out); }
    if (cooling) { query += " AND p.cooling = ?"; params.push(cooling); }
    if (application) { query += " AND p.applications LIKE ?"; params.push(`%${application}%`); }

    res.json(db.prepare(query).all(...params));
  });

  app.get("/api/products/:slug", (req, res) => {
    const product = db.prepare("SELECT * FROM products WHERE slug = ?").get(req.params.slug);
    res.json(product);
  });

  app.get("/api/manufacturing", (req, res) => {
    const capacity = db.prepare("SELECT * FROM manufacturing_capacity ORDER BY sort_order").all();
    res.json(capacity);
  });

  app.get("/api/projects", (req, res) => {
    const { industry, province, year } = req.query;
    let query = "SELECT * FROM projects WHERE 1=1";
    const params: any[] = [];
    if (industry) { query += " AND industry = ?"; params.push(industry); }
    if (province) { query += " AND province = ?"; params.push(province); }
    if (year) { query += " AND year = ?"; params.push(year); }
    res.json(db.prepare(query).all(...params));
  });

  app.get("/api/projects/:slug", (req, res) => {
    const project = db.prepare("SELECT * FROM projects WHERE slug = ?").get(req.params.slug);
    if (project) {
      const products = db.prepare(`
        SELECT p.* FROM products p
        JOIN project_products pp ON p.id = pp.product_id
        WHERE pp.project_id = ?
      `).all(project.id);
      project.related_products = products;
    }
    res.json(project);
  });

  app.get("/api/applications", (req, res) => {
    const apps = db.prepare("SELECT * FROM applications").all();
    res.json(apps);
  });

  app.get("/api/applications/:slug", (req, res) => {
    const app = db.prepare("SELECT * FROM applications WHERE slug = ?").get(req.params.slug);
    res.json(app);
  });

  app.get("/api/documents", (req, res) => {
    const { type, category, power } = req.query;
    let query = "SELECT d.*, c.name as category_name FROM documents d JOIN categories c ON d.product_category_id = c.id WHERE 1=1";
    const params: any[] = [];
    if (type) { query += " AND d.type = ?"; params.push(type); }
    if (category) { query += " AND c.slug = ?"; params.push(category); }
    if (power) { query += " AND d.power_range LIKE ?"; params.push(`%${power}%`); }
    res.json(db.prepare(query).all(...params));
  });

  app.get("/api/articles", (req, res) => {
    const { category } = req.query;
    let query = "SELECT * FROM articles WHERE 1=1";
    const params: any[] = [];
    if (category) { query += " AND category = ?"; params.push(category); }
    res.json(db.prepare(query).all(...params));
  });

  app.post("/api/leads", (req, res) => {
    const { type, company_name, phone, email, load_description, voltage_in, voltage_out, kva, application, document_id } = req.body;
    const stmt = db.prepare(`
      INSERT INTO leads (type, company_name, phone, email, load_description, voltage_in, voltage_out, kva, application, document_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(type || 'quote', company_name, phone, email, load_description, voltage_in, voltage_out, kva, application, document_id);
    res.json({ success: true, id: info.lastInsertRowid });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
