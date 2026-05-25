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

  // Валидация (та же, что и раньше)
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
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#050505] text-white min-h-screen pt-28 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Корзина пуста</h1>
        <p className="text-gray-400 mb-6">Добавьте товары, чтобы оформить заказ.</p>
        <button onClick={() => navigate("/")} className="bg-lime-400 text-black px-6 py-3 rounded-xl font-semibold">
          На главную
        </button>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#050505] text-white min-h-screen pt-28 px-4 md:px-12 pb-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Оформление заказа</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-5 bg-[#0f0f0f] p-6 rounded-2xl border border-gray-800">
              {/* Поля формы с валидацией – без изменений, они были ранее */}
              <div>
                <label className="block text-sm font-medium mb-1">Полное имя *</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className={`w-full bg-[#1a1a1a] border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2 focus:outline-none focus:border-lime-400`} />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} className={`w-full bg-[#1a1a1a] border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2 focus:outline-none focus:border-lime-400`} />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Телефон *</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+7 (123) 456-78-90" className={`w-full bg-[#1a1a1a] border ${errors.phone ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2 focus:outline-none focus:border-lime-400`} />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Адрес *</label>
                <input type="text" name="address" required value={formData.address} onChange={handleChange} className={`w-full bg-[#1a1a1a] border ${errors.address ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2 focus:outline-none focus:border-lime-400`} />
                {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Город *</label>
                <input type="text" name="city" required value={formData.city} onChange={handleChange} placeholder="Москва, Санкт-Петербург, Королёв 1" className={`w-full bg-[#1a1a1a] border ${errors.city ? 'border-red-500' : 'border-gray-700'} rounded-lg px-4 py-2 focus:outline-none focus:border-lime-400`} />
                {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Способ оплаты</label>
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-lime-400">
                  <option value="card">Банковская карта</option>
                  <option value="cash">Наличные при получении</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-lime-400 text-black py-3 rounded-xl font-bold hover:bg-lime-500 transition disabled:opacity-50">
                {isSubmitting ? "Обработка..." : "Подтвердить заказ"}
              </button>
            </form>
          </div>

          <div className="bg-[#0f0f0f] p-6 rounded-2xl border border-gray-800 h-fit">
            <h2 className="text-xl font-bold mb-4">Ваш заказ</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-3 space-y-2">
              <div className="flex justify-between"><span>Товары</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Доставка</span><span>{shipping === 0 ? "Бесплатно" : `$${shipping.toFixed(2)}`}</span></div>
              {discount > 0 && <div className="flex justify-between text-lime-400"><span>Скидка</span><span>-${discount.toFixed(2)}</span></div>}
              <div className="flex justify-between font-bold text-lg"><span>Итого</span><span className="text-lime-400">${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}