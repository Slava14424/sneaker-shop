import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar({ cartCount = 0, onCartClick }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-4 md:py-6 z-50 bg-black/40 backdrop-blur-xl border-b border-gray-800"
    >
      <Link to="/" className="text-xl md:text-2xl font-bold tracking-wide hover:text-lime-400 transition">
        SNEAKERLY
      </Link>

      <nav className="hidden md:flex gap-6 lg:gap-8 text-sm text-gray-300">
        <Link to="/women" className="hover:text-white transition">Women</Link>
        <Link to="/men" className="hover:text-white transition">Men</Link>
        <Link to="/couture" className="hover:text-white transition">Couture</Link>
        <Link to="/explore" className="hover:text-white transition">Explore</Link>
      </nav>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl">
          {isOpen ? "✕" : "☰"}
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md flex flex-col items-center gap-4 py-6 border-b border-gray-700">
            <Link to="/women" onClick={() => setIsOpen(false)}>Women</Link>
            <Link to="/men" onClick={() => setIsOpen(false)}>Men</Link>
            <Link to="/couture" onClick={() => setIsOpen(false)}>Couture</Link>
            <Link to="/explore" onClick={() => setIsOpen(false)}>Explore</Link>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Уведомления (без смайликов) */}
        <div className="relative cursor-pointer group hidden sm:block">
          <span className="text-gray-300 text-sm">Уведомления</span>
          <span className="absolute -top-2 -right-2 bg-lime-400 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
          <div className="absolute right-0 mt-4 w-56 bg-[#111] border border-gray-800 rounded-xl p-3 opacity-0 group-hover:opacity-100 transition pointer-events-none group-hover:pointer-events-auto z-50">
            <p className="text-sm mb-1">Новые поступления</p>
            <p className="text-sm mb-1">Скидка -20% на Nike</p>
            <p className="text-sm">Новые модели на этой неделе</p>
          </div>
        </div>

        {/* Корзина – текст вместо смайлика */}
        <button onClick={onCartClick} className="relative cursor-pointer text-sm font-medium bg-transparent border border-gray-600 rounded-full px-4 py-1.5 hover:border-lime-400 transition">
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