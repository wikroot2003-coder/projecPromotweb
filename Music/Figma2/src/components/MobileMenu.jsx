import { useNavigate } from "react-router-dom";
import { navCategories } from "../data/products";
import { Icon, icons } from "./Icons";

const slugMap = {
  "Groceries": "groceries",
  "Premium Fruits": "premium-fruits",
  "Home & Kitchen": "home-kitchen",
  "Fashion": "fashion",
  "Electronics": "electronics",
  "Beauty": "beauty",
  "Home Improvement": "home-improvement",
  "Sports, Toys & Luggage": "sports-toys-luggage",
};

export default function MobileMenu({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNav = (name) => {
    const slug = slugMap[name];
    if (slug) navigate(`/category/${slug}`);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold"><span className="text-cyan-500">Mega</span><span className="text-gray-800">Mart</span></h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User */}
        <div className="px-5 py-4 bg-cyan-50 border-b border-cyan-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
              <Icon d={icons.user} className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Welcome!</p>
              <p className="text-xs text-cyan-600">Sign Up / Sign In</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-2">
          <p className="px-5 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">Categories</p>
          {navCategories.map((c, i) => (
            <button
              key={i}
              onClick={() => handleNav(c.name)}
              className="w-full flex items-center justify-between px-5 py-3 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
            >
              <span>{c.name}</span>
              <Icon d={icons.chevRight} className="w-4 h-4 text-gray-300" />
            </button>
          ))}
        </div>

        {/* Footer links */}
        <div className="border-t border-gray-100 py-3 px-5 space-y-2">
          <button onClick={() => { navigate("/"); onClose(); }} className="flex items-center gap-2 text-sm text-gray-600 hover:text-cyan-600 transition-colors py-1">
            <Icon d={icons.track} className="w-4 h-4" />
            <span>Track Order</span>
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-cyan-600 transition-colors py-1">
            <Icon d={icons.gift} className="w-4 h-4" />
            <span>All Offers</span>
          </button>
        </div>
      </div>
    </>
  );
}
