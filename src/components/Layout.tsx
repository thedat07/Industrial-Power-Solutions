import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, Phone, Mail, FileText, BookOpen, Briefcase, Settings, Factory } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const navItems = [
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
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Zap className="h-8 w-8 text-emerald-600 fill-emerald-600" />
              <span className="font-bold text-xl tracking-tight text-slate-900 hidden sm:block">
                INDUSTRIAL POWER
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname.startsWith(item.path)
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/gui-thong-so"
              className="ml-4 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-all shadow-sm"
            >
              Nhận báo giá
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-emerald-600 hover:bg-slate-100"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 animate-in slide-in-from-top duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium",
                  location.pathname.startsWith(item.path)
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
            <Link
              to="/gui-thong-so"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-base font-medium text-white bg-emerald-600 rounded-md"
            >
              <Mail className="h-5 w-5" />
              Nhận báo giá kỹ thuật
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-6 w-6 text-emerald-500" />
              <span className="font-bold text-lg text-white">INDUSTRIAL POWER SOLUTIONS</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              Trung tâm giải pháp ổn định nguồn điện công nghiệp. Chúng tôi không chỉ cung cấp thiết bị, chúng tôi giải quyết các vấn đề về chất lượng điện năng cho nhà máy.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Liên hệ kỹ thuật</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-500" />
                0900-123-456
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-500" />
                kythuat@industrialpower.vn
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Văn phòng</h3>
            <p className="text-sm text-slate-400">
              Khu Công Nghiệp Quang Minh, Mê Linh, Hà Nội
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Industrial Power Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
