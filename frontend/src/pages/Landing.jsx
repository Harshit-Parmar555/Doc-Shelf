import React from "react";
import { useNavigate } from "react-router-dom";

// Components Import
import Navbar from "@/custom/authNavbar";
import { Button } from "@/components/ui/button";
const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[100vh] w-[100vw] bg-black flex flex-col items-center">
      <Navbar />
      <div className="h-[70%] w-[90%] md:w-[80%] lg:w-[70%] mt-32 flex flex-col items-center">
        <h1 className="font-kanit text-3xl md:text-6xl text-center text-white">
          "Doc Shelf simplifies document management and access"
        </h1>
        <p className="font-poppins text-base md:text-lg text-center mt-8 text-gray-500">
          "Doc Shelf is designed to provide a hassle-free solution for
          organizing and accessing your documents anytime, anywhere. Whether
          you're a student, professional, or someone who values efficiency, this
          platform ensures your files are secure, well-organized, and easily
          retrievable with just a few clicks"
        </p>
        <Button
          onClick={() => navigate("/register")}
          className="p-6 font-poppins bg-white text-black mt-10 hover:bg-white"
        >
          Start Exploring !!
        </Button>
      </div>
    </div>
  );
};

export default Landing;
