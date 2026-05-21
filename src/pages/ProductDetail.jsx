import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { products } from "../data/products";
import { motion } from "framer-motion";

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "");
  const [orderOption, setOrderOption] = useState("order"); // "order" или "stock"

  if (!product) {
    return (
      <div className="text-white text-center py-20">
        Товар не найден
        <Link to="/" className="block text-lime-400 mt-4">Вернуться на главную</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      ...product,
      size: selectedSize,
      color: selectedColor,
      option: orderOption
    });
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen px-4 md:px-12 py-8">
      {/* Хлебные крошки */}
      <div className="text-sm text-gray-400 mb-6">
        <Link to="/" className="hover:text-white">Home</Link> /{" "}
        <Link to={`/${product.category}`} className="hover:text-white">
          {product.category === "women" ? "Women" : product.category === "men" ? "Men" : "Couture"}
        </Link> / Shoes / Sneakers
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Левая колонка – изображение */}
        <div className="bg-[#111] rounded-2xl p-6 flex justify-center items-center border border-gray-800">
          <img src={product.image} alt={product.name} className="w-full max-h-[500px] object-contain" />
        </div>

        {/* Правая колонка – детали */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{product.brand}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex text-yellow-400">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="text-gray-400 text-sm">{product.reviews} reviews</span>
          </div>

          <h2 className="text-xl md:text-2xl font-semibold mt-4">{product.name}</h2>

          <div className="flex items-center gap-3 mt-3">
            <span className="text-2xl font-bold text-lime-400">${product.price}</span>
            {product.oldPrice && (
              <span className="text-gray-400 line-through">${product.oldPrice}</span>
            )}
          </div>

          <hr className="my-6 border-gray-800" />

          {/* Size chart + выбор размера */}
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Size chart</span>
            <button className="text-sm text-lime-400">Size guide</button>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {product.sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-lg border ${
                  selectedSize === size
                    ? "border-lime-400 bg-lime-400/10 text-lime-400"
                    : "border-gray-700 hover:border-gray-500"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Цвета */}
          <div className="mb-6">
            <span className="font-semibold block mb-2">Color</span>
            <div className="flex flex-wrap gap-3">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-lg border ${
                    selectedColor === color
                      ? "border-lime-400 bg-lime-400/10 text-lime-400"
                      : "border-gray-700 hover:border-gray-500"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Available options (To order / In stock) */}
          <div className="mb-6">
            <span className="font-semibold block mb-2">Available options:</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="option"
                  value="order"
                  checked={orderOption === "order"}
                  onChange={() => setOrderOption("order")}
                  className="accent-lime-400"
                />
                <span>To order <span className="text-lime-400">${product.price}</span></span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="option"
                  value="stock"
                  checked={orderOption === "stock"}
                  onChange={() => setOrderOption("stock")}
                  className="accent-lime-400"
                />
                <span>In stock <span className="text-gray-400">${product.price + 80}</span></span>
              </label>
            </div>
          </div>

          {/* Доставка */}
          <div className="bg-[#111] rounded-xl p-4 mb-6 border border-gray-800">
            <p className="text-sm text-gray-300">{product.delivery || "Order delivery point — free of charge"}</p>
            <p className="text-sm text-gray-400 mt-1">{product.deliveryDate || "Delivery tomorrow or later"}</p>
          </div>

          {/* Кнопки */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-lime-400 text-black py-3 rounded-xl font-semibold hover:bg-lime-500 transition"
            >
              Add to cart
            </button>
            <button className="flex-1 border border-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-800 transition">
              One-click buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}