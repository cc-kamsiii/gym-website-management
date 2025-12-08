import React, { useEffect } from "react";
import { useState } from "react";

function UserNavbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      console.log("User name", userData.name);
    }
  }, []);

  return (
    <nav className="w-full py-4 px-6 flex justify-between items-center fixed top-0 left-0 bg-black">
      {user ? (
        <h1 className="px-2  text-2xl text-white">Welcome, {user.name}!</h1>
      ) : (
        <h1>Welcome, Guest!</h1>
      )}

      <div className="flex gap-15 text-white font-semibold px-2 cursor-pointer">
        <a>Home</a>
        <a>Membership</a>
        <a>Coaches</a>
        <a>Book Visit</a>
        <a>Profile</a>
        <a>Logout</a>
      </div>
    </nav>
  );
}

export default UserNavbar;
