import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CategoryPage({ title, products, addToCart }) {
  return (
    <div className="px-6 md:px-12 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold mb-8"
      >
        {title}
      </motion.h1>

      {products.length === 0 ? (
        <p className="text-gray-400">Нет товаров в этой категории.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.02 }}
              className="bg-[#111] rounded-2xl p-4 border border-gray-800 relative"
            >
              {/* Ссылка на страницу товара – оборачивает почти всю карточку */}
              <Link to={`/product/${product.id}`} className="block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/300?text=No+Image")}
                />
                <h3 className="text-xl font-semibold hover:text-lime-400 transition">
                  {product.name}
                </h3>
                <p className="text-lime-400 text-lg mt-1">${product.price}</p>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">{product.desc}</p>
              </Link>
              {/* Кнопка "В корзину" – без Link, чтобы не переходило на страницу */}
              <button
                onClick={(e) => {
                  e.preventDefault();      // останавливаем переход по ссылке
                  e.stopPropagation();     // дополнительная страховка
                  addToCart(product);
                }}
                className="mt-4 bg-lime-400 text-black px-4 py-2 rounded-xl w-full font-semibold hover:bg-lime-500 transition"
              >
                В корзину
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}