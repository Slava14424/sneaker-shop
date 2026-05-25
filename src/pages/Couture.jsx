import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

// Резервные новости (на случай лимита API)
const fallbackNews = [
  {
    title: "Louis Vuitton представил коллекцию осень-зима 2025",
    description: "Французский дом моды удивил публику инновационными материалами и смелыми силуэтами. Показ прошёл в Париже.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600",
    publishedAt: new Date().toISOString(),
    source: { name: "Vogue" },
    content: "Полный текст: Новая коллекция Louis Vuitton сочетает классику и футуризм. Дизайнеры использовали переработанные ткани и 3D-печать. Ключевые вещи: объёмные пальто, брюки клёш и аксессуары из эко-кожи."
  },
  {
    title: "Balenciaga запускает линию кроссовок с ИИ-дизайном",
    description: "Коллаборация с технологическим стартапом обещает персонализированную подошву, напечатанную на 3D-принтере.",
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a9d5a2?w=600",
    publishedAt: new Date().toISOString(),
    source: { name: "Hypebeast" },
    content: "Balenciaga представила прототип кроссовок, которые подстраиваются под форму стопы владельца. Сканер в магазине создаёт цифровую модель, а затем печатает подошву за 24 часа."
  },
  {
    title: "Gucci возрождает культовую сумку Jackie 1961",
    description: "Обновлённая версия с устойчивыми материалами и современными пропорциями уже в предзаказе.",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600",
    publishedAt: new Date().toISOString(),
    source: { name: "Harper's Bazaar" },
    content: "Legacy-модель возвращается с новой экокожей и подкладкой из переработанного нейлона. Доступно 5 цветов, включая изумрудный и терракотовый."
  },
  {
    title: "Prada и Adidas продолжают коллаборацию",
    description: "Третья совместная коллекция включает кроссовки и минималистичные аксессуары.",
    image: "https://images.unsplash.com/photo-1560769623-6ecddd217b2f?w=600",
    publishedAt: new Date().toISOString(),
    source: { name: "Highsnobiety" },
    content: "Кроссовки получили премиальную кожу и технологию Boost. Лимитированная серия поступит в продажу 15 июня."
  },
  {
    title: "Викторианский стиль возвращается: корсеты и кружева на подиумах",
    description: "Дизайнеры переосмысливают романтику XIX века в уличной моде.",
    image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=600",
    publishedAt: new Date().toISOString(),
    source: { name: "Elle" },
    content: "Модные дома включают корсеты в повседневные образы, сочетая их с денимом и кедами. В тренде также жабо и объёмные рукава."
  },
  {
    title: "Модный дом Dior открывает выставку в Париже",
    description: "Ретроспектива, посвящённая 80-летию бренда, будет работать всё лето.",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600",
    publishedAt: new Date().toISOString(),
    source: { name: "WWD" },
    content: "Выставка 'Dior Heritage' представит более 200 культовых нарядов, включая платья, созданные для принцессы Дианы и Грейс Келли."
  },
  {
    title: "Как устойчивая мода становится мейнстримом",
    description: "Бренды от Zara до Stella McCartney переходят на переработанные ткани.",
    image: "https://images.unsplash.com/photo-1558769132-9461bcf2c226?w=600",
    publishedAt: new Date().toISOString(),
    source: { name: "Business of Fashion" },
    content: "Использование эко-материалов выросло на 40% за последний год. Потребители всё чаще выбирают продукцию с маркировкой 'устойчивое производство'."
  },
  {
    title: "Кроссовки-невидимки: новая технология от Under Armour",
    description: "Обувь с камуфляжем из светоотражающих материалов стала хитом предзаказа.",
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600",
    publishedAt: new Date().toISOString(),
    source: { name: "TechCrunch" },
    content: "В тёмное время суток кроссовки отражают свет фар, создавая эффект невидимости. За первые сутки разобрали 5000 пар."
  },
  {
    title: "Показ Off-White в Лондоне собрал звёзд первой величины",
    description: "Коллекция вдохновлена панк-движением 80-х и современным стритстайлом.",
    image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=600",
    publishedAt: new Date().toISOString(),
    source: { name: "i-D" },
    content: "Мероприятие посетили Рианна, A$AP Rocky и другие знаменитости. Ключевые луки: кожа, цепи, необработанные края."
  }
];

export default function Couture() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      
      if (!GNEWS_API_KEY) {
        console.warn("API ключ отсутствует, использую локальные новости");
        setNews(fallbackNews);
        setLoading(false);
        return;
      }

      // Пытаемся взять из localStorage (кеш на 10 минут)
      const cached = localStorage.getItem("couture_news");
      const cacheTime = localStorage.getItem("couture_news_time");
      const now = Date.now();
      if (cached && cacheTime && now - parseInt(cacheTime) < 10 * 60 * 1000) {
        setNews(JSON.parse(cached));
        setLoading(false);
        return;
      }

      try {
        const url = `https://gnews.io/api/v4/search?q=fashion%20luxury%20couture&lang=en&country=us&max=9&apikey=${GNEWS_API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          if (response.status === 429) {
            throw new Error("Превышен лимит запросов к API. Показываем свежие новости из нашей базы.");
          }
          throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
          setNews(data.articles);
          localStorage.setItem("couture_news", JSON.stringify(data.articles));
          localStorage.setItem("couture_news_time", now.toString());
        } else {
          setNews(fallbackNews);
        }
      } catch (err) {
        console.error("Ошибка API, использую fallback:", err);
        setError(err.message);
        setNews(fallbackNews);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, []);

  const handleReadMore = (article) => {
    navigate(`/news/${encodeURIComponent(article.title)}`, { state: { article } });
  };

  if (loading) {
    return (
      <div className="bg-[#050505] text-white min-h-screen pt-28 flex items-center justify-center">
        <div className="text-lime-400">Загрузка новостей...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-white min-h-screen pt-28 px-4 md:px-12 pb-12">
      {error && (
        <div className="mb-6 p-3 bg-yellow-500/20 border border-yellow-500 rounded-xl text-yellow-500 text-sm text-center">
           {error} Показываем свежие новости из нашей коллекции.
        </div>
      )}
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
            className="bg-[#0f0f0f] rounded-2xl overflow-hidden border border-gray-800 hover:border-lime-400/50 transition-all flex flex-col"
          >
            {article.image && (
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
            )}
            <div className="p-5 flex flex-col flex-1">
              <h2 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h2>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">{article.description}</p>
              <div className="flex justify-between items-center mt-auto">
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