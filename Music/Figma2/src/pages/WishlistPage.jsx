import { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Icon, FillIcon, icons } from "../components/Icons";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();
  const [addedMap, setAddedMap] = useState({});

  const handleAddToCart = (product) => {
    addItem(product);
    setAddedMap((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedMap((prev) => ({ ...prev, [product.id]: false })), 1200);
  };

  if (wishlist.length === 0) {
    return (
      <div className="px-4 md:px-8 py-16 text-center max-w-lg mx-auto">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon d={icons.heart} className="w-10 h-10 text-red-300" />
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-2">Your wishlist is empty</h1>
        <p className="text-sm text-gray-400 mb-6">Save items you love to buy them later.</p>
        <Link to="/" className="inline-block bg-cyan-500 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-cyan-600 transition-colors">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-6 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-cyan-500 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Wishlist</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          My Wishlist <span className="text-base font-normal text-gray-400">({wishlist.length} items)</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlist.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-lg hover:border-cyan-100 transition-all duration-300 group">
            <div className="relative mb-3">
              <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md z-10">
                {product.discount} OFF
              </span>
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-0 left-0 z-10 w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors"
              >
                <FillIcon d={icons.heart} className="w-4 h-4" />
              </button>
              <Link to={`/product/${product.id}`}>
                <div className="w-full h-44 flex items-center justify-center rounded-xl bg-gray-50 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain p-3" />
                </div>
              </Link>
            </div>
            <Link to={`/product/${product.id}`}>
              <h4 className="text-sm font-medium text-gray-700 mb-2 truncate hover:text-cyan-600 transition-colors">{product.name}</h4>
            </Link>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base font-bold text-gray-900">฿{product.price.toLocaleString()}</span>
              <span className="text-xs text-gray-400 line-through">฿{product.originalPrice.toLocaleString()}</span>
            </div>
            <p className="text-xs font-semibold text-green-500 mb-3">Save - ฿{product.save.toLocaleString()}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                addedMap[product.id]
                  ? "bg-green-500 text-white"
                  : "bg-cyan-50 text-cyan-600 border border-cyan-200 hover:bg-cyan-500 hover:text-white hover:border-cyan-500"
              }`}
            >
              {addedMap[product.id] ? "✓ Added to Cart" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
