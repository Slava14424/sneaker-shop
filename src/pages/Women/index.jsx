import CategoryPage from "../../assets/components/CategoryPage";
import { products } from "../../data/products";

const subcategories = [
  { value: "sport", label: "Спортивные" },
  { value: "casual", label: "Повседневные" },
  { value: "running", label: "Беговые" }
];

export default function Women({ addToCart }) {
  const filtered = products.filter(p => p.category === "women");
  return (
    <CategoryPage
      title="Женская коллекция"
      products={filtered}
      addToCart={addToCart}
      subcategories={subcategories}
    />
  );
}