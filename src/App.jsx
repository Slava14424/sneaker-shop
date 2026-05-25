import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./assets/components/Layout";
import CartDrawer from "./assets/components/CartDrawer";
import Home from "./pages/Home";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Couture from "./pages/Couture";
import Explore from "./pages/Explore";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import NewsDetail from "./pages/NewsDetail";

export default function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Функция применения промокода
  const applyPromo = (code) => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (code === "SNEAKER20") {
      setDiscount(subtotal * 0.2);
      return "Скидка 20% применена!";
    } else if (code === "FREESHIP") {
      setDiscount(0);
      return "Бесплатная доставка активирована!";
    } else {
      setDiscount(0);
      return "Неверный промокод";
    }
  };

  // Общие расчёты
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 500;
  const total = subtotal + shipping - discount;
  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setDiscount(0);
    setPromoCode("");
  };

  return (
    <BrowserRouter>
      <Layout cartCount={cartCount} onCartClick={() => setIsCartOpen(true)}>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/men" element={<Men addToCart={addToCart} />} />
          <Route path="/women" element={<Women addToCart={addToCart} />} />
          <Route path="/couture" element={<Couture />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/checkout" element={
            <Checkout 
              cart={cart} 
              subtotal={subtotal}
              shipping={shipping}
              discount={discount}
              total={total}
              clearCart={clearCart} 
            />
          } />
          <Route path="/news/:id" element={<NewsDetail />} />
        </Routes>
      </Layout>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
        discount={discount}
        setDiscount={setDiscount}
        applyPromo={applyPromo}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
      />
    </BrowserRouter>
  );
}