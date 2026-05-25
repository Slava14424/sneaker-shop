import { useState } from "react";
import { motion } from "framer-motion";
import { products } from "../data/products";

export default function Home({ addToCart }) {
  const [index, setIndex] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const product = products[index];

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
      {/* HERO-БЛОК */}
      <section className="h-screen flex items-center justify-center relative">
        <motion.img
          src={product.image}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 1.2 }}
          className="absolute w-[1000px] blur-md"
          alt={product.name}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-16 py-20">
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
            alt={product.name}
          />
        </motion.div>

        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl text-lime-400 mb-6">${product.price}</p>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setIndex((i) => (i - 1 + products.length) % products.length)}
              className="px-4 py-2 bg-[#222] rounded-lg hover:bg-[#333] transition"
            >
              ←
            </button>
            <button
              onClick={() => setIndex((i) => (i + 1) % products.length)}
              className="px-4 py-2 bg-[#222] rounded-lg hover:bg-[#333] transition"
            >
              →
            </button>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product)}
            className="bg-lime-400 text-black px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg"
          >
            Add to cart
          </motion.button>
        </div>
      </div>
    </div>
  );
}