import React, { useState } from "react";

// Ui Imports
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { Users, SunMoon } from "lucide-react";
import { HoverCard, HoverCardTrigger , HoverCardContent } from "@/Components/ui/hover-card";

//Libraries Import
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { themetoggle } from "@/Redux/themeslice";

const Navbar2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const avatar = useSelector((state) => state.user.avatar);
  const theme = useSelector((state)=>state.theme.theme);

  return (
    <>
      <nav className={"h-[14%] w-full flex items-center justify-center"}>
        <div className="flex w-[90%] items-center justify-evenly h-[100%] md:w-[60%] lg:w-[40%] ">
          <HoverCard>
   <HoverCardTrigger asChild>
          <Button
            onClick={() => dispatch(themetoggle())}
            className="h-[40%] w-auto rounded-full flex items-center "
          >
            <SunMoon style={{ width: "22px", height: "22px" }} />
          </Button>
          </HoverCardTrigger>
          <HoverCardContent
           className= {`bg-transparent ${theme?"text-black":"text-white"}  border-none w-auto text-xs`}
           side="top" // Position the hover card above the button
           sideOffset={0}
          >
          Theme
          </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger asChild>
          <Button
            onClick={() => navigate("/receivedfile")}
            className="h-[40%] w-auto rounded-full flex items-center "
          >
            <Users style={{ width: "22px", height: "22px" }} />
          </Button>
          </HoverCardTrigger>
          <HoverCardContent
                className= {`bg-transparent ${theme?"text-black":"text-white"}  border-none w-auto text-xs`}
                side="top" // Position the hover card above the button
                sideOffset={0}
          >
          Received Files
          </HoverCardContent>
          </HoverCard>

          <HoverCard>
            <HoverCardTrigger asChild>
          <Avatar
            className=" bg-black border-2 border-white h-14 w-14"
            onClick={() => navigate("/profile")}
          >
            <AvatarImage className="cursor-pointer" src={avatar}></AvatarImage>
          </Avatar>
          </HoverCardTrigger>
          <HoverCardContent
                   className= {`bg-transparent ${theme?"text-black":"text-white"}  border-none w-auto text-xs`}
                   side="top" // Position the hover card above the button
                   sideOffset={0}
          >
            Profile
          </HoverCardContent>
          </HoverCard>
        </div>
      </nav>
    </>
  );
};

export default Navbar2;
