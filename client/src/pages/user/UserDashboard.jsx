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
    }
  }, []);

  return (
    <>
    <UserNavbar/>

    <div className="pt-20">
        <div>daw</div>
        <div>daw</div>
    </div>

    </>

    
  );
}

export default UserDashboard;
