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

export default function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <BrowserRouter>
      <Layout cartCount={cartCount} onCartClick={() => setIsCartOpen(true)}>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/men" element={<Men addToCart={addToCart} />} />
          <Route path="/women" element={<Women addToCart={addToCart} />} />
          <Route path="/couture" element={<Couture addToCart={addToCart} />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/checkout" element={<Checkout cart={cart} total={total} clearCart={clearCart} />} />
        </Routes>
      </Layout>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
    </BrowserRouter>
  );
}