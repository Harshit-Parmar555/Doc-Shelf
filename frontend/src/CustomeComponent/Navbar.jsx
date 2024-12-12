import React from "react";

// Ui Imports
import Logo from "../assets/DOCS-SHELF.png";
import { Button } from "@/Components/ui/button";

//Libraries Import
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className="h-[14%] w-full flex items-center justify-between">
        <div className="h-[80%] w-[85%]">
          <img
            src={Logo}
            alt="Logo"
            className="h-full w-[50%] object-contain lg:w-[30%]"
          />
        </div>
        <div className="flex w-[35%] items-center justify-evenly h-[100%] md:w-[80%] ">
          <Button
            onClick={() => navigate("/aboutus")}
            className="h-[50%] w-[20%] hidden transition-all duration-300 ease-in-out hover:bg-slate-200 hover:text-black hover:scale-105 md:flex md:w-[25%] md:h-[40%] lg:w-[20%] lg:h-[50%] "
          >
            About Us
          </Button>
          <Button
            onClick={() => navigate("/contactus")}
            className="h-[50%] w-[20%] hidden transition-all duration-300 ease-in-out hover:bg-slate-200 hover:text-black hover:scale-105 md:flex md:w-[25%] md:h-[40%] lg:w-[20%] lg:h-[50%]"
          >
            Contact Us
          </Button>
          <Button
            onClick={() => navigate("/register")}
            className="h-[50%] w-[20%] hidden bg-white text-black transition-all duration-300 ease-in-out hover:bg-black hover:text-white hover:border-2 hover:scale-105 md:flex md:w-[25%] md:h-[40%] lg:w-[20%] lg:h-[50%]"
          >
            SIGN UP
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
