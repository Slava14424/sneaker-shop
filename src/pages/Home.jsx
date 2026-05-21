import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../data/products";

export default function Home() {
  const [index, setIndex] = useState(0);
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const product = products[index];

  const addToCart = () => {
    setCart([...cart, product]);
    setOpen(true);
  };

  const total = cart.reduce((s, i) => s + i.price, 0);

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = -((y - r.height / 2) / r.height) * 25;
    const ry = ((x - r.width / 2) / r.width) * 25;
    setTilt({ x: rx, y: ry });
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen overflow-hidden font-sans">
      {/* ВЫЕЗЖАЮЩАЯ КОРЗИНА */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed right-0 top-0 w-[350px] h-full bg-[#0f0f0f] p-6 border-l border-gray-800 z-50"
          >
            <h2 className="text-2xl mb-4">Cart</h2>
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between bg-[#1a1a1a] p-3 rounded-xl mb-2">
                <span>{item.name}</span>
                <span>${item.price}</span>
              </div>
            ))}
            <div className="mt-6 border-t border-gray-700 pt-4">
              <p className="flex justify-between">
                <span>Total:</span>
                <span>${total}</span>
              </p>
              <button className="w-full bg-lime-400 text-black py-3 rounded-xl mt-4">
                Checkout
              </button>
              <button onClick={() => setOpen(false)} className="w-full mt-2 text-gray-400">
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Остальной контент (hero + блок с товаром) – без изменений */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 w-full flex justify-between items-center px-12 py-6 z-50 bg-black/40 backdrop-blur-xl border-b border-gray-800"
      >
        <nav className="flex gap-8 text-sm text-gray-300">
          <a href="/women" className="hover:text-white cursor-pointer">Women</a>
          <a href="/men" className="hover:text-white cursor-pointer">Men</a>
          <a href="/couture" className="hover:text-white cursor-pointer">Couture</a>
          <a href="/explore" className="hover:text-white cursor-pointer">Explore</a>
        </nav>

        <div className="text-lg font-bold tracking-wide">Sneakerly</div>

        <div className="flex items-center gap-6">
          {/* Уведомления */}
          <div className="relative cursor-pointer group">
            🔔
            <span className="absolute -top-2 -right-2 bg-lime-400 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
            <div className="absolute right-0 mt-4 w-64 bg-[#111] border border-gray-800 rounded-xl p-4 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none group-hover:pointer-events-auto">
              <p className="text-sm mb-2">🔥 New drops available</p>
              <p className="text-sm mb-2">⚡ -20% on Nike</p>
              <p className="text-sm">👟 New arrivals this week</p>
            </div>
          </div>

          {/* Корзина (иконка счётчика) */}
          <div onClick={() => setOpen(true)} className="cursor-pointer">
            🛒 {cart.length}
          </div>
        </div>
      </motion.header>

      {/* HERO */}
      <section className="h-screen flex items-center justify-center relative">
        <motion.img
          src={product.image}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 1.2 }}
          className="absolute w-[1000px] blur-md"
        />
        <div className="z-10 text-center">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-7xl font-extrabold tracking-tight mb-6"
          >
            FUTURE SNEAKERS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 mb-8"
          >
            Premium design. Next-gen comfort.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
            className="bg-lime-400 text-black px-10 py-4 rounded-2xl font-semibold shadow-lg"
          >
            SHOP NOW
          </motion.button>
        </div>
      </section>

      {/* БЛОК ТОВАРА С 3D-НАКЛОНОМ */}
      <div className="grid grid-cols-2 gap-16 px-16 py-20">
        <motion.div
          onMouseMove={handleMove}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          style={{ perspective: 1200 }}
          className="bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-3xl p-10 flex justify-center items-center h-[500px] shadow-2xl"
        >
          <motion.img
            src={product.image}
            animate={{ rotateX: tilt.x, rotateY: tilt.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="h-[350px] drop-shadow-2xl"
          />
        </motion.div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-lime-400 mb-6">${product.price}</p>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setIndex((i) => (i - 1 + products.length) % products.length)}
              className="px-4 py-2 bg-[#222] rounded-lg"
            >
              ←
            </button>
            <button
              onClick={() => setIndex((i) => (i + 1) % products.length)}
              className="px-4 py-2 bg-[#222] rounded-lg"
            >
              →
            </button>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addToCart}
            className="bg-lime-400 text-black px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg"
          >
            Add to cart
          </motion.button>
        </div>
      </div>
    </div>
  );
}