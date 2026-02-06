export const navCategories = [
  { name: "Groceries", highlight: true },
  { name: "Premium Fruits" },
  { name: "Home & Kitchen" },
  { name: "Fashion" },
  { name: "Electronics" },
  { name: "Beauty" },
  { name: "Home Improvement" },
  { name: "Sports, Toys & Luggage" },
];

export const smartphones = [
  { id: 1, name: "Galaxy S22 Ultra", price: 12990, originalPrice: 28990, discount: "55%", save: 16000, image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200&h=250&fit=crop",
    rating: 4.5, reviews: 2847, description: "Experience the power of Galaxy S22 Ultra with its stunning 6.8-inch Dynamic AMOLED display, 108MP camera, and built-in S Pen for ultimate productivity.",
    specs: { Display: "6.8\" Dynamic AMOLED 2X", Processor: "Snapdragon 8 Gen 1", RAM: "12 GB", Storage: "256 GB", Battery: "5000 mAh", Camera: "108MP + 12MP + 10MP + 10MP" },
    gallery: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop"] },
  { id: 2, name: "Galaxy M13 (4GB | 64 GB)", price: 3990, originalPrice: 5990, discount: "33%", save: 2000, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=250&fit=crop",
    rating: 4.1, reviews: 1523, description: "The Galaxy M13 delivers a smooth experience with its 6.6-inch FHD+ display, 50MP triple camera setup, and massive 6000 mAh battery for all-day usage.",
    specs: { Display: "6.6\" FHD+ TFT", Processor: "Exynos 850", RAM: "4 GB", Storage: "64 GB", Battery: "6000 mAh", Camera: "50MP + 5MP + 2MP" },
    gallery: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop"] },
  { id: 3, name: "Galaxy M33 (4GB | 64 GB)", price: 6490, originalPrice: 9990, discount: "35%", save: 3500, image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200&h=250&fit=crop",
    rating: 4.3, reviews: 987, description: "Galaxy M33 5G features a 6.6-inch FHD+ TFT display with 120Hz refresh rate, Exynos 1280 processor, and 5G connectivity for blazing fast speeds.",
    specs: { Display: "6.6\" FHD+ TFT 120Hz", Processor: "Exynos 1280", RAM: "4 GB", Storage: "64 GB", Battery: "6000 mAh", Camera: "50MP + 5MP + 2MP + 2MP" },
    gallery: ["https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop"] },
  { id: 4, name: "Galaxy M53 (4GB | 64 GB)", price: 11990, originalPrice: 15990, discount: "25%", save: 4000, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200&h=250&fit=crop",
    rating: 4.4, reviews: 654, description: "The Galaxy M53 5G comes with a stunning 6.7-inch Super AMOLED+ display, 108MP main camera, and Snapdragon 750G processor for premium performance.",
    specs: { Display: "6.7\" Super AMOLED+ 120Hz", Processor: "Snapdragon 750G", RAM: "4 GB", Storage: "64 GB", Battery: "5000 mAh", Camera: "108MP + 8MP + 2MP + 2MP" },
    gallery: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop"] },
  { id: 5, name: "Galaxy S22 Ultra", price: 25990, originalPrice: 32990, discount: "21%", save: 7000, image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=200&h=250&fit=crop",
    rating: 4.7, reviews: 3201, description: "The ultimate Galaxy S22 Ultra with 12GB RAM, 512GB storage, S Pen integration, and Nightography camera technology for stunning low-light photography.",
    specs: { Display: "6.8\" Dynamic AMOLED 2X", Processor: "Snapdragon 8 Gen 1", RAM: "12 GB", Storage: "512 GB", Battery: "5000 mAh", Camera: "108MP + 12MP + 10MP + 10MP" },
    gallery: ["https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop","https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop"] },
];

export const topCats = [
  { name: "Mobile", emoji: "📱" }, { name: "Cosmetics", emoji: "💄" },
  { name: "Electronics", emoji: "🔌" }, { name: "Furniture", emoji: "🪑" },
  { name: "Watches", emoji: "⌚" }, { name: "Decor", emoji: "🏠" },
  { name: "Accessories", emoji: "👜" },
];

export const brands = [
  { id: 1, label: "IPHONE", logo: "🍎", colors: "from-gray-900 to-gray-700", text: "text-white" },
  { id: 2, label: "REALME", logo: "realme", colors: "from-yellow-400 to-yellow-200", text: "text-gray-900" },
  { id: 3, label: "XIAOMI", logo: "mi", colors: "from-orange-500 to-orange-300", text: "text-white" },
];

export const essentials = [
  { name: "Daily Essentials", emoji: "🛒" }, { name: "Vegetables", emoji: "🥬" },
  { name: "Fruits", emoji: "🍌" }, { name: "Strawberry", emoji: "🍓" },
  { name: "Mango", emoji: "🥭" }, { name: "Cherry", emoji: "🍒" },
];

export const footerCats = ["Staples", "Beverages", "Personal Care", "Home Care", "Baby Care", "Vegetables & Fruits", "Snacks & Foods", "Dairy & Bakery"];
export const custServices = ["About Us", "Terms & Conditions", "FAQ", "Privacy Policy", "E-waste Policy", "Cancellation & Return Policy"];
