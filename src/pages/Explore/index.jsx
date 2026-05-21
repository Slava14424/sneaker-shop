import CategoryPage from "../../assets/components/CategoryPage";
import { products } from "../../data/products";
export default function Men({ onProductClick, addToCart }) {
  const filtered = products.filter(p => p.category === "men");
  return (
    <CategoryPage
      title="Мужская коллекция"
      products={filtered}
      onProductClick={onProductClick}
      addToCart={addToCart}
    />
  );
}