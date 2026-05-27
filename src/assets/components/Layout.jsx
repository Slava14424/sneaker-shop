import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children, cartCount, onCartClick }) {
  return (
    <div className="bg-primary text-text-primary min-h-screen font-sans flex flex-col">
      <Navbar cartCount={cartCount} onCartClick={onCartClick} />
      <main className="flex-grow pt-24">{children}</main>
      <Footer />
    </div>
  );
}