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
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE,
    name TEXT,
    type TEXT,
    phase TEXT,
    power_kva TEXT,
    input_voltage TEXT,
    output_voltage TEXT,
    accuracy TEXT,
    overload TEXT,
    applications TEXT,
    description TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS solutions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE,
    industry TEXT,
    problem TEXT,
    cause TEXT,
    voltage_range TEXT,
    calculation TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE,
    title TEXT,
    category TEXT,
    content TEXT,
    summary TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    industry TEXT,
    location TEXT,
    kva TEXT,
    problem TEXT,
    solution TEXT,
    result TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT,
    phone TEXT,
    email TEXT,
    load_description TEXT,
    voltage TEXT,
    kva TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed Data (if empty)
const productCount = db.prepare("SELECT COUNT(*) as count FROM products").get() as { count: number };
if (productCount.count === 0) {
  const insertProduct = db.prepare(`
    INSERT INTO products (slug, name, type, phase, power_kva, input_voltage, output_voltage, accuracy, overload, applications, description, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertProduct.run(
    "bien-ap-3-pha-150kva",
    "Biến áp 3 pha 150kVA",
    "Biến áp",
    "3 pha",
    "150kVA",
    "380V",
    "200V/220V",
    "±1%",
    "150% trong 60s",
    "Máy CNC, máy cắt Laser, dây chuyền tự động",
    "Biến áp cách ly/tự ngẫu chuyên dụng cho thiết bị công nghiệp nhập khẩu.",
    "https://picsum.photos/seed/transformer/800/600"
  );
  insertProduct.run(
    "on-ap-servo-3-pha-100kva",
    "Ổn áp Servo 3 pha 100kVA",
    "Ổn áp",
    "3 pha",
    "100kVA",
    "260V - 430V",
    "380V",
    "±2%",
    "120% trong 30s",
    "Nhà xưởng, hệ thống chiếu sáng, động cơ lớn",
    "Ổn định điện áp tự động bằng motor Servo, độ bền cao.",
    "https://picsum.photos/seed/stabilizer/800/600"
  );

  const insertSolution = db.prepare(`
    INSERT INTO solutions (slug, industry, problem, cause, voltage_range, calculation, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  insertSolution.run(
    "cho-cnc",
    "Máy CNC",
    "Máy tự reset, lỗi Spindle, Alarm Servo vào giờ cao điểm.",
    "Điện lưới dao động gây mất đồng bộ Driver và Encoder.",
    "380V ±3% (Hoạt động chuẩn)",
    "Công suất nguồn ≥ 1.8 × công suất Spindle.",
    "https://picsum.photos/seed/cnc/800/600"
  );

  const insertArticle = db.prepare(`
    INSERT INTO articles (slug, title, category, content, summary, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  insertArticle.run(
    "dien-ap-3-pha-bao-nhieu-la-binh-thuong",
    "Điện áp 3 pha bao nhiêu là bình thường trong nhà xưởng?",
    "Nguyên lý",
    "Tiêu chuẩn điện áp 3 pha tại Việt Nam thường là 380V. Tuy nhiên, trong môi trường công nghiệp, con số này có thể dao động...",
    "Tìm hiểu về tiêu chuẩn điện áp và cách đo đạc chính xác trong môi trường công nghiệp.",
    "https://picsum.photos/seed/voltage/800/600"
  );
  insertArticle.run(
    "dien-yeu-lam-motor-nong-nhu-the-nao",
    "Điện yếu làm motor nóng như thế nào?",
    "Sự cố",
    "Khi điện áp giảm, dòng điện sẽ tăng lên để duy trì công suất, dẫn đến nhiệt độ cuộn dây tăng cao...",
    "Phân tích tác động của sụt áp đến tuổi thọ và hiệu suất của động cơ điện.",
    "https://picsum.photos/seed/motor/800/600"
  );

  const insertProject = db.prepare(`
    INSERT INTO projects (title, industry, location, kva, problem, solution, result, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  insertProject.run(
    "Xử lý sụt áp cho nhà xưởng cơ khí",
    "Cơ khí",
    "Hưng Yên",
    "250kVA",
    "Điện áp sụt xuống 310V khi vào tải, máy CNC dừng hoạt động.",
    "Lắp đặt hệ thống ổn áp 3 pha dải rộng 250kVA.",
    "Điện áp ổn định 380V, dây chuyền chạy liên tục 24/7.",
    "https://picsum.photos/seed/project1/800/600"
  );
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/products", (req, res) => {
    const products = db.prepare("SELECT * FROM products").all();
    res.json(products);
  });

  app.get("/api/products/:slug", (req, res) => {
    const product = db.prepare("SELECT * FROM products WHERE slug = ?").get(req.params.slug);
    res.json(product);
  });

  app.get("/api/solutions", (req, res) => {
    const solutions = db.prepare("SELECT * FROM solutions").all();
    res.json(solutions);
  });

  app.get("/api/solutions/:slug", (req, res) => {
    const solution = db.prepare("SELECT * FROM solutions WHERE slug = ?").get(req.params.slug);
    res.json(solution);
  });

  app.get("/api/articles", (req, res) => {
    const articles = db.prepare("SELECT * FROM articles").all();
    res.json(articles);
  });

  app.get("/api/articles/:slug", (req, res) => {
    const article = db.prepare("SELECT * FROM articles WHERE slug = ?").get(req.params.slug);
    res.json(article);
  });

  app.get("/api/projects", (req, res) => {
    const projects = db.prepare("SELECT * FROM projects").all();
    res.json(projects);
  });

  app.post("/api/leads", (req, res) => {
    const { company_name, phone, email, load_description, voltage, kva } = req.body;
    const stmt = db.prepare(`
      INSERT INTO leads (company_name, phone, email, load_description, voltage, kva)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(company_name, phone, email, load_description, voltage, kva);
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
