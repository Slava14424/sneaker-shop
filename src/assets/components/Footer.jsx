import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black/40 backdrop-blur-xl border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Бренд */}
          <div>
            <h3 className="text-2xl font-bold tracking-wide mb-4">SNEAKERLY</h3>
            <p className="text-gray-400 text-sm">
              Premium sneakers for the future. Style, comfort, innovation.
            </p>
          </div>

          {/* Навигация */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/men" className="hover:text-white transition">Men</Link></li>
              <li><Link to="/women" className="hover:text-white transition">Women</Link></li>
              <li><Link to="/couture" className="hover:text-white transition">Couture</Link></li>
              <li><Link to="/explore" className="hover:text-white transition">Explore</Link></li>
            </ul>
          </div>

          {/* Поддержка */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Shipping</a></li>
              <li><a href="#" className="hover:text-white transition">Returns</a></li>
              <li><a href="#" className="hover:text-white transition">Size Guide</a></li>
            </ul>
          </div>

          {/* Подписка */}
          <div>
            <h4 className="font-semibold mb-4">Subscribe</h4>
            <p className="text-sm text-gray-400 mb-3">
              Get the latest drops & exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-[#111] border border-gray-700 rounded-l-xl px-4 py-2 text-sm focus:outline-none focus:border-lime-400"
              />
              <button className="bg-lime-400 text-black px-4 rounded-r-xl font-semibold text-sm hover:bg-lime-500 transition">
                →
              </button>
            </div>
          </div>
        </div>

        {}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2025 Sneakerly. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition">Twitter</a>
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}