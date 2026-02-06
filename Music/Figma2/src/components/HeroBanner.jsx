import { useState, useEffect } from "react";
import { Icon, icons } from "./Icons";

const slides = [
  { title: "Best Deal Online on smart watches", heading: "SMART WEARABLE.", sub: "UP TO 80% OFF", bg: "from-cyan-700 via-teal-600 to-cyan-800", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&h=300&fit=crop" },
  { title: "Latest Collection of", heading: "SMARTPHONES.", sub: "UP TO 60% OFF", bg: "from-blue-700 via-indigo-600 to-blue-800", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop" },
  { title: "Premium Quality", heading: "HEADPHONES.", sub: "UP TO 70% OFF", bg: "from-purple-700 via-violet-600 to-purple-800", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop" },
];

export default function HeroBanner() {
  const [cur, setCur] = useState(0);
  useEffect(() => { const t = setInterval(() => setCur(p => (p + 1) % slides.length), 5000); return () => clearInterval(t); }, []);
  const s = slides[cur];
  return (
    <div className="px-4 md:px-8 py-6">
      <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-r ${s.bg} transition-all duration-700`}>
        <div className="flex items-center justify-between px-8 md:px-14 py-10 min-h-[220px] md:min-h-[280px]">
          <button onClick={() => setCur((cur - 1 + slides.length) % slides.length)} className="absolute left-3 z-10 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <Icon d={icons.chevLeft} className="w-4 h-4" />
          </button>
          <div className="text-white z-10 flex-1">
            <p className="text-xs md:text-sm mb-2 opacity-90">{s.title}</p>
            <h2 className="text-2xl md:text-4xl font-bold mb-2 tracking-wide">{s.heading}</h2>
            <p className="text-base md:text-lg font-medium opacity-90">{s.sub}</p>
          </div>
          <div className="mr-4 md:mr-8 drop-shadow-lg hidden sm:block">
            <img src={s.image} alt={s.heading} className="w-28 h-28 md:w-40 md:h-40 object-contain rounded-xl drop-shadow-2xl" />
          </div>
          <button onClick={() => setCur((cur + 1) % slides.length)} className="absolute right-3 z-10 w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <Icon d={icons.chevRight} className="w-4 h-4" />
          </button>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => <button key={i} onClick={() => setCur(i)} className={`h-2 rounded-full transition-all duration-300 ${i === cur ? "bg-white w-6" : "bg-white/50 w-2"}`} />)}
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 rounded-l-full pointer-events-none" />
      </div>
    </div>
  );
}
