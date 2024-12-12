import React from "react";
import { Button } from "@/Components/ui/button";
import { useNavigate } from "react-router-dom";
const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-[100vh] w-[100vw] bg-slate-950 flex items-center justify-center">
        <div className="h-[75%] w-[90%] bg-white rounded-2xl p-10 flex flex-col items-center md:w-[40%] md:h-[80%] lg:h-[90%]">
          <h1 className="text-2xl">Welcome to Doc-Shelf</h1>
          <p className="mt-3 text-sm md:text-xl">
            {" "}
            Your ultimate destination for secure and seamless file storage. Our
            platform empowers users to create personal accounts where they can
            store, manage, and access their important documents anytime,
            anywhere. At Doc-Shelf, we prioritize security and convenience,
            ensuring that your data is protected with advanced encryption and
            robust safety protocols.
          </p>
          <p className="mt-3">
            But that's not all — Doc-Shelf goes beyond being just a storage
            solution. With our intuitive sharing feature, users can effortlessly
            collaborate by sharing files with others, making teamwork and
            communication smoother than ever. Whether you're a student,
            professional, or anyone looking for a reliable file management tool,
            Doc-Shelf is designed to cater to your needs. Join us on a journey
            to redefine file storage and sharing — simple, secure, and built for
            you!
          </p>
          <p className="mt-4 w-[100%]">
            Regard's <br /> Team Doc-Shelf
          </p>
          <Button onClick={() => navigate("/")} className="mt-10 p-4 ">
            Back to Home
          </Button>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
