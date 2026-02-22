import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, Phone, Mail, FileText, BookOpen, Briefcase, Settings, Factory, MapPin } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { ADDRESS, EMAIL, NAME_FIST_INFO, NAME_INFO, NAME_LAST_INFO, TELEPHONE_TEXT } from './SEO';

const navItems = [
  { name: 'Giới thiệu', path: '/gioi-thieu', icon: Factory },
  { name: 'Sản phẩm', path: '/san-pham', icon: Settings },
  { name: 'Năng lực', path: '/nang-luc', icon: Factory },
  { name: 'Công trình', path: '/cong-trinh', icon: Briefcase },
  { name: 'Ứng dụng', path: '/ung-dung', icon: Zap },
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
                {NAME_FIST_INFO} <span className="text-accent">{NAME_LAST_INFO}</span>
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

          {/* BRAND & DESCRIPTION */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <Zap className="h-8 w-8 text-accent fill-accent" />
              <span className="font-black text-2xl text-white uppercase tracking-tighter">
                {NAME_FIST_INFO} <span className="text-accent">{NAME_LAST_INFO}</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-xl leading-relaxed font-medium mb-6">
              Xưởng sản xuất <strong>biến áp âm ly 70V / 100V</strong> và biến áp audio theo yêu cầu.
              Chuyên quấn biến áp ghép trở kháng, biến áp xuất âm, biến áp nguồn cho ampli đèn và hệ thống loa truyền thanh.
            </p>

            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Cam kết bảo hành trọn đời sản phẩm. Sẵn sàng thu hồi sửa chữa hoặc quấn lại
              khi có lỗi kỹ thuật từ nhà sản xuất.
            </p>
            
            <p className="text-sm text-accent font-bold mt-6">
              Gửi thông số để được tư vấn công suất miễn phí.
            </p>
          </div>

          {/* SERVICES */}
          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">
              Sản phẩm & dịch vụ
            </h3>
            <ul className="space-y-4 text-sm font-medium text-slate-400">
              <li>Biến áp âm ly 70V / 100V</li>
              <li>Biến áp xuất âm (Output Transformer)</li>
              <li>Biến áp nguồn ampli đèn</li>
              <li>Gia công OEM theo yêu cầu</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">
              Liên hệ kỹ thuật
            </h3>

            <ul className="space-y-4 text-sm font-medium">

              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent" />
                {TELEPHONE_TEXT}
              </li>

              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent" />
                {EMAIL}
              </li>

              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-accent mt-1" />
                <span className="text-slate-400">
                  {ADDRESS}
                </span>
              </li>

            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-24 pt-8 border-t border-white/5 text-center space-y-3">

          <p className="text-xs text-slate-500 font-medium">
            15+ năm kinh nghiệm sản xuất biến áp âm ly tại Việt Nam
          </p>

          <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} {NAME_INFO}. ALL RIGHTS RESERVED.
          </div>

        </div>

      </div>
    </footer>
  );
}
