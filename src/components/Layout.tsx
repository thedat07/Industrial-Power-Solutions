import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, Phone, Mail, FileText, BookOpen, Briefcase, Settings, Factory } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const navItems = [
  { name: 'Giới thiệu', path: '/gioi-thieu', icon: Factory },
  { name: 'Sản phẩm', path: '/san-pham', icon: Settings },
  { name: 'Năng lực', path: '/nang-luc', icon: Factory },
  { name: 'Công trình', path: '/cong-trinh', icon: Briefcase },
  { name: 'Ứng dụng', path: '/ung-dung', icon: Zap },
  { name: 'Tài liệu', path: '/tai-lieu', icon: FileText },
  { name: 'Kỹ thuật', path: '/kien-thuc', icon: BookOpen },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Zap className="h-8 w-8 text-accent fill-accent" />
              <span className="font-black text-xl tracking-tighter text-slate-900 hidden sm:block uppercase">
                IPS <span className="text-accent">Industrial</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  location.pathname === item.path
                    ? "text-accent bg-orange-50"
                    : "text-slate-600 hover:text-accent hover:bg-slate-50"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/gui-thong-so"
              className="ml-4 px-6 py-3 bg-accent text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-orange-900/20"
            >
              Nhận báo giá
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-accent hover:bg-slate-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest",
                location.pathname === item.path
                  ? "text-accent bg-orange-50"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
          <Link
            to="/gui-thong-so"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-4 text-xs font-black uppercase tracking-widest text-white bg-accent rounded-xl shadow-lg shadow-orange-900/20"
          >
            <Mail className="h-4 w-4" />
            Nhận báo giá kỹ thuật
          </Link>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <Zap className="h-8 w-8 text-accent fill-accent" />
              <span className="font-black text-2xl text-white uppercase tracking-tighter">IPS <span className="text-accent">Industrial</span></span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed font-medium">
              Nhà sản xuất thiết bị điện công nghiệp hàng đầu Việt Nam. Chuyên sâu giải pháp ổn định điện áp và biến áp hạ thế cho các dây chuyền sản xuất tự động hóa.
            </p>
          </div>
          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">Liên hệ kỹ thuật</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent" />
                0900-123-456
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent" />
                baogia@ips-power.vn
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">Nhà máy sản xuất</h3>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              Lô CN-08, Khu Công Nghiệp Quang Minh, Mê Linh, Hà Nội, Việt Nam.
            </p>
          </div>
        </div>
        <div className="mt-24 pt-8 border-t border-white/5 text-center text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} IPS INDUSTRIAL POWER SOLUTIONS. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
}
