import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./assets/components/Layout";
import CartDrawer from "./assets/components/CartDrawer";
import Home from "./pages/Home";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Couture from "./pages/Couture";
import Explore from "./pages/Explore";
import ProductDetail from "./pages/ProductDetail";

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Добавление товара (с количеством)
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

  // Изменение количества
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

  // Удаление товара
  const removeItem = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  return (
    <BrowserRouter>
      <Layout cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} onCartClick={() => setIsCartOpen(true)}>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/men" element={<Men addToCart={addToCart} />} />
          <Route path="/women" element={<Women addToCart={addToCart} />} />
          <Route path="/couture" element={<Couture addToCart={addToCart} />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
        </Routes>
      </Layout>

      {/* Корзина вынесена в отдельный компонент */}
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