import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-secondary/80 backdrop-blur-xl border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold tracking-wide mb-4 text-text-primary">SNEAKERLY</h3>
            <p className="text-text-muted text-sm">Premium sneakers for the future. Style, comfort, innovation.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-text-primary">Shop</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><Link to="/men" className="hover:text-text-primary transition">Men</Link></li>
              <li><Link to="/women" className="hover:text-text-primary transition">Women</Link></li>
              <li><Link to="/couture" className="hover:text-text-primary transition">Couture</Link></li>
              <li><Link to="/explore" className="hover:text-text-primary transition">Explore</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-text-primary">Support</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li><a href="#" className="hover:text-text-primary transition">FAQ</a></li>
              <li><a href="#" className="hover:text-text-primary transition">Shipping</a></li>
              <li><a href="#" className="hover:text-text-primary transition">Returns</a></li>
              <li><a href="#" className="hover:text-text-primary transition">Size Guide</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-text-primary">Subscribe</h4>
            <p className="text-sm text-text-muted mb-3">Get the latest drops & exclusive offers.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-card border border-border rounded-l-xl px-4 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:border-lime-400"
              />
              <button className="bg-lime-400 text-black px-4 rounded-r-xl font-semibold text-sm hover:bg-lime-500 transition">
                →
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-text-muted">
          <p>© 2025 Sneakerly. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-text-primary transition">Twitter</a>
            <a href="#" className="hover:text-text-primary transition">Instagram</a>
            <a href="#" className="hover:text-text-primary transition">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}