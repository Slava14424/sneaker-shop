import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: ""
  });
  const [errors, setErrors] = useState({});
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    lastVisit: new Date().toLocaleDateString()
  });
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab") === "orders" ? "orders" : "profile";
  });
  const [isEditing, setIsEditing] = useState(false);

  // Загрузка данных
  useEffect(() => {
    const savedUser = localStorage.getItem("userProfile");
    if (savedUser) setUserInfo(JSON.parse(savedUser));

    const savedOrders = localStorage.getItem("userOrders");
    if (savedOrders) setOrders(JSON.parse(savedOrders));

    const savedStats = localStorage.getItem("userStats");
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    } else {
      const initialStats = {
        totalOrders: 0,
        totalSpent: 0,
        lastVisit: new Date().toLocaleDateString()
      };
      localStorage.setItem("userStats", JSON.stringify(initialStats));
      setStats(initialStats);
    }
  }, []);

  // Функции валидации
  const validateName = (name) => {
    if (!name.trim()) return "Имя обязательно";
    if (name.length < 2) return "Минимум 2 символа";
    if (name.length > 50) return "Максимум 50 символов";
    if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(name)) return "Только буквы, пробелы и дефисы";
    return "";
  };

  const validateEmail = (email) => {
    if (!email.trim()) return "Email обязателен";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Введите корректный email (например, name@domain.com)";
    return "";
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) return "Телефон обязателен";
    if (!/^[\d\s+\-()]+$/.test(phone) || phone.length < 5 || phone.length > 20)
      return "Введите корректный номер телефона (только цифры, +, -, пробелы, скобки)";
    return "";
  };

  const validateAddress = (address) => {
    if (!address.trim()) return "Адрес обязателен";
    if (address.length < 3) return "Минимум 3 символа";
    if (address.length > 100) return "Максимум 100 символов";
    return "";
  };

  const validateCity = (city) => {
    if (!city.trim()) return "Город обязателен";
    if (city.length < 2) return "Минимум 2 символа";
    if (city.length > 50) return "Максимум 50 символов";
    if (!/^[a-zA-Zа-яА-ЯёЁ\s\d-]+$/.test(city))
      return "Только буквы, цифры, пробелы и дефисы";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });

    // Очищаем ошибку для этого поля при вводе
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: validateName(userInfo.name),
      email: validateEmail(userInfo.email),
      phone: validatePhone(userInfo.phone),
      address: validateAddress(userInfo.address),
      city: validateCity(userInfo.city)
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(err => err !== "");
  };

  const handleSaveProfile = () => {
    if (validateForm()) {
      localStorage.setItem("userProfile", JSON.stringify(userInfo));
      setIsEditing(false);
      alert("Профиль сохранён");
    } else {
      alert("Исправьте ошибки в форме");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Вы уверены, что хотите выйти? Данные вашего профиля и заказов останутся в системе.")) {
      navigate("/");
    }
  };

  return (
    <div className="bg-primary text-text-primary min-h-screen pt-28 px-4 md:px-12 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Профиль</h1>

        {/* Вкладки */}
        <div className="flex gap-4 border-b border-border mb-6">
          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-2 px-1 font-medium transition ${
              activeTab === "profile"
                ? "text-lime-400 border-b-2 border-lime-400"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            Личные данные
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-2 px-1 font-medium transition ${
              activeTab === "orders"
                ? "text-lime-400 border-b-2 border-lime-400"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            История заказов
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`pb-2 px-1 font-medium transition ${
              activeTab === "stats"
                ? "text-lime-400 border-b-2 border-lime-400"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            Статистика
          </button>
        </div>

        {/* Вкладка: Личные данные */}
        {activeTab === "profile" && (
          <div className="bg-card rounded-2xl p-6 border border-border">
            {!isEditing ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Информация о пользователе</h2>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-lime-400 text-sm hover:underline"
                  >
                    Редактировать
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-text-muted text-sm">Имя</p>
                    <p className="font-medium">{userInfo.name || "Не указано"}</p>
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">Email</p>
                    <p className="font-medium">{userInfo.email || "Не указан"}</p>
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">Телефон</p>
                    <p className="font-medium">{userInfo.phone || "Не указан"}</p>
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">Адрес</p>
                    <p className="font-medium">{userInfo.address || "Не указан"}</p>
                  </div>
                  <div>
                    <p className="text-text-muted text-sm">Город</p>
                    <p className="font-medium">{userInfo.city || "Не указан"}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="mt-6 text-red-400 text-sm hover:text-red-300 transition"
                >
                  Выйти из профиля
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Редактирование профиля</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Имя *</label>
                    <input
                      type="text"
                      name="name"
                      value={userInfo.name}
                      onChange={handleChange}
                      className={`w-full bg-card-hover border ${
                        errors.name ? "border-red-500" : "border-border"
                      } rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-lime-400`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={userInfo.email}
                      onChange={handleChange}
                      className={`w-full bg-card-hover border ${
                        errors.email ? "border-red-500" : "border-border"
                      } rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-lime-400`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Телефон *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={userInfo.phone}
                      onChange={handleChange}
                      className={`w-full bg-card-hover border ${
                        errors.phone ? "border-red-500" : "border-border"
                      } rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-lime-400`}
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Адрес *</label>
                    <input
                      type="text"
                      name="address"
                      value={userInfo.address}
                      onChange={handleChange}
                      className={`w-full bg-card-hover border ${
                        errors.address ? "border-red-500" : "border-border"
                      } rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-lime-400`}
                    />
                    {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Город *</label>
                    <input
                      type="text"
                      name="city"
                      value={userInfo.city}
                      onChange={handleChange}
                      className={`w-full bg-card-hover border ${
                        errors.city ? "border-red-500" : "border-border"
                      } rounded-lg px-4 py-2 text-text-primary focus:outline-none focus:border-lime-400`}
                    />
                    {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleSaveProfile}
                    className="bg-lime-400 text-black px-6 py-2 rounded-xl font-semibold hover:bg-lime-500 transition"
                  >
                    Сохранить
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="border border-border px-6 py-2 rounded-xl text-text-secondary hover:bg-card-hover transition"
                  >
                    Отмена
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Вкладка: История заказов */}
        {activeTab === "orders" && (
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="text-xl font-bold mb-4">Ваши заказы</h2>
            {orders.length === 0 ? (
              <p className="text-text-muted">У вас пока нет заказов.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-border rounded-xl p-4 bg-card-hover/20">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <p className="font-bold text-text-primary">Заказ #{order.id}</p>
                        <p className="text-sm text-text-muted">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lime-400 font-bold">${order.total.toFixed(2)}</p>
                        <p className="text-xs text-text-muted">{order.status}</p>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-text-secondary">
                      {order.items.map((item, idx) => (
                        <span key={idx}>
                          {item.name} x{item.quantity}
                          {idx < order.items.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Вкладка: Статистика */}
        {activeTab === "stats" && (
          <div className="bg-card rounded-2xl p-6 border border-border">
            <h2 className="text-xl font-bold mb-4">Статистика посещений и покупок</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card-hover rounded-xl p-4 text-center">
                <p className="text-text-muted text-sm">Всего заказов</p>
                <p className="text-3xl font-bold text-lime-400">{stats.totalOrders}</p>
              </div>
              <div className="bg-card-hover rounded-xl p-4 text-center">
                <p className="text-text-muted text-sm">Потрачено</p>
                <p className="text-3xl font-bold text-lime-400">${stats.totalSpent.toFixed(2)}</p>
              </div>
              <div className="bg-card-hover rounded-xl p-4 text-center">
                <p className="text-text-muted text-sm">Последний визит</p>
                <p className="text-lg font-semibold text-text-primary">{stats.lastVisit}</p>
              </div>
            </div>
            <div className="mt-6 text-center text-text-muted text-sm">
              Каждый новый заказ увеличивает вашу статистику.
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}