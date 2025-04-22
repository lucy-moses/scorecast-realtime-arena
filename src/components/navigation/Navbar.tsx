
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-football-primary text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <img src="/lovable-uploads/5cc95bdd-95a6-43d8-bebd-90113a51b28b.png" alt="Logo" className="w-12 h-12" />
            <span className="text-2xl font-bold">Paris Premier League</span>
          </Link>
        </div>
        <div className="flex items-center gap-6 text-lg">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/table" className="hover:text-gray-300">Table</Link>
          <Link to="/fixtures" className="hover:text-gray-300">Fixtures</Link>
          <Link to="/profile" className="hover:text-gray-300">Profile</Link>
          <Button variant="ghost" size="icon" className="text-white hover:bg-football-secondary" title="Logout">
            <LogOut size={20} />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
