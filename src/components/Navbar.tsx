import { Link, Outlet } from "react-router-dom";
import { ModeToggle } from "./theme/mode-toggle";
import { auth } from "@/firebaseConfig";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col gap-20 p-6 md:p-10">
      <nav>
        <div className="flex flex-col w-full lg:flex-row items-center justify-between text-2xl lg:text-3xl font-bold">
          {/* Nav Links */}
          <div className="flex gap-20">
            <Link
              className="hover:bg-white hover:text-black p-3 rounded-2xl transition-all duration-500"
              to="/"
            >
              Home
            </Link>
            <Link
              className="hover:bg-white hover:text-black p-3 rounded-2xl transition-all duration-500"
              to="/tasks"
            >
              Tasks
            </Link>
            <Link
              className="hover:bg-white hover:text-black p-3 rounded-2xl transition-all duration-500"
              to="/blog"
            >
              Blog
            </Link>
            <Link
              className="hover:bg-white hover:text-black p-3 rounded-2xl transition-all duration-500"
              to="/quiz"
            >
              Quiz
            </Link>
          </div>
          {/* Login and ModeToggle*/}
          <div className="flex items-center gap-20">
            {/* User is logged in */}
            {user ? (
              <Link
                to="/profile"
                className="hover:bg-white hover:text-black p-3 rounded-2xl transition-all duration-500"
              >
                <p>Profile</p>
              </Link>
            ) : (
              // User is not logged in
              <div className="flex gap-20">
                <Link
                  className="hover:bg-white hover:text-black p-3 rounded-2xl transition-all duration-500"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="hover:bg-white hover:text-black p-3 rounded-2xl transition-all duration-500"
                  to="/signup"
                >
                  Signup
                </Link>
              </div>
            )}
            <ModeToggle />
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
