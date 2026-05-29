import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NewsDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article;

  if (!article) {
    return (
      <div className="bg-[#050505] text-white min-h-screen pt-28 flex items-center justify-center flex-col gap-4">
        <p>Новость не найдена</p>
        <button onClick={() => navigate("/couture")} className="bg-lime-400 text-black px-4 py-2 rounded-xl">
          Вернуться к новостям
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#050505] text-white min-h-screen pt-28 px-4 md:px-12 pb-12"
    >
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/couture")}
          className="mb-6 text-lime-400 hover:text-lime-300 flex items-center gap-1"
        >
          ← Назад к новостям
        </button>
        {article.image && (
          <img src={article.image} alt={article.title} className="w-full h-96 object-cover rounded-2xl mb-6" />
        )}
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{article.title}</h1>
        <div className="flex gap-4 text-gray-400 mb-6">
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          <span>{article.source?.name || "Модный журнал"}</span>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 text-lg leading-relaxed">{article.content || article.description}</p>
          {!article.content && article.description && (
            <p className="text-gray-300 mt-4">Полный текст новости временно недоступен. Но вы можете прочитать исходную статью по ссылке ниже.</p>
          )}
          {article.url && (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 text-lime-400 hover:underline"
            >
              Читать оригинал →
            </a>
          )}
        </div>
        <button
          onClick={() => navigate("/couture")}
          className="mt-8 bg-lime-400 text-black px-6 py-2 rounded-xl font-semibold"
        >
          Другие новости
        </button>
      </div>
    </motion.div>
  );
}