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
      className={`h-[100%] w-[14%] min-w-[14%] md:w-[10%] lg:w-[4%] ${
        theme ? "bg-white" : "bg-black"
      } flex flex-col items-center border-r-[1px] border-gray-500 transition-colors duration-500 ease-in-out`}
    >
      <Home
        onClick={() => toggleComponent("home")}
        className={`mt-16 ${theme ? "" : "invert"} cursor-pointer`}
      />
      <Upload
        onClick={() => toggleComponent("upload")}
        className={`mt-16 ${theme ? "" : "invert"} cursor-pointer`}
      />
      <LogOut
        onClick={() => logout()}
        className="text-red-600 mt-16 cursor-pointer"
      />
    </div>
  );
};

export default SideBar;
