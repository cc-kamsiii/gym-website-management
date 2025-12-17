import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

function UserNavbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md">
      {/* Centered container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl">GyMedia</h1>

        <div className="flex gap-8 text-black font-semibold cursor-pointer">
          <a>Home</a>

          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1"
            >
              Classes
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsOpen(false)}
                />

                <div className="absolute top-full left-0 mt-2 w-48 bg-white text-slate-800 rounded-lg shadow-lg py-2">
                  <a href="#" className="block px-4 py-2 hover:bg-slate-100" onClick={() => setIsOpen(false)}>Browse Classes</a>
                  <a href="#" className="block px-4 py-2 hover:bg-slate-100" onClick={() => setIsOpen(false)}>Class Schedule</a>
                  <a href="#" className="block px-4 py-2 hover:bg-slate-100" onClick={() => setIsOpen(false)}>My Bookings</a>
                  <a href="#" className="block px-4 py-2 hover:bg-slate-100" onClick={() => setIsOpen(false)}>Class History</a>
                </div>
              </>
            )}
          </div>
          <a>Membership</a>
          <a>Coaches</a>
          <a>Book Visit</a>
          <a>Profile</a>
          <a>Logout</a>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;
