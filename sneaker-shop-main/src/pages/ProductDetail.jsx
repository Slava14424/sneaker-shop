import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { products } from "../data/products";
import { motion } from "framer-motion";

export default function ProductDetail({ addToCart }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "M");
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "Black");
  const [orderOption, setOrderOption] = useState("order");

  if (!product) {
    return (
      <div className="bg-primary text-text-primary text-center py-20">
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
      option: orderOption,
      quantity: 1
    });
  };

  const handleOneClickBuy = () => {
    addToCart({
      ...product,
      size: selectedSize,
      color: selectedColor,
      option: orderOption,
      quantity: 1
    });
    // Явный переход на страницу оформления заказа
    navigate("/checkout");
  };

  return (
    <div className="bg-primary text-text-primary min-h-screen px-4 md:px-12 py-8">
      <div className="text-sm text-text-muted mb-6">
        <Link to="/" className="hover:text-text-primary">Home</Link> /{" "}
        <Link to={`/${product.category}`} className="hover:text-text-primary">
          {product.category === "women" ? "Women" : product.category === "men" ? "Men" : "Couture"}
        </Link> / Shoes / Sneakers
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-card rounded-2xl p-6 flex justify-center items-center border border-border h-[500px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl"
            onError={(e) => {
              e.target.src = "https://picsum.photos/seed/fallback/600/600";
            }}
          />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary">{product.brand || "Brand"}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex text-yellow-400">
              {"★".repeat(Math.floor(product.rating || 4))}
              {"☆".repeat(5 - Math.floor(product.rating || 4))}
            </div>
            <span className="text-text-muted text-sm">{product.reviews || 0} reviews</span>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-text-primary mt-4">{product.name}</h2>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-3xl font-bold text-lime-400">${product.price}</span>
            {product.oldPrice && (
              <span className="text-text-muted line-through text-xl">${product.oldPrice}</span>
            )}
          </div>
          <hr className="my-6 border-border" />
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-text-primary">Size chart</span>
            <button className="text-sm text-lime-400 hover:underline">Size guide</button>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {["S", "M", "L", "XL"].map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-lg border transition ${
                  selectedSize === size
                    ? "border-lime-400 bg-lime-400/10 text-lime-400 font-medium"
                    : "border-border text-text-secondary hover:border-lime-400/50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <div className="mb-6">
            <span className="font-semibold block mb-2 text-text-primary">Color</span>
            <div className="flex flex-wrap gap-3">
              {["Black", "White", "Red"].map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-lg border transition ${
                    selectedColor === color
                      ? "border-lime-400 bg-lime-400/10 text-lime-400 font-medium"
                      : "border-border text-text-secondary hover:border-lime-400/50"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <span className="font-semibold block mb-2 text-text-primary">Available options:</span>
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
                <span className="text-text-secondary">To order <span className="text-lime-400 font-bold">${product.price}</span></span>
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
                <span className="text-text-secondary">In stock <span className="text-text-muted">${product.price + 80}</span></span>
              </label>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 mb-6 border border-border">
            <p className="text-sm text-text-secondary">Order delivery point — free of charge</p>
            <p className="text-sm text-text-muted mt-1">Delivery tomorrow or later</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-lime-400 text-black font-bold py-3 rounded-xl hover:bg-lime-500 transition shadow-md"
            >
              Add to cart
            </button>
            <button
              onClick={handleOneClickBuy}
              className="flex-1 border border-border text-text-secondary font-semibold py-3 rounded-xl hover:bg-card-hover hover:border-lime-400 transition"
            >
              One-click buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}