import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { navCategories } from "../data/products";
import { Icon, icons } from "./Icons";

const categorySlugMap = {
  "Groceries": "groceries",
  "Premium Fruits": "premium-fruits",
  "Home & Kitchen": "home-kitchen",
  "Fashion": "fashion",
  "Electronics": "electronics",
  "Beauty": "beauty",
  "Home Improvement": "home-improvement",
  "Sports, Toys & Luggage": "sports-toys-luggage",
};

const dropdownItems = {
  "Groceries": ["Vegetables", "Fruits", "Dairy", "Bakery", "Beverages"],
  "Premium Fruits": ["Apples", "Bananas", "Oranges", "Grapes", "Berries"],
  "Home & Kitchen": ["Cookware", "Storage", "Appliances", "Tableware", "Tools"],
  "Fashion": ["Men", "Women", "Kids", "Accessories", "Footwear"],
  "Electronics": ["Mobiles", "Laptops", "TVs", "Audio", "Accessories"],
  "Beauty": ["Skincare", "Makeup", "Haircare", "Fragrances", "Personal Care"],
  "Home Improvement": ["Hardware", "Paint", "Lighting", "Bathroom", "Garden"],
  "Sports, Toys & Luggage": ["Fitness", "Toys", "Sports", "Travel", "Outdoor"],
};

export default function Navigation() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleNavigate = (categoryName) => {
    const slug = categorySlugMap[categoryName];
    if (slug) {
      navigate(`/category/${slug}`);
      setOpenDropdown(null);
    }
  };

  return (
    <div className="bg-white border-b border-gray-100 px-4 md:px-8 py-2 overflow-x-auto" ref={dropdownRef}>
      <div className="flex items-center gap-1">
        {navCategories.map((c, i) => (
          <div key={i} className="relative">
            <button
              onClick={() => handleCategoryClick(i)}
              className={`flex items-center gap-1 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm whitespace-nowrap transition-all duration-200 ${c.highlight ? "bg-cyan-500 text-white shadow-md shadow-cyan-200" : "text-gray-600 hover:bg-gray-50 hover:text-cyan-600"} ${openDropdown === i ? "ring-2 ring-cyan-300" : ""}`}
            >
              {c.name} <Icon d={icons.chevDown} className={`w-3 h-3 transition-transform ${openDropdown === i ? "rotate-180" : ""}`} />
            </button>
            {openDropdown === i && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50 py-2">
                <button
                  onClick={() => handleNavigate(c.name)}
                  className="w-full text-left px-4 py-2 text-sm font-semibold text-cyan-600 hover:bg-cyan-50 transition-colors border-b border-gray-100"
                >
                  View All {c.name}
                </button>
                {dropdownItems[c.name]?.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleNavigate(c.name)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
