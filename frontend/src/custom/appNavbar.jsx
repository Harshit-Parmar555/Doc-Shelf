import React from "react";
import avatar from "../assets/avatar.jpg";
import { SunMoon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useViewStore } from "@/store/useViewStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
const Navbar = () => {
  const { toggleComponent } = useViewStore();
  const { authUser } = useAuthStore();
  const { theme, toggle } = useThemeStore();
  return (
    <div
      className={`h-[12%] w-[100%] ${
        theme ? "bg-white" : "bg-black"
      } border-b-[1px] border-gray-500 flex items-center justify-between transition-colors duration-500 ease-in-out`}
    >
      <h1
        className={`font-kanit text-2xl ml-8 ${
          theme ? "text-black" : "text-white"
        }`}
      >
        DOC-SHELF
      </h1>
      <div className="flex items-center">
        <SunMoon
          onClick={() => toggle()}
          className={`h-[25px] w-[25px] mr-12 md:mr-16 lg:mr-20 ${
            theme ? "" : "invert"
          }`}
        />
        <Avatar className="mr-12 md:mr-16 lg:mr-20 h-[35px] w-[35px] cursor-pointer">
          <AvatarImage
            onClick={() => toggleComponent("profile")}
            src={authUser.profile || avatar}
          />
          <AvatarFallback onClick={() => toggleComponent("profile")}>
            CN
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
