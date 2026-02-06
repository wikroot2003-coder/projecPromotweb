import { footerCats, custServices } from "../data/products";
import { Icon, icons } from "./Icons";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-8">
      <div className="px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-5"><span className="text-cyan-400">Mega</span>Mart</h2>
            <p className="text-sm text-gray-300 font-semibold mb-3">Contact Us</p>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <Icon d={icons.chat} className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <div><p>WhatsApp</p><p className="text-gray-300">+1 202-918-2132</p></div>
              </div>
              <div className="flex items-start gap-2">
                <Icon d={icons.phone} className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <div><p>Call Us</p><p className="text-gray-300">+1 202-918-2132</p></div>
              </div>
            </div>
            <p className="text-sm text-gray-300 font-semibold mt-5 mb-2">Download App</p>
            <div className="flex gap-2">
              <button className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-[10px] flex items-center gap-2 hover:bg-gray-700 transition-colors">
                <Icon d={icons.appStore} className="w-4 h-4" />
                <span>App Store</span>
              </button>
              <button className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-[10px] flex items-center gap-2 hover:bg-gray-700 transition-colors">
                <Icon d={icons.googlePlay} className="w-4 h-4" />
                <span>Google Play</span>
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4 text-cyan-400">Most Popular Categories</h3>
            <ul className="space-y-2">{footerCats.map((c, i) => <li key={i}><a href="#" className="text-xs text-gray-400 hover:text-cyan-400 transition-colors">{c}</a></li>)}</ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4 text-cyan-400">Customer Services</h3>
            <ul className="space-y-2">{custServices.map((s, i) => <li key={i}><a href="#" className="text-xs text-gray-400 hover:text-cyan-400 transition-colors">{s}</a></li>)}</ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4 text-cyan-400">Follow Us</h3>
            <div className="space-y-3">
              <a href="#" className="flex items-center gap-2 text-xs text-gray-400 hover:text-cyan-400 transition-colors">
                <Icon d={icons.facebook} className="w-4 h-4" />
                <span>Facebook</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-xs text-gray-400 hover:text-cyan-400 transition-colors">
                <Icon d={icons.twitter} className="w-4 h-4" />
                <span>Twitter</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-xs text-gray-400 hover:text-cyan-400 transition-colors">
                <Icon d={icons.instagram} className="w-4 h-4" />
                <span>Instagram</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-xs text-gray-400 hover:text-cyan-400 transition-colors">
                <Icon d={icons.youtube} className="w-4 h-4" />
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 px-6 text-center">
        <p className="text-xs text-gray-500">&copy; 2022 All rights reserved. Reliance Retail Ltd.</p>
      </div>
    </footer>
  );
}
