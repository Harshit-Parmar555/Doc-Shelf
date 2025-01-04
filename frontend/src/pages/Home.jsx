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
const Home = () => {
  const { selectedComponent } = useViewStore();
  return (
    <div className="h-screen w-screen bg-black">
      <Navbar />
      <div className="h-[88%] w-full flex">
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
