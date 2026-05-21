import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Layout from "./assets/components/Layout";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Couture from "./pages/Couture";
import Explore from "./pages/Explore";

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <BrowserRouter>
      <Layout cartCount={cart.length} onCartClick={() => setIsCartOpen(true)}>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/men" element={<Men addToCart={addToCart} />} />
          <Route path="/women" element={<Women addToCart={addToCart} />} />
          <Route path="/couture" element={<Couture addToCart={addToCart} />} />
          <Route path="/explore" element={<Explore addToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
        </Routes>
      </Layout>

      {/* Выезжающая корзина (та же, что была) */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 w-80 h-full bg-[#0f0f0f] p-5 border-l border-gray-700 z-50 shadow-2xl overflow-y-auto"
          >
            <h2 className="text-2xl mb-4">🛒 Корзина</h2>
            {cart.length === 0 ? (
              <p className="text-gray-400">Пусто</p>
            ) : (
              <>
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between bg-[#1a1a1a] p-2 rounded-lg mb-2 text-sm">
                    <span>{item.name} {item.size && `(${item.size})`}</span>
                    <span>${item.price}</span>
                  </div>
                ))}
                <div className="mt-4 pt-3 border-t border-gray-700">
                  <p className="flex justify-between font-bold">
                    <span>Итого:</span>
                    <span>${total}</span>
                  </p>
                  <button className="w-full bg-lime-400 text-black py-2 rounded-lg mt-4 font-semibold">
                    Оформить
                  </button>
                </div>
              </>
            )}
            <button onClick={() => setIsCartOpen(false)} className="mt-4 text-gray-400 text-sm">
              Закрыть
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}