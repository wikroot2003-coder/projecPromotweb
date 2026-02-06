import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Icon, FillIcon, icons } from "./Icons";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { smartphones, navCategories, essentials } from "../data/products";
import MobileMenu from "./MobileMenu";

// Build searchable items from all product data
const searchableItems = [
  ...smartphones.map((p) => ({ name: p.name, type: "Product", price: p.price })),
  ...navCategories.map((c) => ({ name: c.name, type: "Category" })),
  ...essentials.map((e) => ({ name: e.name, type: "Essential" })),
];

export default function Header() {
  const [q, setQ] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { totalItems, setIsOpen } = useCart();
  const { wishlist } = useWishlist();

  const results = q.trim().length > 0
    ? searchableItems.filter((item) =>
        item.name.toLowerCase().includes(q.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (item) => {
    setShowResults(false);
    setQ("");
    if (item.type === "Category") {
      const slug = item.name.toLowerCase().replace(/[&,]/g, "").replace(/\s+/g, "-");
      navigate(`/category/${slug}`);
    }
  };

  return (
    <>
      <div className="bg-white py-3 px-4 md:px-8 flex items-center justify-between gap-4 border-b border-gray-100">
        {/* Logo + Hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={() => setMenuOpen(true)} className="text-gray-600 hover:text-cyan-600 transition-colors">
            <Icon d={icons.menu} className="w-6 h-6" />
          </button>
          <button onClick={() => navigate("/")} className="text-xl md:text-2xl font-bold">
            <span className="text-cyan-500">Mega</span><span className="text-gray-800">Mart</span>
          </button>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-xl" ref={searchRef}>
          <div className="relative">
            <Icon d={icons.search} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search essentials, groceries and more..."
              value={q}
              onChange={(e) => { setQ(e.target.value); setShowResults(true); }}
              onFocus={() => q.trim() && setShowResults(true)}
              className="w-full pl-10 pr-4 py-2.5 bg-cyan-50 border border-cyan-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400"
            />
            {/* Search Results Dropdown */}
            {showResults && q.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 z-50 max-h-80 overflow-y-auto">
                {results.length === 0 ? (
                  <div className="px-4 py-6 text-center text-gray-400">
                    <p className="text-sm">No results for "{q}"</p>
                  </div>
                ) : (
                  results.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleResultClick(item)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-cyan-50 transition-colors text-left"
                    >
                      <Icon d={icons.search} className="w-4 h-4 text-gray-300 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.type}{item.price ? ` - ฿${item.price.toLocaleString()}` : ""}</p>
                      </div>
                      <Icon d={icons.chevRight} className="w-3 h-3 text-gray-300 shrink-0" />
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 md:gap-6 text-sm text-gray-600 shrink-0">
          <Link to="/auth" className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors">
            <Icon d={icons.user} className="w-5 h-5" />
            <span className="hidden md:inline">Sign Up/Sign In</span>
          </Link>
          <Link to="/wishlist" className="relative flex items-center gap-1.5 hover:text-red-500 transition-colors">
            {wishlist.length > 0
              ? <FillIcon d={icons.heart} className="w-5 h-5 text-red-500" />
              : <Icon d={icons.heart} className="w-5 h-5" />
            }
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
            <span className="hidden md:inline">Wishlist</span>
          </Link>
          <button onClick={() => setIsOpen(true)} className="relative flex items-center gap-1.5 hover:text-cyan-600 transition-colors">
            <Icon d={icons.cart} className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
            <span className="hidden md:inline">Cart</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
