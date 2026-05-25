import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar({ cartCount = 0, onCartClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Демо-данные уведомлений (можно вынести в отдельный файл или API)
  const notifications = [
    {
      id: 1,
      title: "🔥 Новые дропы Nike",
      description: "Air Max 90 в новых расцветках уже в продаже",
      date: "10 мин назад",
      icon: "🔥",
      read: false,
    },
    {
      id: 2,
      title: "⚡ Скидка 20% на Adidas",
      description: "Промокод ADIDAS20 действует до конца недели",
      date: "2 часа назад",
      icon: "⚡",
      read: false,
    },
    {
      id: 3,
      title: "👟 Новые поступления",
      description: "Yeezy 350 V2 и Balenciaga Track в наличии",
      date: "вчера",
      icon: "👟",
      read: true,
    },
    {
      id: 4,
      title: "🎁 Бесплатная доставка",
      description: "При заказе от 5000₽ — доставка бесплатно",
      date: "2 дня назад",
      icon: "🎁",
      read: true,
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

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
        {/* Уведомления */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative text-xl hover:text-lime-400 transition"
          >
            🔔
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notificationsOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setNotificationsOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-80 md:w-96 bg-[#111] border border-gray-700 rounded-2xl shadow-2xl z-50 overflow-hidden"
                >
                  <div className="flex justify-between items-center p-4 border-b border-gray-800">
                    <h3 className="font-bold">Уведомления</h3>
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-gray-400">
                        Нет новых уведомлений
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-4 border-b border-gray-800 hover:bg-[#1a1a1a] transition cursor-pointer ${
                            !n.read ? "bg-lime-400/5" : ""
                          }`}
                        >
                          <div className="flex gap-3">
                            <div className="text-2xl">{n.icon}</div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <h4 className="font-semibold text-sm">{n.title}</h4>
                                <span className="text-xs text-gray-500">{n.date}</span>
                              </div>
                              <p className="text-xs text-gray-400 mt-1">{n.description}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-3 text-center border-t border-gray-800">
                    <button className="text-xs text-lime-400 hover:underline">
                      Показать все
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Корзина */}
        <button onClick={onCartClick} className="relative text-xl hover:text-lime-400 transition">
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-3 bg-lime-400 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </motion.header>
  );
}