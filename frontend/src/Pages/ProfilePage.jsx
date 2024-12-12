import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/Components/ui/card";
import { Avatar, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { toast } from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/authslice";
import { setUserDetails, clearUserDetails } from "@/Redux/userslice";

const ProfilePage = () => {
  const theme = useSelector((state) => state.theme.theme);
  const name = useSelector((state) => state.user.name);
  const email = useSelector((state) => state.user.email);
  const avatar = useSelector((state) => state.user.avatar);
  const document = useSelector((state) => state.user.document);
  const joinedat = useSelector((state) => state.user.joinedat);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handlelogout = async () => {
    try {
      const reponse = await axios.post(
        "/api/v1/doc-shelf/user/logout",
        {},
        { withCredentials: true }
      );
      dispatch(logout());
      dispatch(clearUserDetails());
      navigate("/login");
    } catch (error) {
      console.log("Error in Logout Controller");
    }
  };
  return (
    <>
      <div
        className={`h-[100vh] w-[100vw] ${
          theme ? "bg-white" : "bg-slate-950"
        }  flex items-center justify-center `}
      >
        <Card
          className={`w-[90%] h-[60%] text-center flex flex-col  items-center md:w-[55%] lg:w-[25%] ${
            theme ? "bg-gray-400 text-black" : "bg-black text-white"
          }`}
        >
          <CardContent className="h-[80%] flex flex-col items-center justify-evenly">
            <Avatar className="h-24 w-24 border-2 border-black rounded-full bg-black">
              <AvatarImage
                className="cursor-pointer"
                src={avatar}
                alt="user-profile"
              ></AvatarImage>
            </Avatar>
            <CardTitle>{name ? name : ""}</CardTitle>
            <CardDescription>
              Joined Since {joinedat ? joinedat : ""}
            </CardDescription>
            <CardDescription>{email ? email : ""}</CardDescription>
            <CardTitle>Document Stored : {document ? document : ""}</CardTitle>
          </CardContent>
          <CardContent className="w-[100%]  flex items-center justify-evenly">
            <Button onClick={() => navigate("/home")}>Back to Home</Button>
            <Button onClick={handlelogout}>Logout</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProfilePage;
