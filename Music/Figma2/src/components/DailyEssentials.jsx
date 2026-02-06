import { Icon, icons } from "./Icons";
import SectionHeader from "./SectionHeader";

const essentialIcons = [icons.cartShopping, icons.vegetable, icons.fruit, icons.strawberry, icons.mango, icons.cherry];
const essentialColors = ["#10b981", "#22c55e", "#eab308", "#ef4444", "#f59e0b", "#ec4899"];

export default function DailyEssentials() {
  const essentials = [
    { name: "Daily Essentials" },
    { name: "Vegetables" },
    { name: "Fruits" },
    { name: "Strawberry" },
    { name: "Mango" },
    { name: "Cherry" },
  ];

  return (
    <div className="px-4 md:px-8 py-6">
      <SectionHeader title="Daily" highlight="Essentials" />
      <div className="flex items-center justify-between gap-2 md:gap-4 overflow-x-auto">
        {essentials.map((e, i) => (
          <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group shrink-0">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl border border-gray-100 group-hover:border-cyan-300 transition-all duration-300 shadow-sm group-hover:shadow-md flex items-center justify-center bg-white"
              style={{ color: essentialColors[i] }}>
              <Icon d={essentialIcons[i]} className="w-10 h-10 md:w-12 md:h-12" />
            </div>
            <span className="text-[11px] md:text-xs font-medium text-gray-700">{e.name}</span>
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">UP TO 50% OFF</span>
          </div>
        ))}
      </div>
    </div>
  );
}
