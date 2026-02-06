import { Icon, icons } from "./Icons";
import SectionHeader from "./SectionHeader";

const catColors = ["#06b6d4", "#ec4899", "#8b5cf6", "#f59e0b", "#6366f1", "#10b981", "#ef4444"];
const catIcons = [icons.mobile, icons.cosmetics, icons.electronics, icons.furniture, icons.watches, icons.decor, icons.accessories];

export default function TopCategories() {
  const topCats = [
    { name: "Mobile" },
    { name: "Cosmetics" },
    { name: "Electronics" },
    { name: "Furniture" },
    { name: "Watches" },
    { name: "Decor" },
    { name: "Accessories" },
  ];

  return (
    <div className="px-4 md:px-8 py-6">
      <SectionHeader title="Shop From" highlight="Top Categories" />
      <div className="flex items-center justify-between gap-2 md:gap-4 overflow-x-auto">
        {topCats.map((c, i) => (
          <div key={i} className="flex flex-col items-center gap-2.5 cursor-pointer group shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-2 border-gray-100 group-hover:border-cyan-400 transition-all duration-300 shadow-sm group-hover:shadow-md"
              style={{ background: catColors[i] + "12", color: catColors[i] }}>
              <Icon d={catIcons[i]} className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <span className="text-[11px] md:text-xs font-medium text-gray-600 group-hover:text-cyan-600 transition-colors">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
