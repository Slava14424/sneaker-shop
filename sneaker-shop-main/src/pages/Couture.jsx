import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API_KEY;


const fallbackNews = [
  {
    title: "Balenciaga запускает линию кроссовок с ИИ-дизайном",
    description: "Balenciaga экспериментирует с AI-генерированными элементами в своих коллекциях. Генеративный дизайн позволяет создавать формы и текстуры, которые раньше были невозможны.",
    image: "https://outmaxshop.ru/images/proadvert_Present_a_pair_of_stylish_youthful_Balenciaga_sneake_68908ff9-abf3-455c-a1a3-48e2e8a2fd6f.png",
    publishedAt: new Date().toISOString(),
    source: { name: "Vogue" }
  },

  {
    title: "Устойчивая мода становится мейнстримом",
    description: "В 2025 году устойчивое развитие перестало быть дополнительной опцией. Переработка, апсайклинг и винтаж прочно вошли в мейнстрим, а потребители начали инвестировать в качественные вещи, рассчитанные на долгий срок службы.",
    image: "https://storage.yandexcloud.net/moskvichmag/uploads/2026/04/BOYKO_08598-1-791x1024.jpg",
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    source: { name: "Moskvich Mag" }
  },
  {
    title: "Gucci и Oura создали умное кольцо",
    description: "Gucci и Oura представили умное кольцо, которое отслеживает состояние здоровья и подбирает аксессуары под ваш образ. Гаджет сочетает в себе передовые технологии и итальянский дизайн.",
    image: "https://sunlight.net/wiki/wp-content/uploads/2022/08/gucci-x-oura-ring-7.jpg",
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    source: { name: "WWD" }
  },
  {
    title: "Puma выпускает лимитированную серию с BMW",
    description: "Puma посвятила 50-летие BMW M выпуску эксклюзивной серии кроссовок. Дизайн обуви вдохновлен культовыми автомобилями баварского автопроизводителя.",
    image: "https://news.store.rambler.ru/img/ce93b0d7779ae3035bff54ec3611b997?img-format=auto&img-1-resize=height:400,fit:max&img-2-filter=sharpen",
    publishedAt: new Date(Date.now() - 345600000).toISOString(),
    source: { name: "Sneaker News" }
  },
  {
    title: "Louis Vuitton показал кроссовки из гриба",
    description: "Louis Vuitton представил кроссовки, изготовленные из мицелия — экологичной альтернативы коже. Это важный шаг в развитии устойчивой моды в люксовом сегменте.",
    image: "https://blog.sneakerhead.ru/content/images/size/w1200/2024/03/https---hypebeast.com-image-2024-03-tyler-the-creator-louis-vuitton-sneaker-first-look-images-2.jpg.webp",
    publishedAt: new Date(Date.now() - 432000000).toISOString(),
    source: { name: "Business of Fashion" }
  },
  {
    title: "New Balance 990v6 – лучшая обувь года",
    description: "New Balance 990v6 получил награду «Лучшая обувь года». Шестая версия культовой модели сочетает в себе комфорт, современный дизайн и качество, за которое ценят бренд.",
    image: "https://img04.rl0.ru/afisha/e1200x600i/daily.afisha.ru/uploads/images/0/8a/08a1413f6995eabf802343e282784eb9.png",
    publishedAt: new Date(Date.now() - 518400000).toISOString(),
    source: { name: "Footwear News" }
  },
  {
    title: "ASICS запускает переработку старых кроссовок",
    description: "ASICS запускает программу переработки старых кроссовок. Сдайте изношенную пару и получите скидку на новую. Это часть глобальной стратегии бренда по сокращению отходов.",
    image: "https://img.tsn.ua/cached/914/tsn-3122bdbfc8d6fcfa75d8528e9b9cd61a/thumbs/1200x630/e4/65/bad8a72b2383edf6816738b5801d65e4.jpg",
    publishedAt: new Date(Date.now() - 604800000).toISOString(),
    source: { name: "Eco Watch" }
  },
  {
    title: "Off-White™ x Nike распродана за 2 минуты",
    description: "Коллекция Off-White™ x Nike была распродана за 2 минуты. Ажиотаж вокруг последней работы Вирджила Абло подтверждает статус бренда как одного из самых влиятельных в уличной моде.",
    image: "https://funkydunky.ru/upload/iblock/e58/gu0dj8zz2wxl3bo5ibdlcr1gx1lmt56q.jpeg",
    publishedAt: new Date(Date.now() - 691200000).toISOString(),
    source: { name: "Complex" }
  }
];

export default function Couture() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      if (!GNEWS_API_KEY || GNEWS_API_KEY === "undefined") {
        setNews(fallbackNews);
        setLoading(false);
        return;
      }

      try {
        const url = `https://gnews.io/api/v4/search?q=fashion%20luxury%20couture&lang=en&country=us&max=9&apikey=${GNEWS_API_KEY}`;
        const response = await fetch(url);
        if (response.status === 429 || !response.ok) {
          setNews(fallbackNews);
        } else {
          const data = await response.json();
          if (data.articles && data.articles.length > 0) {
            // Берём изображения из API, но если нет – подставляем из fallback
            const articlesWithImages = data.articles.map((article, idx) => ({
              ...article,
              image: article.image || fallbackNews[idx % fallbackNews.length].image
            }));
            setNews(articlesWithImages);
          } else {
            setNews(fallbackNews);
          }
        }
      } catch (error) {
        console.error(error);
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

  if (loading) return <div className="bg-primary text-text-primary min-h-screen pt-28 flex items-center justify-center">Загрузка...</div>;

  return (
    <div className="bg-primary text-text-primary min-h-screen pt-28 px-4 md:px-12 pb-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Couture / Новости моды</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {news.map((article, idx) => (
          <div key={idx} className="bg-card rounded-2xl overflow-hidden border border-border hover:border-lime-400/50 transition">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
              onError={(e) => {
                e.target.src = fallbackNews[idx % fallbackNews.length].image;
              }}
            />
            <div className="p-5">
              <h2 className="text-xl font-bold mb-2 line-clamp-2 text-text-primary">{article.title}</h2>
              <p className="text-text-muted text-sm mb-4 line-clamp-3">{article.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-text-muted">
                  {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Сегодня"}
                </span>
                <button onClick={() => handleReadMore(article)} className="text-lime-400 text-sm font-medium hover:text-lime-300">
                  Читать далее →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}