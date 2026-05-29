import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CartDrawer({
  isOpen, onClose, cart, updateQuantity, removeItem,
  discount, setDiscount, applyPromo, subtotal, shipping, total
}) {
  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState("");

  const handleApplyPromo = () => {
    const message = applyPromo(promoInput);
    alert(message);
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 w-full max-w-md h-full bg-secondary shadow-2xl z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-5 border-b border-border">
              <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                Корзина
                <span className="text-sm text-text-muted bg-card-hover px-2 py-1 rounded-full">
                  {cart.reduce((acc, i) => acc + i.quantity, 0)} товаров
                </span>
              </h2>
              <button onClick={onClose} className="text-2xl text-text-muted hover:text-lime-400 transition">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 text-text-muted"></div>
                  <p className="text-text-muted">Корзина пуста</p>
                  <Link
                    to="/men"
                    onClick={onClose}
                    className="inline-block mt-4 bg-lime-400 text-black px-4 py-2 rounded-xl font-semibold hover:bg-lime-500 transition"
                  >
                    Перейти к покупкам
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-card-hover rounded-xl p-3 border border-border">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-text-primary">{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-text-muted hover:text-red-500 transition text-xl leading-none"
                          aria-label="Удалить"
                        >
                          ×
                        </button>
                      </div>
                      <p className="text-sm text-text-muted mt-1">
                        {item.size && `Размер: ${item.size} | `}
                        {item.color && `Цвет: ${item.color}`}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-2 border border-border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-text-primary hover:bg-card-hover transition"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-text-primary">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-text-primary hover:bg-card-hover transition"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lime-400 text-lg">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-border p-5 space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Промокод"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 bg-card-hover border border-border rounded-xl px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-lime-400"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="bg-card-hover text-text-primary px-4 py-2 rounded-xl text-sm hover:bg-card-hover/70 transition"
                  >
                    Применить
                  </button>
                </div>

                <div className="space-y-2 text-sm">
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
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-text-primary">Итого</span>
                      <span className="text-lime-400">${total.toFixed(2)}</span>
                    </div>
                    {subtotal < 5000 && (
                      <p className="text-xs text-text-muted mt-1">
                        Добавьте товаров на ${(5000 - subtotal).toFixed(2)} для бесплатной доставки
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-lime-400 text-black font-bold py-3 rounded-xl hover:bg-lime-500 transition"
                >
                  Оформить заказ
                </button>
                <button
                  onClick={onClose}
                  className="w-full text-text-muted text-sm py-2 hover:text-text-primary transition"
                >
                  Продолжить покупки
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}