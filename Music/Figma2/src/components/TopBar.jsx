import { Icon, icons } from "./Icons";

export default function TopBar() {
  return (
    <div className="bg-white border-b border-gray-100 py-2 px-4 md:px-8 text-xs text-gray-500 flex flex-wrap items-center justify-between gap-2">
      <span>Welcome to worldwide Megamart!</span>
      <div className="flex items-center gap-4 md:gap-6">
        <span className="flex items-center gap-1"><Icon d={icons.location} className="w-3 h-3" /> Deliver to <b className="text-gray-700 ml-0.5">423651</b></span>
        <span className="flex items-center gap-1 hidden sm:flex"><Icon d={icons.track} className="w-3 h-3" /> Track your order</span>
        <span className="flex items-center gap-1 hidden sm:flex"><Icon d={icons.gift} className="w-3 h-3" /> All Offers</span>
      </div>
    </div>
  );
}
