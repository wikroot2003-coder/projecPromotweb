import { useParams, Link } from "react-router-dom";

const categoryData = {
  groceries: { title: "Groceries", items: ["Vegetables", "Fruits", "Dairy", "Bakery", "Beverages"] },
  "premium-fruits": { title: "Premium Fruits", items: ["Apples", "Bananas", "Oranges", "Grapes", "Berries"] },
  "home-kitchen": { title: "Home & Kitchen", items: ["Cookware", "Storage", "Appliances", "Tableware", "Tools"] },
  fashion: { title: "Fashion", items: ["Men", "Women", "Kids", "Accessories", "Footwear"] },
  electronics: { title: "Electronics", items: ["Mobiles", "Laptops", "TVs", "Audio", "Accessories"] },
  beauty: { title: "Beauty", items: ["Skincare", "Makeup", "Haircare", "Fragrances", "Personal Care"] },
  "home-improvement": { title: "Home Improvement", items: ["Hardware", "Paint", "Lighting", "Bathroom", "Garden"] },
  "sports-toys-luggage": { title: "Sports, Toys & Luggage", items: ["Fitness", "Toys", "Sports", "Travel", "Outdoor"] },
};

export default function CategoryPage() {
  const { slug } = useParams();
  const category = categoryData[slug];

  if (!category) {
    return (
      <div className="px-4 md:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h1>
        <Link to="/" className="text-cyan-500 hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-cyan-500 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">{category.title}</span>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">{category.title}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {category.items.map((item, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 text-center hover:shadow-lg hover:border-cyan-100 transition-all duration-300 cursor-pointer">
            <div className="w-16 h-16 bg-cyan-50 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl text-cyan-500 font-bold">{item[0]}</span>
            </div>
            <p className="text-sm font-medium text-gray-700">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
