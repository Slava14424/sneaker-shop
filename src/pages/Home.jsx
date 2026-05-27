import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const heroProduct = {
  id: 1,
  name: "Nike Air Max",
  price: 249,
  image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800"
};

export default function Home() {
  const trends = [
    {
      id: 1,
      title: "Спорт-шик",
      description: "Минимализм и высокая функциональность",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      link: "/men"
    },
    {
      id: 2,
      title: "Лаконичная классика",
      description: "Вечные силуэты, чистые линии",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
      link: "/women"
    },
    {
      id: 3,
      title: "Авангард",
      description: "Смелые формы, эксклюзивный декор",
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500",
      link: "/couture"
    },
    {
      id: 4,
      title: "Уличный минимализм",
      description: "Стритвил с акцентом на детали",
      image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=500",
      link: "/explore"
    }
  ];

  const scrollToTrends = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen overflow-hidden font-sans">
      {/* HERO-БЛОК */}
      <section className="h-screen flex items-center justify-center relative">
        <motion.img
          src={heroProduct.image}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.25 }}
          transition={{ duration: 1.2 }}
          className="absolute w-[1000px] blur-md"
          alt="hero sneaker"
        />
        <div className="z-10 text-center">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            SNEAKERLY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-8"
          >
            Premium кроссовки. Будущее уличной моды в каждой детали.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTrends}
            className="bg-lime-400 text-black px-8 py-3 rounded-full font-semibold shadow-lg"
          >
            Купить товар
          </motion.button>
        </div>
      </section>

      {/* БЛОК ТРЕНДОВ СЕЗОНА */}
      <div className="px-6 md:px-16 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold">Тренды сезона</h2>
          <div className="w-16 h-0.5 bg-lime-400 mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trends.map((trend, idx) => (
            <motion.div
              key={trend.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              <Link to={trend.link}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                <img
                  src={trend.image}
                  alt={trend.title}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                  <h3 className="text-xl font-bold mb-1">{trend.title}</h3>
                  <p className="text-gray-200 text-sm">{trend.description}</p>
                  <span className="inline-block mt-3 text-lime-400 text-sm font-medium group-hover:translate-x-1 transition">
                    Подробнее →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ЦИТАТА */}
      <div className="bg-[#0a0a0a] py-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-gray-300 text-lg italic">
            «Кроссовки — это не просто обувь. Это язык, на котором говорит улица. Мы переводим тренды в реальность.»
          </p>
          <div className="w-12 h-0.5 bg-lime-400 mx-auto my-6" />
          <p className="text-gray-500 text-sm">Основано в 2026</p>
        </motion.div>
      </div>
    </div>
  );
}