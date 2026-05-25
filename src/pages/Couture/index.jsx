import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

export default function Couture() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://gnews.io/api/v4/search?q=fashion%20luxury%20couture&lang=en&country=us&max=10&apikey=${GNEWS_API_KEY}`
        );
        if (!response.ok) throw new Error("Ошибка загрузки новостей");
        const data = await response.json();
        setNews(data.articles || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const handleReadMore = (article) => {
    
    navigate(`/news/${encodeURIComponent(article.title)}`, { state: { article } });
  };

  if (loading) return (
    <div className="bg-[#050505] text-white min-h-screen pt-28 flex items-center justify-center">
      <div className="text-lime-400">Загрузка новостей...</div>
    </div>
  );

  if (error) return (
    <div className="bg-[#050505] text-white min-h-screen pt-28 flex items-center justify-center flex-col gap-4">
      <p className="text-red-400">Ошибка: {error}</p>
      <button onClick={() => window.location.reload()} className="bg-lime-400 text-black px-4 py-2 rounded-xl">
        Повторить
      </button>
    </div>
  );

  return (
    <div className="bg-[#050505] text-white min-h-screen pt-28 px-4 md:px-12 pb-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold mb-8"
      >
        Couture / Новости моды
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((article, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-[#0f0f0f] rounded-2xl overflow-hidden border border-gray-800 hover:border-lime-400/50 transition-all"
          >
            {article.image && (
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-5">
              <h2 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h2>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">{article.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{new Date(article.publishedAt).toLocaleDateString()}</span>
                <button
                  onClick={() => handleReadMore(article)}
                  className="text-lime-400 hover:text-lime-300 text-sm font-medium"
                >
                  Читать далее →
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}