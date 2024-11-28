// rrd imports
import { Link } from "react-router-dom";

// Store
import { useUserState } from "@/stores/user.store";

// Components
import { navLinks } from "@/constants";
import { Button } from "../ui/button";
import { ModeToggle } from "./mode-toggle";
import UserBox from "./user-box";

function Navbar() {
  const { user } = useUserState();

  return (
    <div className="fixed inset-0 z-50 h-[10vh] w-full border-b bg-background">
      <div className="container mx-auto flex h-full max-w-6xl items-center justify-between">
        <Link to="/">
          <h1 className="text-2xl font-bold uppercase">Workout</h1>
        </Link>

        <div className="flex items-center gap-3">
          {navLinks.map((link) => (
            <a
              href={link.path}
              key={link.path}
              className="font-medium hover:underline"
            >
              {link.label}
            </a>
          ))}
          <ModeToggle />
          {user ? (
            <UserBox />
          ) : (
            <Link to="/auth">
              <Button variant={"secondary"}>Join Free</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
