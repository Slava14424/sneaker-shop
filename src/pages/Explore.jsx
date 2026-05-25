import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Explore() {
  return (
    <div className="bg-[#050505] text-white min-h-screen">
      {/* HERO СЕКЦИЯ */}
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
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Мы создали пространство, где технологии встречаются с уличной модой.
          </p>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#050505]" />
      </section>

      {/* О НАС */}
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
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
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
            <p className="text-gray-300">
              Вдохновлять и одевать следующее поколение. Мы стремимся сделать качественные кроссовки доступными,
              а процесс покупки — вдохновляющим. Каждая пара в нашем ассортименте отобрана с любовью к деталям.
            </p>
            <h3 className="text-2xl font-semibold text-lime-400 pt-4">Философия</h3>
            <p className="text-gray-300">
              Мы верим, что кроссовки — это больше, чем обувь. Это самовыражение. Поэтому мы привозим эксклюзивные
              коллаборации, редкие релизы и поддерживаем тренды, не забывая о классике.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section className="bg-[#0a0a0a] py-20 px-6 md:px-12">
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
            {[
              {
                icon: "",
                title: "Быстрая доставка",
                desc: "По всей России за 2–3 дня. Бесплатно при заказе от 5000 ₽."
              },
              {
                icon: "",
                title: "Гарантия подлинности",
                desc: "100% оригинал. Проверка каждого экземпляра перед отправкой."
              },
              {
                icon: "",
                title: "Лёгкий возврат",
                desc: "14 дней на возврат без вопросов. Просто заполните форму."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#111] rounded-2xl p-6 text-center border border-gray-800 hover:border-lime-400/50 transition"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* СТАТИСТИКА */}
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
              <div className="text-gray-400 text-sm mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* КОМАНДА (опционально) */}
      <section className="bg-[#0a0a0a] py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Наша команда</h2>
            <div className="w-20 h-1 bg-lime-400 mx-auto mt-4" />
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
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
                className="bg-[#111] rounded-2xl p-4 text-center border border-gray-800"
              >
                <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-3 object-cover" />
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-gray-400 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ПРИЗЫВ К ДЕЙСТВИЮ */}
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Готовы найти свою идеальную пару?</h2>
          <p className="text-gray-300 mb-8">
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