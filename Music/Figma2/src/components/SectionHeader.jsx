import { Icon, icons } from "./Icons";

export default function SectionHeader({ title, highlight }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h3 className="text-lg font-semibold text-gray-800">{title} <span className="text-cyan-500">{highlight}</span></h3>
      <button className="text-sm text-gray-400 hover:text-cyan-600 flex items-center gap-1 transition-colors">
        View All <Icon d={icons.chevRight} className="w-3 h-3" />
      </button>
    </div>
  );
}
