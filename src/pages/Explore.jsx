import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Explore() {
  return (
    <div className="bg-primary text-text-primary min-h-screen">
      {/* Hero секция */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 px-4"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Добро пожаловать в Sneakerly
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto">
            Мы создали пространство, где технологии встречаются с уличной модой.
          </p>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-primary" />
      </section>

      {/* О нас */}
      <section className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Кто мы?</h2>
          <div className="w-20 h-1 bg-lime-400 mx-auto mb-6" />
          <p className="text-text-secondary text-lg max-w-3xl mx-auto">
            Sneakerly — это не просто магазин кроссовок. Это экосистема для тех, кто ценит стиль, инновации и комфорт.
            Мы объединяем культуру уличной моды, люксовые бренды и передовые технологии, чтобы каждый мог найти идеальную пару.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600"
              alt="Sneaker collection"
              className="rounded-2xl shadow-2xl"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-semibold text-lime-400">Наша миссия</h3>
            <p className="text-text-secondary">
              Вдохновлять и одевать следующее поколение. Мы стремимся сделать качественные кроссовки доступными,
              а процесс покупки — вдохновляющим. Каждая пара в нашем ассортименте отобрана с любовью к деталям.
            </p>
            <h3 className="text-2xl font-semibold text-lime-400 pt-4">Философия</h3>
            <p className="text-text-secondary">
              Мы верим, что кроссовки — это больше, чем обувь. Это самовыражение. Поэтому мы привозим эксклюзивные
              коллаборации, редкие релизы и поддерживаем тренды, не забывая о классике.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Преимущества – без смайликов, только текст */}
      <section className="bg-secondary py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Почему выбирают нас</h2>
            <div className="w-20 h-1 bg-lime-400 mx-auto mt-4" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-6 text-center border border-border hover:border-lime-400/50 transition">
              <div className="text-4xl mb-4 text-lime-400"></div>
              <h3 className="text-xl font-bold mb-2">Быстрая доставка</h3>
              <p className="text-text-muted text-sm">По всей России за 2–3 дня. Бесплатно при заказе от 5000 ₽.</p>
            </div>
            <div className="bg-card rounded-2xl p-6 text-center border border-border hover:border-lime-400/50 transition">
              <div className="text-4xl mb-4 text-lime-400">✓</div>
              <h3 className="text-xl font-bold mb-2">Гарантия подлинности</h3>
              <p className="text-text-muted text-sm">100% оригинал. Проверка каждого экземпляра перед отправкой.</p>
            </div>
            <div className="bg-card rounded-2xl p-6 text-center border border-border hover:border-lime-400/50 transition">
              <div className="text-4xl mb-4 text-lime-400">↻</div>
              <h3 className="text-xl font-bold mb-2">Лёгкий возврат</h3>
              <p className="text-text-muted text-sm">14 дней на возврат без вопросов. Просто заполните форму.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "5000+", label: "Довольных клиентов" },
            { value: "120+", label: "Брендов" },
            { value: "15k+", label: "Проданных пар" },
            { value: "4.9", label: "Средний рейтинг" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-lime-400">{stat.value}</div>
              <div className="text-text-muted text-sm mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Команда */}
      <section className="bg-secondary py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Наша команда</h2>
            <div className="w-20 h-1 bg-lime-400 mx-auto mt-4" />
            <p className="text-text-muted mt-4 max-w-2xl mx-auto">
              Энтузиасты, которые живут кроссовками и знают о них всё.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Алексей Смирнов", role: "Основатель", img: "https://randomuser.me/api/portraits/men/32.jpg" },
              { name: "Мария Иванова", role: "Директор по продукту", img: "https://randomuser.me/api/portraits/women/68.jpg" },
              { name: "Дмитрий Козлов", role: "Ведущий дизайнер", img: "https://randomuser.me/api/portraits/men/45.jpg" },
              { name: "Елена Мороз", role: "Клиентский сервис", img: "https://randomuser.me/api/portraits/women/90.jpg" }
            ].map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card rounded-2xl p-4 text-center border border-border"
              >
                <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-3 object-cover" />
                <h3 className="font-bold text-text-primary">{member.name}</h3>
                <p className="text-text-muted text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Готовы найти свою идеальную пару?</h2>
          <p className="text-text-secondary mb-8">
            Присоединяйтесь к сообществу Sneakerly и получайте первыми новости о скидках и новых релизах.
          </p>
          <Link
            to="/men"
            className="inline-block bg-lime-400 text-black px-8 py-4 rounded-xl font-semibold hover:bg-lime-500 transition transform hover:scale-105"
          >
            Начать покупки
          </Link>
        </motion.div>
      </section>
    </div>
  );
}