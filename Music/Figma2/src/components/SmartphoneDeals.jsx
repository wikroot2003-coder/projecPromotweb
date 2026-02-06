import { useState } from "react";
import { Link } from "react-router-dom";
import { smartphones } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Icon, FillIcon, icons } from "./Icons";
import SectionHeader from "./SectionHeader";

const ProductCard = ({ p }) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const liked = isInWishlist(p.id);

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(p);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 min-w-[170px] w-[170px] hover:shadow-lg hover:border-cyan-100 transition-all duration-300 cursor-pointer group shrink-0 relative">
      <button
        onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
        className={`absolute top-2 left-2 z-20 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
          liked ? "bg-red-50 text-red-500" : "bg-white/80 text-gray-300 opacity-0 group-hover:opacity-100 hover:text-red-400"
        }`}
      >
        {liked
          ? <FillIcon d={icons.heart} className="w-3.5 h-3.5" />
          : <Icon d={icons.heart} className="w-3.5 h-3.5" />
        }
      </button>
      <Link to={`/product/${p.id}`}>
        <div className="relative mb-3">
          <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md z-10">{p.discount} OFF</span>
          <div className="w-full h-32 flex items-center justify-center rounded-lg bg-gray-50 overflow-hidden">
            {/* Skeleton placeholder */}
            {!imgLoaded && (
              <div className="absolute inset-0 bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-200 rounded" />
              </div>
            )}
            <img
              src={p.image}
              alt={p.name}
              className={`w-full h-full object-contain p-2 transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setImgLoaded(true)}
            />
          </div>
        </div>
        <h4 className="text-xs font-medium text-gray-700 mb-2 truncate">{p.name}</h4>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-bold text-gray-900">฿{p.price.toLocaleString()}</span>
          <span className="text-[11px] text-gray-400 line-through">฿{p.originalPrice.toLocaleString()}</span>
        </div>
        <p className="text-xs font-semibold text-green-500 mb-3">Save - ฿{p.save.toLocaleString()}</p>
      </Link>
      <button
        onClick={handleAdd}
        className={`w-full py-2 rounded-lg text-xs font-semibold transition-all duration-300 ${
          added
            ? "bg-green-500 text-white"
            : "bg-cyan-50 text-cyan-600 border border-cyan-200 hover:bg-cyan-500 hover:text-white hover:border-cyan-500"
        }`}
      >
        {added ? "Added!" : "Add to Cart"}
      </button>
    </div>
  );
};

export default function SmartphoneDeals() {
  return (
    <div className="px-4 md:px-8 py-4">
      <SectionHeader title="Grab the best deal on" highlight="Smartphones" />
      <div className="flex gap-4 overflow-x-auto pb-3" style={{ scrollbarWidth: "none" }}>
        {smartphones.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}
