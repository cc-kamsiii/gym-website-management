import bgGym from "../assets/bgGym.jpg";
import React, { act, useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Navbar from "../components/Navbar";

function LandingPage() {
  const [activeModal, setActiveModal] = useState(null);
  const openLogin = () => setActiveModal('login');
  const openRegister = () => setActiveModal('register');
  const closeModal = () => setActiveModal(null);

  return (
    <>
    <Navbar/>
      <div
        className="bg-background-gym-image bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-center h-screen gap-10 px-4"
        style={{ backgroundImage: `url(${bgGym})` }}
      >
        <div>
          <h1 className="text-5xl md:text-8xl font-bold text-white">
            UNLEASH YOUR POWER
          </h1>
          <p className="text-lg md:text-2xl mt-4 text-white">
            Start your journey to a stronger, healthier you
          </p>
          <button
            onClick={openLogin}
            className="bg-yellow-400 px-5 py-1 m-4 rounded-sm text-black font-bold cursor-pointer hover:bg-yellow-500 active:bg-yellow-600"
          >
            Start Now
          </button>
        </div>
      </div>

      <Login
        isOpen={activeModal === "login"}
        onClose={closeModal}
        onSwitchToRegister={openRegister}
      />

      <Register
        isOpen={activeModal === "register"}
        onClose={closeModal}
        onSwitchToLogin={openLogin}
      />
    </>
  );
}

export default LandingPage;
