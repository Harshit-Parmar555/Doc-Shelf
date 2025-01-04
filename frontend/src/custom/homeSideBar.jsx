import React from "react";
import { Home, Upload, Share2, LogOut } from "lucide-react";
import { useViewStore } from "@/store/useViewStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
const SideBar = () => {
  const { theme } = useThemeStore();
  const { toggleComponent } = useViewStore();
  const { logout } = useAuthStore();
  return (
    <div
      className={`h-[12%] w-full md:h-[8%] ${
        theme ? "bg-white" : "bg-black"
      } flex items-center justify-evenly border-b-[1px] border-gray-800 transition-colors duration-500 ease-in-out`}
    >
      <Home
        onClick={() => toggleComponent("home")}
        className={` ${theme ? "" : "invert"} cursor-pointer`}
      />
      <Upload
        onClick={() => toggleComponent("upload")}
        className={` ${theme ? "" : "invert"} cursor-pointer`}
      />
      <LogOut
        onClick={() => logout()}
        className="text-red-600  cursor-pointer"
      />
    </div>
  );
};

export default SideBar;
