import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Checkout({ cart, subtotal, shipping, discount, total, clearCart }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "card"
  });

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (value.length < 2) return "Минимум 2 символа";
        if (value.length > 50) return "Максимум 50 символов";
        if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value)) return "Только буквы, пробелы и дефисы";
        return "";
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value)) return "Введите корректный email";
        return "";
      case "phone":
        if (!/^[\d\s+\-()]+$/.test(value) || value.length < 5 || value.length > 20)
          return "Введите корректный номер телефона";
        return "";
      case "address":
        if (value.length < 3) return "Минимум 3 символа";
        if (value.length > 100) return "Максимум 100 символов";
        return "";
      case "city":
        if (value.length < 2) return "Минимум 2 символа";
        if (value.length > 50) return "Максимум 50 символов";
        if (!/^[a-zA-Zа-яА-ЯёЁ\s\d-]+$/.test(value)) return "Только буквы, цифры, пробелы и дефисы";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== "paymentMethod") {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Заказ успешно оформлен! Спасибо за покупку.");
      clearCart();
      navigate("/");
    }, 1000);
    // Сохраняем заказ в localStorage
const order = {
  id: Date.now(),
  date: new Date().toLocaleDateString(),
  items: cart.map(item => ({
    name: item.name,
    quantity: item.quantity,
    price: item.price
  })),
  total: total,
  status: "Оплачен"
};

// Получаем существующие заказы
const savedOrders = localStorage.getItem("userOrders");
const orders = savedOrders ? JSON.parse(savedOrders) : [];
orders.unshift(order); // новый заказ в начало
localStorage.setItem("userOrders", JSON.stringify(orders));

// Обновляем статистику
const savedStats = localStorage.getItem("userStats");
if (savedStats) {
  const stats = JSON.parse(savedStats);
  stats.totalOrders += 1;
  stats.totalSpent += total;
  stats.lastVisit = new Date().toLocaleDateString();
  localStorage.setItem("userStats", JSON.stringify(stats));
} else {
  const newStats = {
    totalOrders: 1,
    totalSpent: total,
    lastVisit: new Date().toLocaleDateString()
  };
  localStorage.setItem("userStats", JSON.stringify(newStats));
}

// Очищаем корзину
clearCart();

// Перенаправляем в профиль на вкладку заказов (опционально)
setTimeout(() => {
  navigate("/profile?tab=orders");
}, 500);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-primary text-text-primary min-h-screen pt-28 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Корзина пуста</h1>
        <p className="text-text-muted mb-6">Добавьте товары, чтобы оформить заказ.</p>
        <button onClick={() => navigate("/")} className="bg-lime-400 text-black px-6 py-3 rounded-xl font-semibold">
          На главную
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-primary text-text-primary min-h-screen pt-28 px-4 md:px-12 pb-12"
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Оформление заказа</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-5 bg-secondary p-6 rounded-2xl border border-border">
              <div>
                <label className="block text-sm font-medium mb-1 text-text-primary">Полное имя *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-card-hover border ${errors.name ? 'border-red-500' : 'border-border'} rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-lime-400`}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-text-primary">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-card-hover border ${errors.email ? 'border-red-500' : 'border-border'} rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-lime-400`}
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-text-primary">Телефон *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 (123) 456-78-90"
                  className={`w-full bg-card-hover border ${errors.phone ? 'border-red-500' : 'border-border'} rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-lime-400`}
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-text-primary">Адрес *</label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full bg-card-hover border ${errors.address ? 'border-red-500' : 'border-border'} rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-lime-400`}
                />
                {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-text-primary">Город *</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Москва, Санкт-Петербург, Королёв 1"
                  className={`w-full bg-card-hover border ${errors.city ? 'border-red-500' : 'border-border'} rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-lime-400`}
                />
                {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-text-primary">Способ оплаты</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full bg-card-hover border border-border rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-lime-400"
                >
                  <option value="card">Банковская карта</option>
                  <option value="cash">Наличные при получении</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-lime-400 text-black py-3 rounded-xl font-bold hover:bg-lime-500 transition disabled:opacity-50"
              >
                {isSubmitting ? "Обработка..." : "Подтвердить заказ"}
              </button>
            </form>
          </div>

          <div className="bg-secondary p-6 rounded-2xl border border-border h-fit">
            <h2 className="text-xl font-bold mb-4 text-text-primary">Ваш заказ</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-text-primary">{item.name} x{item.quantity}</span>
                  <span className="text-text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2">
              <div className="flex justify-between">
                <span className="text-text-muted">Товары</span>
                <span className="text-text-primary">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Доставка</span>
                <span className="text-text-primary">{shipping === 0 ? "Бесплатно" : `$${shipping.toFixed(2)}`}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-lime-400">
                  <span>Скидка</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg">
                <span className="text-text-primary">Итого</span>
                <span className="text-lime-400">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}