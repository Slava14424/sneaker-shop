import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar({ cartCount = 0, onCartClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-4 md:py-6 z-50 bg-primary backdrop-blur-xl border-b border-border"
    >
      {/* Логотип */}
      <Link to="/" className="text-xl md:text-2xl font-bold tracking-wide hover:text-lime-400 transition text-text-primary">
        SNEAKERLY
      </Link>

      {/* Десктопная навигация */}
      <nav className="hidden md:flex gap-6 lg:gap-8 text-sm text-text-secondary">
        <Link to="/women" className="hover:text-text-primary transition">Women</Link>
        <Link to="/men" className="hover:text-text-primary transition">Men</Link>
        <Link to="/couture" className="hover:text-text-primary transition">Couture</Link>
        <Link to="/explore" className="hover:text-text-primary transition">Explore</Link>
        <Link to="/profile" className="hover:text-text-primary transition">Profile</Link>
      </nav>

      {/* Мобильное меню */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-text-primary">
          {isOpen ? "✕" : "☰"}
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-primary backdrop-blur-md flex flex-col items-center gap-4 py-6 border-b border-border">
            <Link to="/women" onClick={() => setIsOpen(false)} className="text-text-primary">Women</Link>
            <Link to="/men" onClick={() => setIsOpen(false)} className="text-text-primary">Men</Link>
            <Link to="/couture" onClick={() => setIsOpen(false)} className="text-text-primary">Couture</Link>
            <Link to="/explore" onClick={() => setIsOpen(false)} className="text-text-primary">Explore</Link>
          </div>
        )}
      </div>

      {/* Правая часть – кнопки */}
      <div className="flex items-center gap-4">
        {/* Кнопка переключения темы */}
        <button
          onClick={toggleTheme}
          className="text-sm font-medium bg-transparent border border-border rounded-full px-4 py-1.5 hover:border-lime-400 transition text-text-secondary"
        >
          {theme === "dark" ? "Светлая" : "Тёмная"}
        </button>

        {/* Уведомления */}
        <div className="relative cursor-pointer group hidden sm:block">
          <span className="text-text-secondary text-sm font-medium">Новости</span>
          <span className="absolute -top-2 -right-2 bg-lime-400 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
          <div className="absolute right-0 mt-4 w-56 bg-secondary border border-border rounded-xl p-3 opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto z-50">
            <p className="text-sm mb-1 text-text-primary">Новые поступления</p>
            <p className="text-sm mb-1 text-text-primary">Скидка -20% на Nike</p>
            <p className="text-sm text-text-primary">Новые модели на этой неделе</p>
          </div>
        </div>

        {/* Корзина */}
        <button
          onClick={onCartClick}
          className="relative cursor-pointer text-sm font-medium bg-transparent border border-border rounded-full px-4 py-1.5 hover:border-lime-400 transition text-text-secondary"
        >
          Корзина
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-lime-400 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </motion.header>
  );
}