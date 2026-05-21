export const products = [
  {
    id: 1,
    name: "Balenciaga Runner Gradient Sneakers",
    brand: "Balenciaga",
    price: 1270,
    oldPrice: 1190,
    rating: 5,
    reviews: 122,
    category: "women",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    images: ["url1", "url2"], // для галереи (опционально)
    sizes: [35,36,37,38,39,40],
    colors: ["Black/White", "Red/Black", "Blue/Yellow"],
    description: "Gradient mesh and calfskin upper. Embossed logo. Rubber sole.",
    inStock: true,
    delivery: "Order delivery point — free of charge",
    deliveryDate: "Delivery tomorrow or later"
  },
  {
    id: 2,
    name: "Nike Air Max",
    brand: "Nike",
    price: 260,
    oldPrice: null,
    rating: 4,
    reviews: 89,
    category: "men",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600",
    sizes: [40,41,42,43,44],
    colors: ["White", "Black"],
    inStock: true,
    delivery: "Free shipping on orders over $100",
    deliveryDate: "Delivery in 2-3 days"
  },
  // ... другие товары
];