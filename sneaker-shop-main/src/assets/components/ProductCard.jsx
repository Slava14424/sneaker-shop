import { motion } from "framer-motion";

export default function ProductCard({ item, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-[#111] rounded-2xl p-4 cursor-pointer"
      onClick={onClick}
    >
      <img src={item.image} className="h-40 mx-auto mb-4" />
      <h3>{item.name}</h3>
      <p className="text-gray-400">${item.price}</p>
    </motion.div>
  );
}