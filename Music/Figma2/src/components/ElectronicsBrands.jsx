import { useState } from "react";
import { Icon, icons } from "./Icons";
import SectionHeader from "./SectionHeader";

const brands = [
  { id: 1, label: "IPHONE", logo: icons.apple, colors: "from-gray-900 to-gray-700", text: "text-white" },
  { id: 2, label: "REALME", logo: null, logoText: "realme", colors: "from-yellow-400 to-yellow-200", text: "text-gray-900" },
  { id: 3, label: "XIAOMI", logo: null, logoText: "mi", colors: "from-orange-500 to-orange-300", text: "text-white" },
];

export default function ElectronicsBrands() {
  const [dot, setDot] = useState(0);
  return (
    <div className="px-4 md:px-8 py-4">
      <SectionHeader title="Top" highlight="Electronics Brands" />
      <div className="flex gap-4 overflow-x-auto pb-3" style={{ scrollbarWidth: "none" }}>
        {brands.map(b => (
          <div key={b.id} className={`relative rounded-xl overflow-hidden min-w-[250px] md:min-w-[280px] h-[180px] md:h-[200px] cursor-pointer group bg-gradient-to-br ${b.colors} shrink-0`}>
            <div className={`absolute top-3 left-3 px-3 py-1 rounded text-[10px] font-bold tracking-wider ${b.id === 1 ? "bg-cyan-500 text-white" : b.id === 2 ? "bg-yellow-600 text-white" : "bg-red-500 text-white"}`}>{b.label}</div>
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              {b.logo ? (
                <Icon d={b.logo} className="w-32 h-32" />
              ) : (
                <span className="text-[120px] font-black">{b.logoText}</span>
              )}
            </div>
            <div className={`absolute bottom-4 left-4 ${b.text}`}>
              <div className="text-3xl font-bold mb-1 flex items-center">
                {b.logo ? (
                  <Icon d={b.logo} className="w-10 h-10" />
                ) : (
                  b.logoText
                )}
              </div>
              <p className="text-sm font-semibold">UP TO 80% OFF</p>
            </div>
            <div className="absolute right-0 top-0 w-1/2 h-full flex gap-1 opacity-30">
              <div className="flex-1 bg-white/10 rounded-l-xl" />
              <div className="flex-1 bg-white/5 rounded-l-xl" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-3">
        {brands.map((_, i) => <button key={i} onClick={() => setDot(i)} className={`h-2 rounded-full transition-all ${i === dot ? "bg-cyan-500 w-5" : "bg-gray-300 w-2"}`} />)}
      </div>
    </div>
  );
}
