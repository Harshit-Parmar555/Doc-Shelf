import React from "react";
// Components Import
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[12%] w-[100%] flex items-center justify-between">
      <div className="items-center text-white font-poppins text-sm hidden md:flex">
        <h1 className="ml-12">About Us</h1>
        <h1 className="ml-12">Contact Us</h1>
      </div>
      <div className="flex items-center justify-center text-white font-kanit ml-4 md:ml-0 text-2xl md:text-4xl">
        <h1>DOC-SHELF</h1>
      </div>
      <div className=" flex items-center font-poppins">
        <Button
          onClick={() => navigate("/register")}
          className="mr-3 md:mr-12 bg-white text-black rounded-sm hover:bg-black hover:text-white transition-colors duration-500 ease-in-out"
        >
          Register
        </Button>
        <Button
          onClick={() => navigate("/login")}
          className="mr-3 md:mr-12 bg-white text-black rounded-sm hover:bg-black hover:text-white transition-colors duration-500 ease-in-out"
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
