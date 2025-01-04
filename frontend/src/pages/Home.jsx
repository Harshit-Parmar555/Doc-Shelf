import React from "react";
// Components Import
import Navbar from "@/custom/appNavbar";
import SideBar from "@/custom/homeSideBar";
import MainBox from "@/custom/homeMainBox";
import UploadBox from "@/custom/UploadBox";
import ProfileBox from "@/custom/ProfileBox";
import ReceivedBox from "@/custom/ReceivedBox";

// Store Import
import { useViewStore } from "@/store/useViewStore";
import { useThemeStore } from "@/store/useThemeStore";
const Home = () => {
  const {theme} = useThemeStore();
  const { selectedComponent } = useViewStore();
  return (
    <div className={`h-screen w-screen ${theme?"bg-white":"bg-black"} transition-colors duration-500 ease-in-out`}>
      <Navbar />
      <div className="h-[88%] w-full max-w-full flex flex-col items-center">
        <SideBar />
        {selectedComponent === "home" && <MainBox />}
        {selectedComponent === "upload" && <UploadBox />}
        {selectedComponent === "received" && <ReceivedBox />}
        {selectedComponent === "profile" && <ProfileBox />}
      </div>
    </div>
  );
};

export default Home;
