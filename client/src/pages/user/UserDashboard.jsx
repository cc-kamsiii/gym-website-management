import React, { useEffect } from "react";
import { useState } from "react";
import UserNavbar from "../../components/UserNavbar";

function UserDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      console.log("User: ", userData.name);
    }
  }, []);

  return (
    <>
      <UserNavbar />

      <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-yellow-300 rounded-lg shadow-lg p-8 mb-6 ">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {user ? `Hello, ${user.name}` : "Welcome Guest"}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-800">Ready to crush your fitness goals today?</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
