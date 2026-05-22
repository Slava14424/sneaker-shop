import { motion } from "framer-motion";
import { fashionNews } from "../../data/news";

export default function Couture() {
  return (
    <div className="min-h-screen bg-[#050505] text-white px-6 md:px-12 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold mb-4"
      >
        Fashion News
      </motion.h1>
      <p className="text-gray-400 mb-12 text-lg">
        Главные события мира моды, тренды и эксклюзивы
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fashionNews.map((news, idx) => (
          <motion.article
            key={news.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -8 }}
            className="bg-[#111] rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all"
          >
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-56 object-cover"
              onError={(e) => e.target.src = "https://via.placeholder.com/600x400?text=News+Image"}
            />
            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs uppercase tracking-wider text-lime-400 font-semibold">
                  {news.category}
                </span>
                <span className="text-xs text-gray-500">{news.date}</span>
              </div>
              <h2 className="text-xl font-bold mb-2 hover:text-lime-400 transition">
                <a href={news.link} className="block">
                  {news.title}
                </a>
              </h2>
              <p className="text-gray-400 text-sm mb-4">{news.summary}</p>
              <a
                href={news.link}
                className="inline-flex items-center text-lime-400 text-sm font-medium hover:underline"
              >
                Читать далее →
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}